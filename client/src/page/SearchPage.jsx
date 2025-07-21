import React from "react";
import Filter from "../component/Search/Filter";
import ProductList from "../component/Search/ProductList";
import { useSearch } from "../context/Search";
import FilterSidebar from "../component/Search/FilterSidebar";

const SearchPage = () => {
  const [search] = useSearch();
  // console.log(search);
  return (
    <div className="flex justify-between ml-[9rem] mr-[5rem] mt-8">
      {/* <h1>Search Page</h1> */}
      <FilterSidebar />
      <ProductList products={search.results ? search.results.data : []} />
    </div>
  );
};

export default SearchPage;
