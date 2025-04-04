
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "@/api/blog";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Tổng quan Blog</CardTitle>
          <CardDescription>Bài viết gần đây và số liệu thống kê</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="mb-4 rounded-lg bg-secondary/50 p-4">
                <div className="text-2xl font-bold">{posts?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Tổng số bài viết</div>
              </div>
              <h3 className="mb-2 font-medium">Bài viết gần đây</h3>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {posts?.slice(0, 5).map((post) => (
                    <div key={post.id} className="rounded-lg border p-3">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-muted-foreground">{post.date}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
          <CardDescription>Lối tắt đến các tác vụ phổ biến</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-secondary/50" onClick={() => window.location.href = "/admin/blog"}>
            <div className="font-medium">Quản lý bài viết</div>
            <div className="text-sm text-muted-foreground">Tạo, chỉnh sửa và xóa bài viết</div>
          </div>
          <div className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-secondary/50">
            <div className="font-medium">Xem trang web</div>
            <div className="text-sm text-muted-foreground">Đi đến trang web công khai</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
