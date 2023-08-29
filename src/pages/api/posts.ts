import { NextApiRequest, NextApiResponse } from "next";
import blog from "./blog.json";

function containsAllNumbers(sourceArray: number[], targetArray: number[]) {
  return sourceArray.every((number) => targetArray.includes(number));
}

function filterByTitle(posts: any[], query: string) {
  return posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
}

function filterByCategory(posts: any[], selectedCategories: number[]) {
  return posts.filter((post) =>
    containsAllNumbers(selectedCategories, post.categories)
  );
}

function getPaginatedResults(
  posts: any[],
  startIndex: number,
  endIndex: number
) {
  return posts.slice(startIndex, endIndex);
}

function handlePostsRequest(req: NextApiRequest, res: NextApiResponse) {
  const { query, category, page = 1 } = req.query;
  const postsPerPage = 3;
  const startIndex = (Number(page) - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  let filteredPosts = blog.posts;

  if (query) {
    filteredPosts = filterByTitle(filteredPosts, query.toString());
  }

  if (category) {
    const categories = category as string;
    const selectedCategories = categories
      .split(",")
      .map((numberString) => parseFloat(numberString.trim()));
    filteredPosts = filterByCategory(filteredPosts, selectedCategories);
  }

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedResults = getPaginatedResults(
    filteredPosts,
    startIndex,
    endIndex
  );

  res.status(200).json({ posts: paginatedResults, totalPages });
}

export default handlePostsRequest;
