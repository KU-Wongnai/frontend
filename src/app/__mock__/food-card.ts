export const mockFoodData = Array.from({ length: 30 }, (_, index) => ({
  id: (index + 1).toString(),
  imageUrl:
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  name: `Food Name ${index + 1}`,
  category: `Type ${index + 1}`,
  price: 30 + index * 10,
  href: `/restaurants/1/menus/${index + 1}`,
}));

// export const mockFoodData = [
//   {
//     id: "1",
//     imageUrl:
//       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     name: "Food Name 1",
//     category: "Type 1",
    
//     price: 120,
//     href: "/restaurants/1/menus/1",
//   },
//   {
//     id: "2",
//     imageUrl:
//       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     name: "Food Name 2",
//     category: "Type 2",
    
//     price: 80,
//     href: "/restaurants/1/menus/2",
//   },
//   {
//     id: "3",
//     imageUrl:
//       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     name: "Food Name 8",
//     category: "Type 8",
    
//     price: 50,
//     href: "/restaurants/1/menus/3",
//   },
//   {
//     id: "4",
//     imageUrl:
//       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     name: "Food Name 3",
//     category: "Type 3",
    
//     price: 40,
//     href: "/restaurants/1/menus/4",
//   },
//   {
//     id: "5",
//     imageUrl:
//       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     name: "Food Name 4",
//     category: "Type 4",
    
//     price: 30,
//     href: "/restaurants/1/menus/5",
//   },
//   {
//     id: "6",
//     imageUrl:
//       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     name: "Food Name 1",
//     category: "Type 1",
    
//     price: 120,
//     href: "/restaurants/1/menus/6",
//   },
//   {
//     id: "7",
//     imageUrl:
//       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     name: "Food Name 2",
//     category: "Type 2",
    
//     price: 80,
//     href: "/restaurants/1/menus/7",
//   },
//   {
//     id: "8",
//     imageUrl:
//       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     name: "Food Name 8",
//     category: "Type 8",
    
//     price: 50,
//     href: "/restaurants/1/menus/8",
//   },
//   {
//     id: "9",
//     imageUrl:
//       "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
//     name: "Food Name 3",
//     category: "Type 3",
    
//     price: 40,
//     href: "/restaurants/1/menus/9",
//   },
// ];
