interface UserReview {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt?: null | string;
  avatar: string;
}

interface Like {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt?: null | string;
  avatar: string;
}

interface Image {
  id: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: number;
  content: string;
  user: UserReview;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: number;
  user: UserReview;
  title: string;
  content: string;
  rating: number
  likes: Like[];
  comments: Comment[]; // Depending on the structure of comments you may create an interface
  images: Image[];
  createdAt: string;
  updatedAt: string;
}
