import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MasonryLayout, Spinner } from "..";
import { client } from "../../client";
import { PinData } from "../../interfaces";
import { feedQuery, searchQuery } from "../../utils";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState<PinData[]>();

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const getData = async (query: string) => {
      const data: PinData[] = await client.fetch(query);
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

  return <>{pins && <MasonryLayout pins={pins} />}</>;
};

export default Feed;
