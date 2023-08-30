import { NextApiRequest, NextApiResponse } from "next";
import blog from "./blog.json";

const handlePostRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const posts = blog.posts;
  const post = posts.find((post) => post.id === Number(id));

  res.status(200).json(post);
};

export default handlePostRequest;
