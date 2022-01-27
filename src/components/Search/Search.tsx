import { FC } from "react";

type SearchProps = {
  setSearchTerm: (searchTerm: string) => void;
};

const Search: FC<SearchProps> = () => {
  return <div>Search</div>;
};

export default Search;
