
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/api/blog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BlogPost } from "@/types/blog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const blogFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  author: z.string().min(2, "Author name must be at least 2 characters"),
  imageUrl: z.string().url("Must be a valid URL"),
  tags: z.string().transform((val) => val.split(",").map(tag => tag.trim())),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

const AdminBlog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();
  
  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts
  });

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      author: "",
      imageUrl: "",
      tags: "",
    }
  });

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setCurrentPost(post);
      form.reset({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        imageUrl: post.imageUrl,
        tags: post.tags.join(", "),  // Convert array to comma-separated string
      });
    } else {
      setCurrentPost(null);
      form.reset({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        imageUrl: "",
        tags: "",
      });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = (values: BlogFormValues) => {
    console.log("Saving post:", values);
    
    toast({
      title: currentPost ? "Post updated" : "Post created",
      description: `Successfully ${currentPost ? "updated" : "created"} the blog post "${values.title}"`,
    });
    
    setIsDialogOpen(false);
    // In a real application, we would refetch the posts after saving
    // refetch();
  };

  const handleDeletePost = (post: BlogPost) => {
    console.log("Deleting post:", post);
    
    toast({
      title: "Post deleted",
      description: `Successfully deleted the blog post "${post.title}"`,
    });
    
    // In a real application, we would refetch the posts after deletion
    // refetch();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {posts?.map((post) => (
            <div key={post.id} className="flex items-start justify-between rounded-lg border p-4">
              <div>
                <h2 className="font-medium">{post.title}</h2>
                <p className="text-sm text-muted-foreground">
                  By {post.author} • {post.date}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="rounded-full bg-secondary px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleOpenDialog(post)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeletePost(post)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{currentPost ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            <DialogDescription>
              {currentPost ? "Update the details of your blog post" : "Fill in the details to create a new blog post"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[200px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">
                  {currentPost ? "Update Post" : "Create Post"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
