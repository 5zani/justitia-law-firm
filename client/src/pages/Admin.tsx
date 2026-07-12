import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "General",
    published: 0,
  });

  const articlesQuery = trpc.admin.articles.list.useQuery();
  const createMutation = trpc.admin.articles.create.useMutation({
    onSuccess: () => {
      toast.success("Article created successfully");
      articlesQuery.refetch();
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create article");
    },
  });

  const updateMutation = trpc.admin.articles.update.useMutation({
    onSuccess: () => {
      toast.success("Article updated successfully");
      articlesQuery.refetch();
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update article");
    },
  });

  const deleteMutation = trpc.admin.articles.delete.useMutation({
    onSuccess: () => {
      toast.success("Article deleted successfully");
      articlesQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete article");
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: "General",
      published: 0,
    });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        ...formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (article: any) => {
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt || "",
      category: article.category,
      published: article.published,
    });
    setEditingId(article.id);
    setIsDialogOpen(true);
  };

  if (loading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  if (!user || user.role !== "admin") {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <p className="text-red-600 font-semibold">Access Denied: Admin privileges required</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Articles & Journals</h1>
            <p className="text-muted-foreground mt-2">Manage your legal articles and journals</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={() => resetForm()}>
                <Plus className="w-4 h-4" />
                New Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Article" : "Create New Article"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Title *</label>
                  <Input
                    placeholder="Article title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Slug *</label>
                  <Input
                    placeholder="article-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Category</label>
                  <Input
                    placeholder="e.g., Banking Law, Litigation"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Excerpt</label>
                  <Textarea
                    placeholder="Brief summary of the article"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Content *</label>
                  <Textarea
                    placeholder="Full article content (supports markdown)"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published === 1}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked ? 1 : 0 })}
                    />
                    <span className="text-sm font-medium">Publish immediately</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {editingId ? "Update Article" : "Create Article"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {articlesQuery.isLoading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Loading articles...</p>
            </Card>
          ) : articlesQuery.data && articlesQuery.data.length > 0 ? (
            articlesQuery.data.map((article: any) => (
              <Card key={article.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{article.excerpt || article.content.substring(0, 150)}...</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">{article.category}</span>
                      <span>{article.views} views</span>
                      <span>{article.published === 1 ? "Published" : "Draft"}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this article?")) {
                          deleteMutation.mutate({ id: article.id });
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No articles yet. Create your first article to get started!</p>
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Create First Article
              </Button>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
