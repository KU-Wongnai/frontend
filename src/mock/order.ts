export const mockOrderData = [

  {
    id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
    restaurant: {
      id: 253,
      name: "Sushi Power test16",
      location: "Bangkhen",
      contactInfo: "0998765431",
      image: null,
      menu: [
        {
          id: 52,
          name: "menu1",
          price: 50.0,
          image: null,
        },
      ],
    },
    orderItems: [
      {
        id: "12e6bbc9-8cc2-41ef-98da-770426c4ddc3",
        menu: {
          id: 52,
          name: "menu1",
          price: 50.0,
          image: null,
        },
        quantity: 2,
        orderItemOption: [
          {
            id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
            name: "option1",
            price: 20.0,
            category: "Sushi",
          },
          {
            id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
            name: "option2",
            price: 30.0,
            category: "Sushi",
          },
        ],
        price: 50.0,
        totalPrice: 100.0,
      },
      {
        id: "12e6bbc9-8cc2-41ef-98da-770426c4ddc3",
        menu: {
          id: 52,
          name: "Menu2",
          price: 100.0,
          image: null,
        },
        quantity: 1,
        orderItemOption: [
          {
            id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
            name: "option1",
            price: 10.0,
            category: "Sushi",
          },
          {
            id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
            name: "option2",
            price: 40.0,
            category: "Sushi",
          },
        ],
        price: 100.0,
        totalPrice: 150.0,
      },
    ],
    status: "RECEIVED",
    delivery: null,
    user: {
      id: 17,
      name: "Weerawong Vonggatunyu",
      email: "qu1etboy15@dev.io",
      emailVerifiedAt: null,
      avatar: null,
    },
    createdAt: "2023-10-18T15:36:23",
    updatedAt: "2023-10-18T15:36:23",
  },


  {
    id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
    restaurant: {
      id: 253,
      name: "Sushi Power test16",
      location: "Bangkhen",
      contactInfo: "0998765431",
      image: null,
      menu: [
        {
          id: 52,
          name: "Sushi",
          price: 200.0,
          image: null,
        },
      ],
    },
    orderItems: [
      {
        id: "12e6bbc9-8cc2-41ef-98da-770426c4ddc3",
        menu: {
          id: 52,
          name: "Sushi",
          price: 250.0,
          image: null,
        },
        quantity: 2,
        orderItemOption: [
          {
            id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
            name: "Sushi",
            price: 250.0,
            category: "Sushi",
          },
          {
            id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
            name: "Sushi2",
            price: 250.0,
            category: "Sushi",
          },
        ],
        price: 250.0,
        totalPrice: 0.0,
      },
      {
        id: "12e6bbc9-8cc2-41ef-98da-770426c4ddc3",
        menu: {
          id: 52,
          name: "Sushi",
          price: 250.0,
          image: null,
        },
        quantity: 2,
        orderItemOption: [
          {
            id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
            name: "Sushi",
            price: 250.0,
            category: "Sushi",
          },
          {
            id: "d2f9d19e-0b1f-4481-92fd-c71c4f4af3ef",
            name: "Sushi2",
            price: 250.0,
            category: "Sushi",
          },
        ],
        price: 250.0,
        totalPrice: 0.0,
      },
    ],
    status: "PREPARING",
    delivery: null,
    user: {
      id: 17,
      name: "Weerawong Vonggatunyu",
      email: "qu1etboy15@dev.io",
      emailVerifiedAt: null,
      avatar: null,
    },
    createdAt: "2023-10-18T15:36:23",
    updatedAt: "2023-10-18T15:36:23",
  },

];
