import SearchSideBar from "./components/filter-sidebar";
import RestaurantCardSearch from "./components/restaurant-card-search";

export enum PRICE {
  CHEAP = "CHEAP",
  REGULAR = "REGULAR",
  EXPENSIVE = "EXPENSIVE",
}

interface SearchParams {
  name?: string;
  type?: string;
  price?: PRICE;
  location?: string;
}

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

  const mockRestaurantData = {
    id: 123,
    name: "Delicious Eatery",
    foodType: "Asian Fusion",
    rating: 4.7,
    description: "Best Asian Fusion in town. Come taste the deliciousness.",
    location: "123 Yummy St, Food City",
    operatingHours: 10,
    contactInfo: "555-555-5555",
    image: "https://dummyimage.com/600x400/000/fff", // Replace with actual image URL
    menus: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    ],
    href: "/restaurants/123",
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
