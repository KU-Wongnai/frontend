import { Delivery, DeliveryStatus, Order, OrderStatus, RestaurantOrder } from "@/types/order";

const restaurantSample: RestaurantOrder = {
  id: 1,
  name: "Tasty Sushi",
  // description: "Experience the best sushi in town",
  location: "Downtown",
  // foodType: "Japanese",
  contactInfo: "099-876-5432",
  image: null,
  // rating: 4.5,
  menu: [
    {
      id: 1,
      name: "Classic Sushi Set",
      // description: "A set of various classic sushi selections",
      image: null,
      price: 300.0,
      // category: "Japanese",
      // orderItemOption: [
      //   {
      //     id: 1,
      //     name: "Extra Wasabi",
      //     price: 15.0,
      //     category: "Extra",
      //   },
      //   {
      //     id: 2,
      //     name: "Extra Ginger",
      //     price: 15.0,
      //     category: "Extra",
      //   },
      // ],
    },
    {
      id: 2,
      name: "Vegetarian Sushi Set",
      // description: "A delightful selection of vegetarian sushi",
      image: null,
      price: 270.0,
      // category: "Japanese",
      // menuOptions: [],
    },
  ],
};

const orderSample: Order = {
  id: "order1",
  restaurant: restaurantSample,
  user: {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    emailVerifiedAt: new Date(),
    avatar: "avatar-url",
  },
  orderItems: [
    {
      id: "item1",
      // name: "Classic Sushi Set",
      price: 300.0,
      totalPrice: 600.0,
      quantity: 2,
      menu: {
        id: 1,
        name: "Classic Sushi Set",
        price: 300.0,
        image: "sushi-image-url",
      },
      orderItemOption: [
        {
          id: "option1",
          name: "Extra Wasabi",
          price: 15.0,
          category: "Extra",
        },
        {
          id: "option2",
          name: "Extra Ginger",
          price: 15.0,
          category: "Extra",
        },
      ],
    },
  ],
  status: "PENDING" as OrderStatus,
  delivery: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const deliverySample: Delivery = {
  id: "delivery1",
  riderId: null,
  deliveryAddress: "123 Sushi St.",
  contactInfo: "john-doe-contact",
  status: "PENDING" as DeliveryStatus,
  order: orderSample,
};

const ordersSample: Order[] = [
  {
    id: "order1",
    restaurant: restaurantSample,
    user: {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      emailVerifiedAt: new Date(),
      avatar: "avatar-url",
    },
    orderItems: [
      {
        id: "item1",
        // name: "Classic Sushi Set",
        price: 300.0,
        totalPrice: 600.0,
        quantity: 2,
        menu: {
          id: 1,
          name: "Classic Sushi Set",
          price: 300.0,
          image: "https://via.placeholder.com/150",
        },
        orderItemOption: [
          {
            id: "option1",
            name: "Extra Wasabi",
            price: 15.0,
            category: "Extra",
          },
          {
            id: "option2",
            name: "Extra Ginger",
            price: 15.0,
            category: "Extra",
          },
        ],
      },
      {
        id: "item1",
        // name: "Classic Sushi Set",
        price: 300.0,
        totalPrice: 600.0,
        quantity: 2,
        menu: {
          id: 1,
          name: "Classic Sushi Set",
          price: 300.0,
          image: "https://via.placeholder.com/150",
        },
        orderItemOption: [
          {
            id: "option1",
            name: "Extra Wasabi",
            price: 15.0,
            category: "Extra",
          },
          {
            id: "option2",
            name: "Extra Ginger",
            price: 15.0,
            category: "Extra",
          },
        ],
      },
    ],
    status: "PENDING" as OrderStatus,
    delivery: deliverySample,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // ... you can add more orders as needed
  {
    id: "order2",
    restaurant: restaurantSample,
    user: {
      id: 2,
      name: "Jane Doe",
      email: "jane@gmail.com",
      emailVerifiedAt: new Date(),
      avatar: "avatar-url",
    },
    orderItems: [
      {
        id: "item2",
        // name: "Vegetarian Sushi Set",
        price: 270.0,
        totalPrice: 270.0,
        quantity: 1,
        menu: {
          id: 2,
          name: "Vegetarian Sushi Set",
          price: 270.0,
          image: "https://via.placeholder.com/150",
        },
        orderItemOption: [],
      },
    ],
    status: "COMPLETED" as OrderStatus,
    delivery: deliverySample,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];


export default ordersSample;
