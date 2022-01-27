import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MasonryLayout, Spinner } from "..";
import { client } from "../../client";
import { feedQuery, searchQuery } from "../../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const getData = async (query: string) => {
      const data = await client.fetch(query);
      setPins(data);
      setLoading(false);
    };

    if (categoryId) {
      const query = searchQuery(categoryId);
      getData(query);
    } else {
      getData(feedQuery);
    }
  }, [categoryId]);

  console.log("pins: ", pins);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
