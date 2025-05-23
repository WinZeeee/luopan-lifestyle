
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";
import { CartDrawer } from "./components/CartDrawer";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Custom from "./pages/Custom";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlog from "./pages/AdminBlog";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./components/AdminLayout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <CartDrawer />
            <div className="flex min-h-screen flex-col">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <Index />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/shop" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <Shop />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/shop/:id" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <ProductDetail />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/custom" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <Custom />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/about" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <About />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/blog" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <Blog />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/blog/:id" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <BlogPost />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/checkout" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <Checkout />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/order-confirmation" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <OrderConfirmation />
                    </main>
                    <Footer />
                  </>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                  </Route>
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <NotFound />
                    </main>
                    <Footer />
                  </>
                } />
              </Routes>
            </div>
          </CartProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
