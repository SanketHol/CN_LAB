import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  coverImage?: string;
  stock: number;
}

export const BookCard = ({ 
  title, 
  author, 
  description, 
  price, 
  category, 
  coverImage,
  stock 
}: BookCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="h-64 overflow-hidden rounded-t-lg bg-muted">
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <CardDescription className="text-sm mb-2">by {author}</CardDescription>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary">${price}</span>
          <span className="text-xs text-muted-foreground">
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <Button disabled={stock === 0}>
          {stock > 0 ? 'Add to Cart' : 'Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
};
