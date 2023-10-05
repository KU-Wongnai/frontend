import { SearchParams } from "@/app/interfaces/search-params";
import SearchSideBar from "./components/filter-sidebar";
import RestaurantCardSearch from "./components/restaurant-card-search";

const fetchSportsByName = (
  searchParams: SearchParams
  ) => {
  const where: any = {};

  if (searchParams.name) {
    const nameSport = {
      contains: searchParams.name.toLowerCase(),
    };
    where.name = nameSport;
  }
  if (searchParams.type) {
    const type = {
      name: {
        equals: searchParams.type.toLowerCase(),
      },
    };
    where.type = type;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }
  if (searchParams.location) {
    const location = {
      name: {
        equals: searchParams.location.toLowerCase(),
      },
    };
    where.location = location;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    type: true,
    location: true,
    slug: true,
    reviews: true,
  };
};

const fetchLocations = async () => {

};

const fetchName = async () => {

};

const fetchTypes = async () => {

};

export default async function Search(
  {
  searchParams,
}: {
  searchParams: SearchParams;
}
) {

  const mockRestaurantData: Restaurant = {
    id: 123,
    name: "Delicious Eatery",
    foodType: "Asian Fusion",
    rating: 4.7,
    description: "Best Asian Fusion in town. Come taste the deliciousness.",
    location: "123 Yummy St, Food City",
    contactInfo: "555-555-5555",
    image: "https://dummyimage.com/600x400/000/fff", // Replace with actual image URL
    menus: [
      {
        id: 1,
        name: "Pad Thai",
        description: "Stir-fried rice noodle dish",
        price: 12.99,
        category: "Entree",
        menuOptions: [
          {
            id: 1,
            name: "Spicy",
            price: 0,
            category: "Spice Level",
          },
          {
            id: 2,
            name: "Extra Chicken",
            price: 2.99,
            category: "Add Ons",
          },
        ],
        image: "https://dummyimage.com/600x400/000/fff", // Replace with actual image URL
      },
      {
        id: 2,
        name: "Spring Rolls",
        description: "Deep fried appetizer",
        price: 6.99,
        category: "Appetizer",
        menuOptions: [
          {
            id: 3,
            name: "Spicy",
            price: 0,
            category: "Spice Level",
          },
        ],
        image: "https://dummyimage.com/600x400/000/fff", // Replace with actual image URL
      },
      {
        id: 3,
        name: "Pad See Ew",
        description: "Stir-fried rice noodle dish",
        price: 12.99,
        category: "Entree",
        menuOptions: [
          {
            id: 4,
            name: "Spicy",
            price: 0,
            category: "Spice Level",
          },
          {
            id: 5,
            name: "Extra Chicken",
            price: 2.99,
            category: "Add Ons",
          },
        ],
        image: "https://dummyimage.com/600x400/000/fff", // Replace with actual image URL
      },
    ],
  };

  const checkRestaurant = () => {
    return (
      <>
        <RestaurantCardSearch {...mockRestaurantData} />
      </>
    );
  };

  return (
    <main className="container mx-auto py-6 px-4 sm:px-0">
      <div className="flex flex-col items-center justify-center w-11/12 py-4 m-auto md:items-start md:justify-between md:flex-row">
        <SearchSideBar
        // locations={locations}
        // types={types}
        // name={name}
        // searchParams={searchParams}
        />
        <div className="w-5/6">{checkRestaurant()}</div>
      </div>
    </main>
  );
}
