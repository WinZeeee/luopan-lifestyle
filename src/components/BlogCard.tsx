
import { BlogPost } from "@/types/blog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{post.date}</span>
        </div>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, index) => (
            <div 
              key={index} 
              className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/blog/${post.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Đọc Thêm
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
