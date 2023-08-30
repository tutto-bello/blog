import React, { useState, useEffect } from "react";
import { Category, Post } from "../types";
import debounce from "lodash/debounce";
import CategoryFilterComponent from "../components/category-filter-component";
import CardComponent from "../components/card-component";
import LayoutComponent from "../components/layout/layout-component";
import PaginationComponent from "../components/pagination-component";
import LoadingComponent from "../components/loading-component";

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

  const fetchData = async () => {
    setIsLoading(true);
    let url = `/api/posts?page=${currentPage}&query=${searchQuery}&category=${selectedCategories}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.totalPages === 0) {
        setCurrentPage(0);
      }
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

  const findCategoryNameById = (id: number) => {
    const value = categories.find((category) => category.id === id);
    return value?.name;
  };

  useEffect(() => {
    setCurrentPage(1);
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

  useEffect(() => {
    fetchCategory();
    fetchData();
    // disable eslint because fetch Data in dependency array make endless render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, selectedCategories, currentPage]);

  return (
    <LayoutComponent>
      <div className="flex flex-wrap lg:justify-between">
        <div>
          <h2 className="text-lg font-bold">Search by title:</h2>
          <input
            type="text"
            id="search"
            className="appearance-none rounded-lg border-gray-400 bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-md border-2 focus:border-purple-600 hover:border-purple-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title"
          />
        </div>
        <CategoryFilterComponent
          categories={categories}
          selectedCategories={selectedCategories}
          onChange={setSelectedCategories}
          isLoading={isLoading}
        />
      </div>
      {isLoading && (
        <div className="flex flex-wrap justify-center">
          <LoadingComponent />
        </div>
      )}

      {posts.length === 0 && !isLoading && (
        <div className="flex justify-center items-center h-96 mb-1">
          <p className="font-bold">No Results Match Your Search!</p>
        </div>
      )}

      <div className="flex flex-wrap justify-center">
        {posts.length > 0 &&
          !isLoading &&
          posts.map((post) => (
            <CardComponent
              post={post}
              key={post.id}
              findCategoryNameById={findCategoryNameById}
            />
          ))}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </LayoutComponent>
  );
}
