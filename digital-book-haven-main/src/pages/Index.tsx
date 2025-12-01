import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShoppingCart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { BookCard } from '@/components/BookCard';
import { supabase } from '@/integrations/supabase/client';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  cover_image: string;
  stock: number;
}

const Index = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .limit(3);

      if (!error && data) {
        setFeaturedBooks(data);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              Explore thousands of books across all genres. From classics to contemporary bestsellers.
            </p>
            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              <Link to="/catalogue">
                <Button size="lg" variant="secondary" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  Browse Catalogue
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">
                Browse thousands of books across all genres and categories
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
              <p className="text-muted-foreground">
                Simple and secure checkout process for all your purchases
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Deals</h3>
              <p className="text-muted-foreground">
                Get the best prices and exclusive offers on popular titles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Books</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                description={book.description || ''}
                price={book.price}
                category={book.category}
                coverImage={book.cover_image}
                stock={book.stock}
              />
            ))}
          </div>
          <div className="text-center">
            <Link to="/catalogue">
              <Button size="lg">View All Books</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 BookStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
