import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  getAdminArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticles,
  getArticleBySlug,
  getArticleById,
  incrementArticleViews,
  getContactSubmissions,
  markContactSubmissionRead,
  deleteContactSubmission,
  getSubscriberEmails,
} from "../db";
import { sendArticleNotification } from "../_core/email";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const adminRouter = router({
  articles: router({
    list: adminProcedure
      .query(async ({ ctx }) => {
        return getAdminArticles(ctx.user.id);
      }),

create: adminProcedure
      .input(
        z.object({
          title: z.string().min(1),
          slug: z.string().min(1),
          content: z.string().min(1),
          excerpt: z.string().optional(),
          category: z.string().default("General"),
          published: z.number().default(0),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const result = await createArticle({
          ...input,
          authorId: ctx.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        if (input.published === 1) {
          const recipients = await getSubscriberEmails();
          sendArticleNotification(
            { title: input.title, slug: input.slug, excerpt: input.excerpt ?? null },
            recipients
          ).catch((err) => console.error("[Email] Failed to send article notification:", err));
        }

        return result;
      }),

update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          slug: z.string().optional(),
          content: z.string().optional(),
          excerpt: z.string().optional(),
          category: z.string().optional(),
          published: z.number().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { id, ...data } = input;

        const existing = await getArticleById(id);
        const wasPublishedBefore = existing?.published === 1;

        const result = await updateArticle(id, {
          ...data,
          updatedAt: new Date(),
        });

        if (data.published === 1 && !wasPublishedBefore) {
          const updatedArticle = await getArticleById(id);
          if (updatedArticle) {
            const recipients = await getSubscriberEmails();
            sendArticleNotification(
              { title: updatedArticle.title, slug: updatedArticle.slug, excerpt: updatedArticle.excerpt },
              recipients
            ).catch((err) => console.error("[Email] Failed to send article notification:", err));
          }
        }

        return result;
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteArticle(input.id);
      }),
  }),

  contacts: router({
    list: adminProcedure.query(async () => {
      return getContactSubmissions();
    }),
    markRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return markContactSubmissionRead(input.id);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteContactSubmission(input.id);
      }),
  }),

  public: router({
    articles: publicProcedure.query(async () => {
      return getArticles();
    }),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string().min(1) }))
      .query(async ({ input }) => {
        const article = await getArticleBySlug(input.slug);
        if (!article || article.published !== 1) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Article not found" });
        }
        incrementArticleViews(article.id, article.views).catch(() => {});
        return article;
      }),
  }),
});
