import React from "react";
import { Avatar, AvatarImage } from "../../../../../components/ui/avatar";

type Props = {};


const OrderCard: React.FC<any> = ({
    id,
    orderID,
    customer,
    totalItem,
    decoration
  }) =>{
  return (
    <>
      <div className="flex flex-col mt-2 ml-6 border-b-2 border-gray-200 py-3">
        <div className="flex text-xs text-green-600 font-md py-2">
          <p>Order number :</p>
          <p>{orderID}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 mr-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm">{customer}</p>
                <p className="text-xs font-light">{totalItem} items</p>
              </div>
            </div>
            <button className={"bg-green-600 text-white px-1 py-1  rounded-md "+ decoration}>
              accept
            </button>
          </div>
          <p className="text-green-600 text-xs font-light">
            16 August 2023, 16:03:59
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
