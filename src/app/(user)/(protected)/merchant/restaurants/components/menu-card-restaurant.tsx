import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
const RestaurantMenuCard: React.FC<any> = ({
  id,
  name,
  description,
  image,
  price,
  category,
  menuOptions,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();

  const openModal = () => {
    setIsModalOpen(true);
    const dialogElement = document.getElementById(
      "my_modal_5"
    ) as HTMLDialogElement | null;
    if (dialogElement) {
      dialogElement.showModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    const dialogElement = document.getElementById(
      "my_modal_5"
    ) as HTMLDialogElement | null;
    if (dialogElement) {
      dialogElement.close();
    }
  };

  const menuImage = image
    ? image
    : "https://covesurfandturf.com/wp-content/uploads/2021/09/food-placeholder-1.jpg";

  return (
    <>
      <button
        className="btn shadow-md mt-6 rounded-b-sm justify-start mr-5"
        onClick={openModal}
      >
        <div className="flex flex-col rounded-sm border">
          {/* food image */}
          {/* <div className="bg-white"> */}
          <Image
            alt="menuImage"
            src={menuImage} // Update the path to your image
            width={160}
            height={140}
            className="rounded-t-sm h-[140px] object-cover object-center"
          />
          {/* </div> */}
          {/* food description */}
          <div className="flex justify-between items-end bg-card h-[60px] rounded-b-sm px-2 py-3 m-1">
            <div className="flex flex-col items-start">
              <p className="text-xs font-normal text-gray-500 mb-1 mt-1">
                {category}
              </p>
              <p className="text-sm font-medium">{name}</p>
            </div>
            <div className="">
              <p className="text-sm font-medium">{price} ฿</p>
            </div>
          </div>
        </div>
      </button>

      {isModalOpen && (
        <div className="modal-wrapper ">
          <div className="modal-backdrop" onClick={closeModal}></div>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom xl:modal-middle w-1/3 bg-background rounded-md border"
          >
            <div className="flex flex-col modal-box px-10 py-5 rounded-lg">
              <div className="flex shadow-lg bg-card rounded-md mt-5">
                <Image
                  alt="salmon"
                  src={menuImage} // Update the path to your image
                  width={160}
                  height={140}
                  className="h-[200px] w-[200px] object-cover object-center rounded-l-sm"
                />
                <div className="flex flex-col justify-center space-y-3 ml-10 ">
                  <h3 className="font-bold text-lg">{name}</h3>
                  <h3 className="font-semibold text-md">{category}</h3>
                  <h3 className="font-normal text-md">{price} ฿</h3>
                </div>
              </div>
              <div className="flex flex-col mt-5 py-1">
                <p className="text-lg font-semibold mb-3">🥘 Description</p>
                <p>{description}</p>
              </div>

              <div className="modal-action mt-5">
                <form method="dialog" className="grid grid-cols-2 gap-4">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn px-2 py-2 border-green-600 text-green-600 border-2 font-medium text-sm rounded-md"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <a
                    href={`/merchant/restaurants/${params.restaurant_id}/menus/${id}/edit`}
                    className="flex items-center justify-center btn px-2 py-2 bg-green-600 text-white font-medium text-sm rounded-md"
                    onClick={closeModal}
                  >
                    Edit
                  </a>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default RestaurantMenuCard;
