import React from "react";

const team = [
  {
    id: "6410406860",
    name: "Weerawong Vonggatunyu",
    role: "Fullstack Developer",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    id: "6410406860",
    name: "Weerawong Vonggatunyu",
    role: "Fullstack Developer",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    id: "6410406860",
    name: "Weerawong Vonggatunyu",
    role: "Fullstack Developer",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    id: "6410406860",
    name: "Weerawong Vonggatunyu",
    role: "Fullstack Developer",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    id: "6410406860",
    name: "Weerawong Vonggatunyu",
    role: "Fullstack Developer",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
  {
    id: "6410406860",
    name: "Weerawong Vonggatunyu",
    role: "Fullstack Developer",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
  },
];

const AboutUsPage = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Meet the crew
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          We are students from Kasetsart University
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {team.map((member) => (
          <div key={member.id} className="text-center">
            <img
              className="rounded-xl sm:w-48 sm:h-48 lg:w-60 lg:h-60 mx-auto"
              src={member.image}
              alt="Image Description"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg dark:text-gray-200">
                {member.name}
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base dark:text-gray-400">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
