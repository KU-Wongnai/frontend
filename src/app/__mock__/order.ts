export const mockOrderData = Array.from({ length: 30 }, (_, index) => ({
    id: (index + 1).toString(),
    orderID: ` #${index + 5060}`,
    customer: "Luna Love",
    totalItems: index
    
    // dateTime
  }));