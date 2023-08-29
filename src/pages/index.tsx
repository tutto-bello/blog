import React, { useState, useEffect } from "react";
import { Category, Post } from "../types";
import debounce from "lodash/debounce";
import CategoryFilterComponent from "../components/category-filter-component";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Create a debounced version of the search query state to limit api calls number
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    // Update debounced search query after debounce delay
    const handler = debounce(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 800);
    handler();
    // Cleanup the debounce timer
    return () => {
      handler.cancel();
    };
  }, [searchQuery, selectedCategories]);

  const fetchData = async () => {
    setIsLoading(true);
    let url = `/api/posts?page=${currentPage}&query=${searchQuery}&category=${selectedCategories}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setCurrentPage(data.totalPages === 0 ? 0 : 1);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const fetchCategory = async () => {
    let url = `/api/categories`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchData();
    // disable eslint because fetch Data in dependency array make endless render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, selectedCategories, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title"
      />

      <CategoryFilterComponent
        categories={categories}
        selectedCategories={selectedCategories}
        onChange={setSelectedCategories}
        isLoading={isLoading}
      />

      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}

      <button onClick={handlePrevPage}>Prev</button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}
