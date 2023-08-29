import { NextApiRequest, NextApiResponse } from "next";
import blog from "./blog.json";

const handleCategoriesRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const categories = blog.categories;
  res.status(200).json(categories);
};

export default handleCategoriesRequest;
