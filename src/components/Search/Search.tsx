import { FC, useEffect, useState } from "react";
import { MasonryLayout, Spinner } from "..";
import { client } from "../../client";
import { PinData } from "../../interfaces";
import { feedQuery, searchQuery } from "../../utils";

type SearchProps = {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
};

const Search: FC<SearchProps> = ({ searchTerm }) => {
  const [pins, setPins] = useState<PinData[]>();
  const [loading, setLoading] = useState(false);

  const fetchPins = async (query: string) => {
    const data: PinData[] = await client.fetch(query);
    setPins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      fetchPins(query);
    } else {
      fetchPins(feedQuery);
    }
  }, [searchTerm]);

  return (
    <>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </>
  );
};

export default Search;
