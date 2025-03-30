
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "@/api/blog";
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Define the form input values type first
type BlogFormValues = {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  imageUrl: string;
  tags: string; // Form value is a string
};

// Then define the schema with the transformation for tags
const blogFormSchema = z.object({
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự"),
  excerpt: z.string().min(10, "Tóm tắt phải có ít nhất 10 ký tự"),
  content: z.string().min(50, "Nội dung phải có ít nhất 50 ký tự"),
  author: z.string().min(2, "Tên tác giả phải có ít nhất 2 ký tự"),
  imageUrl: z.string().url("Phải là URL hợp lệ"),
  tags: z.string().transform((val) => val.split(",").map(tag => tag.trim())),
});

const AdminBlog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts
  });

  const createMutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: "Đã tạo bài viết",
        description: "Bài viết của bạn đã được tạo thành công.",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: "Không thể tạo bài viết. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Omit<BlogPost, 'id' | 'date'>> }) => 
      updateBlogPost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: "Đã cập nhật bài viết",
        description: "Bài viết của bạn đã được cập nhật thành công.",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật bài viết. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: "Đã xóa bài viết",
        description: "Bài viết của bạn đã được xóa thành công.",
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: "Không thể xóa bài viết. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  });

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema) as any, // Use type assertion to bypass the type mismatch
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
        tags: post.tags.join(", "),
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
    const formData = {
      title: values.title,
      excerpt: values.excerpt,
      content: values.content,
      author: values.author,
      imageUrl: values.imageUrl,
      tags: form.getValues("tags").split(",").map(tag => tag.trim()),
    };
    
    if (currentPost) {
      updateMutation.mutate({ id: currentPost.id, data: formData });
    } else {
      createMutation.mutate(formData as any);
    }
  };

  const handleDeletePost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentPost) {
      deleteMutation.mutate(currentPost.id);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          Bài viết mới
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
                  Tác giả: {post.author} • {post.date}
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleOpenDialog(post)}
                  disabled={updateMutation.isPending}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDeletePost(post)}
                  disabled={deleteMutation.isPending}
                >
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
            <DialogTitle>{currentPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</DialogTitle>
            <DialogDescription>
              {currentPost ? "Cập nhật thông tin của bài viết" : "Điền thông tin để tạo bài viết mới"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
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
                    <FormLabel>Tóm tắt</FormLabel>
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
                    <FormLabel>Nội dung</FormLabel>
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
                      <FormLabel>Tác giả</FormLabel>
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
                      <FormLabel>URL hình ảnh</FormLabel>
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
                    <FormLabel>Thẻ (phân cách bằng dấu phẩy)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {currentPost ? "Cập nhật bài viết" : "Tạo bài viết"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh viễn bài viết
              "{currentPost?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBlog;
