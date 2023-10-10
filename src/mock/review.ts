export const mockReview: Review[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      emailVerifiedAt: "2023-01-01T00:00:00Z",
      avatar: "https://example.com/images/alice.jpg",
    },
    title: "Great product!",
    content: "I absolutely love this product. It has changed my life!",
    rating: 5,
    likes: [
      {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        emailVerifiedAt: "2023-01-02T00:00:00Z",
        avatar: "https://example.com/images/bob.jpg",
      },
      {
        id: 3,
        name: "Charlie",
        email: "charlie@example.com",
        emailVerifiedAt: null,
        avatar: "https://example.com/images/charlie.jpg",
      },
    ],
    comments: [
      // Depending on the structure of comments you may add some mock data here
    ],
    images: [
      {
        id: 1,
        imageUrl: "https://example.com/images/product1.jpg",
        createdAt: "2023-01-03T00:00:00Z",
        updatedAt: "2023-01-03T01:00:00Z",
      },
    ],
    createdAt: "2023-01-04T00:00:00Z",
    updatedAt: "2023-01-04T01:00:00Z",
  },
  // You can add more reviews as per your testing requirements...
];
