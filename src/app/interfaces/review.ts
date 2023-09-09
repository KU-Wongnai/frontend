interface ReviewProps {
  avatarUrl: string;
  name: string;
  topic: string;
  detail: string;
  images: string[];
  comments: ReviewComment[];
  likes: number;
}
