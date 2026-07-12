import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { BookOpen, Search, Filter, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Articles() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useAuth();

  const articlesQuery = trpc.admin.public.articles.useQuery();
  const articles = articlesQuery.data || [];

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(articles.map((a: any) => a.category)))];

  // Filter articles
  const filteredArticles = articles.filter((article: any) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold">Articles & Journals</h1>
          </div>
          <p className="text-slate-300 text-lg">
            Insights, legal updates, and expert perspectives from Justitia Law Firm
          </p>
        </div>
      </div>

      {/* Admin Access Button */}
      {user?.role === "admin" && (
        <div className="bg-accent/10 border-b border-accent/20 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <p className="text-sm text-accent">You are logged in as admin</p>
            <Button
              onClick={() => setLocation("/admin")}
              className="bg-accent hover:bg-accent/90 text-white"
              size="sm"
            >
              Go to Admin Panel
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">Filter:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-white"
                    : "bg-secondary/20 text-foreground hover:bg-secondary/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {articlesQuery.isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-6 bg-secondary/20 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-secondary/20 rounded mb-3 w-full"></div>
                <div className="h-4 bg-secondary/20 rounded w-5/6"></div>
              </Card>
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article: any) => (
<Card
                key={article.id}
                onClick={() => setLocation(`/articles/${article.slug}`)}
                className="p-6 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.views} views
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                  {article.excerpt || article.content.substring(0, 150)}...
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                  </span>
<Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocation(`/articles/${article.slug}`)}
                    className="text-accent hover:text-accent/80 gap-2"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No articles found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or filter criteria"
                : "Check back soon for our latest articles and insights"}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
