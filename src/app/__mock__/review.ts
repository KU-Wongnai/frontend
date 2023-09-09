import { mockComments } from "./comment";

export const mockReview: ReviewProps[] = [
  {
    avatarUrl: "https://github.com/shadcn.png",
    name: "John Doe",
    topic: "Amazing restaurant!",
    detail: "I really loved the food here. It was fantastic.",
    images: [
      "https://images.unsplash.com/photo-1693930270229-694fc4216a69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      "https://images.unsplash.com/photo-1682685796766-0fddd3e480de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    comments: mockComments,
    likes: 10,
  },
  {
    avatarUrl: "https://github.com/shadcn.png",
    name: "Nancy",
    topic: "Great food!",
    detail: "I really loved the food here. It was fantastic.",
    images: [
      "https://images.unsplash.com/photo-1693930270229-694fc4216a69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      "https://images.unsplash.com/photo-1682685796766-0fddd3e480de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    comments: mockComments,
    likes: 104,
  },
];
