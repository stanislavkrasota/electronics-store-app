export interface Product {
  id: string;
  picture: string;
  name: string;
  price: string;
  customerRating: number;
  description: string,
  reviews: Review[]
}

export interface Review {
  userName: string,
  reviewText: string;
}
