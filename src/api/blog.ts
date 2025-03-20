
import { BlogPost } from "@/types/blog";

// Mock data for blog posts
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding the Basics of Feng Shui",
    excerpt: "Learn the fundamental principles of Feng Shui and how they can transform your living space.",
    content: `
      <p>Feng Shui is an ancient Chinese practice that aims to harmonize individuals with their surrounding environment. At its core, Feng Shui is based on the idea that our living spaces reflect and affect all aspects of our lives.</p>
      <p>The five elements of Feng Shui—wood, fire, earth, metal, and water—are essential concepts. Each element represents different energy qualities that can be incorporated into your space through colors, materials, shapes, and objects.</p>
      <p>The Bagua map is another fundamental tool in Feng Shui. It's an energy map that helps you identify which areas of your home correspond to specific aspects of your life, such as wealth, family, or career.</p>
      <p>When implementing Feng Shui principles, start with decluttering your space. Clutter blocks the flow of energy, or "chi," and can create stagnant areas in your home and life. Ensure good air and light quality, position furniture to allow energy to flow smoothly, and incorporate natural elements.</p>
      <p>The Luopan compass is an indispensable tool for professional Feng Shui practitioners. It helps determine the precise directions and energetic influences in a space, allowing for more accurate Feng Shui adjustments.</p>
    `,
    author: "Min Zhang",
    date: "2023-08-15",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    tags: ["Feng Shui", "Basics", "Home"]
  },
  {
    id: 2,
    title: "How to Choose the Right Luopan for Your Practice",
    excerpt: "Selecting the perfect Luopan can significantly impact your Feng Shui consultations. Here's how to choose wisely.",
    content: `
      <p>Selecting the right Luopan is crucial for accurate Feng Shui readings. As the primary tool for professional practitioners, your Luopan must be precise, well-crafted, and suitable for your level of expertise.</p>
      <p>For beginners, a simplified San Yuan or San He Luopan with the basic rings is recommended. These provide enough information for basic readings without overwhelming new practitioners with complex data.</p>
      <p>Intermediate practitioners should consider a Luopan with more detailed rings, including Mountain and Water Dragons, 24 Mountains, and the 64 Hexagrams. These additional layers allow for more nuanced readings and deeper analysis.</p>
      <p>Professional consultants typically use comprehensive Luopans with all traditional rings, made from premium materials like sandalwood or rosewood. The craftsmanship directly affects accuracy—look for precise calibration and clear markings.</p>
      <p>Caring for your Luopan is equally important. Store it in a protective case, away from strong electromagnetic fields. Regularly check and calibrate the needle, and handle it with respect according to traditional practices.</p>
    `,
    author: "Wei Chen",
    date: "2023-09-23",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    tags: ["Luopan", "Tools", "Professional"]
  },
  {
    id: 3,
    title: "The History and Evolution of the Feng Shui Compass",
    excerpt: "Discover how the Luopan has evolved from ancient times to modern practice.",
    content: `
      <p>The Luopan, or Feng Shui compass, has a rich history dating back to the Han Dynasty (206 BCE – 220 CE). Initially developed as a navigational tool, it evolved into a sophisticated instrument for geomantic purposes.</p>
      <p>Early Luopans were simple devices featuring a magnetic needle and basic directional indicators. By the Tang Dynasty (618-907 CE), they had developed into more complex instruments with multiple rings encoding various aspects of Chinese cosmology.</p>
      <p>The Song Dynasty (960-1279 CE) saw significant advancements in Luopan design. Scholars integrated more detailed cosmological systems, including the Eight Trigrams, Heavenly Stems, and Earthly Branches.</p>
      <p>The San He and San Yuan schools emerged during the Ming Dynasty (1368-1644 CE), each developing their own specialized versions of the Luopan with unique ring arrangements reflecting their theoretical approaches.</p>
      <p>Modern Luopans maintain the traditional design elements while incorporating contemporary materials and manufacturing techniques. Today's practitioners can choose from traditional designs or more innovative variations that may include additional features like spirit levels or digital components.</p>
    `,
    author: "Li Jing",
    date: "2023-10-05",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    tags: ["History", "Luopan", "Evolution"]
  },
  {
    id: 4,
    title: "Integrating Traditional Feng Shui in Modern Interior Design",
    excerpt: "Learn how to blend ancient wisdom with contemporary aesthetics for harmonious living spaces.",
    content: `
      <p>Integrating traditional Feng Shui principles into modern interior design creates spaces that are not only aesthetically pleasing but also energetically balanced. This fusion approach honors ancient wisdom while embracing contemporary sensibilities.</p>
      <p>Start with space planning according to Feng Shui principles. The commanding position theory applies regardless of design style—place important furniture pieces where you can see the door but aren't directly in line with it.</p>
      <p>For color schemes, interpret the five elements theory through a modern lens. Fire element colors (reds and oranges) can be incorporated as accent colors rather than dominant hues. Earth tones provide grounding energy, while water colors (blues and blacks) can be used to evoke depth and tranquility.</p>
      <p>When selecting materials, balance is key. Combine natural materials like wood and stone with modern elements like glass and metal. Each material corresponds to different Feng Shui elements and brings distinct energy.</p>
      <p>Lighting should include layers of natural and artificial sources to ensure proper energy flow throughout the day. Smart lighting systems can be programmed to adjust according to the time of day, supporting both function and energy balance.</p>
    `,
    author: "Sophia Wang",
    date: "2023-11-12",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    tags: ["Interior Design", "Modern", "Application"]
  },
  {
    id: 5,
    title: "Advanced Luopan Reading Techniques for Practitioners",
    excerpt: "Enhance your Feng Shui practice with these sophisticated Luopan interpretation methods.",
    content: `
      <p>Advanced Luopan reading requires a deep understanding of multiple layers of information and how they interact. For experienced practitioners, these techniques can reveal subtle energetic patterns that inform more precise recommendations.</p>
      <p>The Flying Stars technique involves mapping temporal energy patterns onto the physical space. By using the Luopan to identify the facing direction of a structure, practitioners can calculate which stars are present in each sector and how they interact with the building's intrinsic energy.</p>
      <p>Water Dragon formulas focus on identifying auspicious locations for water features, which are associated with wealth in Feng Shui. The Luopan's rings help determine precise compass degrees where water should be placed or avoided.</p>
      <p>Mountain Dragon methods identify beneficial locations for solid structures, which relate to health and relationships. Using specific rings on the Luopan, practitioners can pinpoint optimal placements for mountains, buildings, or heavy furniture.</p>
      <p>The Three Harmony combinations involve identifying relationships between directions based on their Earthly Branch assignments. The Luopan's 24 Mountains ring is crucial for this analysis, allowing practitioners to identify harmonious and conflicting directions.</p>
    `,
    author: "Master Liu",
    date: "2023-12-08",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    tags: ["Advanced", "Techniques", "Professional"]
  }
];

// API functions
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockBlogPosts;
};

export const getBlogPostById = async (id: number): Promise<BlogPost | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockBlogPosts.find(post => post.id === id);
};

// For future implementation with real API
export const api = {
  get: async <T>(url: string): Promise<T> => {
    // This would be replaced with actual fetch logic to your backend
    console.log(`[API] GET request to ${url}`);
    
    // For mock purposes, we'll just return the mock data based on the URL
    if (url === '/api/blog') {
      return mockBlogPosts as unknown as T;
    }
    
    if (url.startsWith('/api/blog/')) {
      const id = parseInt(url.split('/').pop() || '0');
      const post = mockBlogPosts.find(post => post.id === id);
      return post as unknown as T;
    }
    
    throw new Error(`Endpoint not found: ${url}`);
  },
  
  post: async <T>(url: string, data: any): Promise<T> => {
    // For future implementation
    console.log(`[API] POST request to ${url}`, data);
    throw new Error('POST method not implemented');
  },
  
  put: async <T>(url: string, data: any): Promise<T> => {
    // For future implementation
    console.log(`[API] PUT request to ${url}`, data);
    throw new Error('PUT method not implemented');
  },
  
  delete: async <T>(url: string): Promise<T> => {
    // For future implementation
    console.log(`[API] DELETE request to ${url}`);
    throw new Error('DELETE method not implemented');
  }
};
