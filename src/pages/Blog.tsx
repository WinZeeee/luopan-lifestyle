
import { getBlogPosts } from "@/api/blog";
import { BlogCard } from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const Blog = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts
  });

  if (error) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-destructive">Error loading blog posts</h1>
        <p className="mt-4 text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4">
        <h1 className="mb-8 text-center font-serif text-4xl font-bold">Luopan Crafts Blog</h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Discover insights into Feng Shui practices, Luopan craftsmanship, and traditional wisdom
          for creating harmony in your space.
        </p>

        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="aspect-video h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                <Skeleton className="h-[120px] w-full" />
                <Skeleton className="h-10 w-[100px]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
