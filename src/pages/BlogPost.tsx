
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPostById } from "@/api/blog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // Use the ID directly as a string without parsing it to integer
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => getBlogPostById(id || ""),
    enabled: !!id,
  });

  if (error) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-destructive">Lỗi khi tải bài viết</h1>
        <p className="mt-4 text-muted-foreground">Vui lòng thử lại sau.</p>
        <Link to="/blog">
          <Button variant="outline" className="mt-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay Lại Blog
          </Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-16">
        <Skeleton className="h-8 w-48 mb-8" />
        <Skeleton className="h-12 w-full mb-6" />
        <div className="flex gap-6 mb-8">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="aspect-video w-full mb-10" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold">Không tìm thấy bài viết</h1>
        <p className="mt-4 text-muted-foreground">Bài viết bạn đang tìm kiếm không tồn tại.</p>
        <Link to="/blog">
          <Button variant="outline" className="mt-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay Lại Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-3xl px-4">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay Lại Blog
          </Button>
        </Link>
        
        <h1 className="mb-6 font-serif text-3xl font-bold md:text-4xl">{post.title}</h1>
        
        <div className="mb-8 flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
        </div>
        
        <div className="aspect-video mb-10 overflow-hidden rounded-lg">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div 
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        <div className="mt-12">
          <h3 className="mb-4 text-lg font-semibold">Thẻ</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <div 
                key={index} 
                className="rounded-full bg-secondary px-4 py-2 text-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
