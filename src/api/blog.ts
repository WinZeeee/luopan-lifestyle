import { BlogPost } from "@/types/blog";
import { supabase } from "@/integrations/supabase/client";

// Convert Supabase row to BlogPost
const toBlogPost = (row: any): BlogPost => ({
  id: parseInt(row.id),
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  author: row.author,
  date: row.date,
  imageUrl: row.image_url,
  tags: row.tags || [],
});

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(row => toBlogPost(row));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Get a single blog post by ID
export const getBlogPostById = async (id: number): Promise<BlogPost | undefined> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id.toString())
      .single();
    
    if (error) return undefined;
    
    return toBlogPost(data);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return undefined;
  }
};

// Create a new blog post
export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost | undefined> => {
  try {
    const now = new Date().toISOString().split('T')[0];
    
    const blogPostRow = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      image_url: post.imageUrl,
      tags: post.tags,
      date: now
    };
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(blogPostRow)
      .select()
      .single();
    
    if (error) throw error;
    
    return toBlogPost(data);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return undefined;
  }
};

// Update an existing blog post
export const updateBlogPost = async (id: number, updates: Partial<Omit<BlogPost, 'id' | 'date'>>): Promise<BlogPost | undefined> => {
  try {
    // Convert frontend fields to database column names
    const blogPostRow: any = {};
    if (updates.title) blogPostRow.title = updates.title;
    if (updates.excerpt) blogPostRow.excerpt = updates.excerpt;
    if (updates.content) blogPostRow.content = updates.content;
    if (updates.author) blogPostRow.author = updates.author;
    if (updates.imageUrl) blogPostRow.image_url = updates.imageUrl;
    if (updates.tags) blogPostRow.tags = updates.tags;
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update(blogPostRow)
      .eq('id', id.toString())
      .select()
      .single();
    
    if (error) {
      console.error('Error updating blog post:', error);
      return undefined;
    }
    
    return toBlogPost(data);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return undefined;
  }
};

// Delete a blog post
export const deleteBlogPost = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id.toString());
    
    if (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};

// The api object is no longer needed with Supabase integration, 
// but keeping it for compatibility with existing code
export const api = {
  get: async <T>(url: string): Promise<T> => {
    console.log(`[API] GET request to ${url}`);
    
    if (url === '/api/blog') {
      return getBlogPosts() as unknown as T;
    }
    
    if (url.startsWith('/api/blog/')) {
      const id = parseInt(url.split('/').pop() || '0');
      const post = await getBlogPostById(id);
      return post as unknown as T;
    }
    
    throw new Error(`Endpoint not found: ${url}`);
  },
  
  post: async <T>(url: string, data: any): Promise<T> => {
    console.log(`[API] POST request to ${url}`, data);
    
    if (url === '/api/blog') {
      const newPost = await createBlogPost(data);
      return newPost as unknown as T;
    }
    
    throw new Error(`Endpoint not found: ${url}`);
  },
  
  put: async <T>(url: string, data: any): Promise<T> => {
    console.log(`[API] PUT request to ${url}`, data);
    
    if (url.startsWith('/api/blog/')) {
      const id = parseInt(url.split('/').pop() || '0');
      const updatedPost = await updateBlogPost(id, data);
      return updatedPost as unknown as T;
    }
    
    throw new Error(`Endpoint not found: ${url}`);
  },
  
  delete: async <T>(url: string): Promise<T> => {
    console.log(`[API] DELETE request to ${url}`);
    
    if (url.startsWith('/api/blog/')) {
      const id = parseInt(url.split('/').pop() || '0');
      const success = await deleteBlogPost(id);
      return { success } as unknown as T;
    }
    
    throw new Error(`Endpoint not found: ${url}`);
  }
};
