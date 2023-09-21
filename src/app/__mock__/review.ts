import { mockComments } from "./comment";

export const mockReview: ReviewProps[] = [
  {
    avatarUrl: "https://github.com/shadcn.png",
    name: "John Doe",
    title: "Amazing restaurant!",
    content:
      "<h1>H1</h1><ol><li>a</li></ol><ul><li>b</li></ul><p><strong>bold</strong></p><p><em>i</em></p><p><u>u</u></p>",
    rating: 5,
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
    title: "Great food!",
    content:
      "<h1><strong><u>I really loved the food here.</u></strong></h1><p><em>It was fantastic.</em></p><p><br></p>",
    rating: 4,
    images: [
      "https://images.unsplash.com/photo-1693930270229-694fc4216a69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      "https://images.unsplash.com/photo-1682685796766-0fddd3e480de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    comments: mockComments,
    likes: 104,
  },
];
