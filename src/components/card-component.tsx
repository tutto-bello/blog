import React, { FC, useState } from "react";
import { Post } from "../types";
import Image from "next/image";

const CardComponent: FC<{
  post: Post;
  findCategoryNameById: (id: number) => string | undefined;
}> = ({
  post: { id, slug, title, excerpt, imageUrl, categories },
  findCategoryNameById,
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="bg-white shadow-lg m-4 rounded-lg w-full md:w-1/3 lg:w-1/4 hover:cursor-pointer hover:-translate-y-3 duration-150">
      <div className="w-full h-36 relative rounded-t-lg">
        <Image
          src={imageUrl}
          alt={title}
          objectFit="cover"
          fill
          className={`
            duration-700 ease-in-out rounded-t-md
            ${
              isLoading
                ? "grayscale blur-sm scale-100"
                : "grayscale-0 blur-0 scale-100"
            }
          `}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className="p-6">
        <div className="flex">
          {categories.map((category, i) => (
            <p
              className="text-purple-600 font-bold text-sm mr-1"
              key={category}
            >
              {categories.length > 1
                ? findCategoryNameById(category) +
                  (categories.length !== i + 1 ? ", " : "")
                : findCategoryNameById(category)}
            </p>
          ))}
        </div>
        <h2 className="font-bold text-xl mt-2">{title}</h2>
        <p className="mt-2 text-gray-500">{excerpt}</p>
      </div>
    </div>
  );
};

export default CardComponent;
