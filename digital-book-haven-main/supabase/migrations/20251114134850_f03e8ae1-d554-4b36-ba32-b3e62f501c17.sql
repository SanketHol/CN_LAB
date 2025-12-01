-- Create books table
CREATE TABLE public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  cover_image TEXT,
  isbn TEXT UNIQUE,
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Books policies (public can read, authenticated users can read)
CREATE POLICY "Books are viewable by everyone"
  ON public.books
  FOR SELECT
  USING (true);

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample books
INSERT INTO public.books (title, author, description, price, category, stock, cover_image) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'A classic American novel set in the Jazz Age', 12.99, 'Fiction', 25, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'),
('To Kill a Mockingbird', 'Harper Lee', 'A gripping tale of racial injustice and childhood innocence', 14.99, 'Fiction', 30, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'),
('1984', 'George Orwell', 'A dystopian social science fiction novel', 13.99, 'Science Fiction', 20, 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'),
('Pride and Prejudice', 'Jane Austen', 'A romantic novel of manners', 11.99, 'Romance', 35, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'),
('The Hobbit', 'J.R.R. Tolkien', 'A fantasy adventure novel', 15.99, 'Fantasy', 28, 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400'),
('The Catcher in the Rye', 'J.D. Salinger', 'A story about teenage rebellion', 12.49, 'Fiction', 22, 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400');