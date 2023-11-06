import React from "react";

const MyRestaurantListSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array(10)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-md w-full border animate-pulse"
                    >
                        <div className="h-40 dark:bg-gray-700 bg-gray-300"></div>
                        <div className="p-4">
                            <div className="h-5 bg-gray-300 dark:bg-gray-700 mb-2 rounded-sm"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 w-3/4 mb-2 rounded-sm"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-700 w-1/2 rounded-sm"></div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default MyRestaurantListSkeleton;