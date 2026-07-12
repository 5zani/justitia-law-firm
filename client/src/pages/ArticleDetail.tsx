import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, BookOpen, Calendar, Eye } from "lucide-react";

export default function ArticleDetail() {
  const [, setLocation] = useLocation();
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const articleQuery = trpc.admin.public.bySlug.useQuery(
    { slug },
    { enabled: !!slug, retry: false }
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation("/articles")}
            className="text-slate-300 hover:text-white gap-2 mb-6 -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Button>
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-accent" />
            <span className="text-accent text-sm font-semibold uppercase tracking-wide">
              Article
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {articleQuery.isLoading ? (
          <Card className="p-8 animate-pulse">
            <div className="h-8 bg-secondary/20 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-secondary/20 rounded mb-3 w-full"></div>
            <div className="h-4 bg-secondary/20 rounded w-5/6"></div>
          </Card>
        ) : articleQuery.isError || !articleQuery.data ? (
          <Card className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Article not found
            </h3>
            <p className="text-muted-foreground mb-6">
              This article may have been unpublished or the link is incorrect.
            </p>
            <Button onClick={() => setLocation("/articles")} className="bg-accent hover:bg-accent/90">
              Browse all articles
            </Button>
          </Card>
        ) : (
          <article>
            <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {articleQuery.data.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {articleQuery.data.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(
                  articleQuery.data.publishedAt || articleQuery.data.createdAt
                ).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {articleQuery.data.views} views
              </span>
            </div>
            <div className="prose prose-slate max-w-none text-foreground whitespace-pre-wrap leading-relaxed">
              {articleQuery.data.content}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}