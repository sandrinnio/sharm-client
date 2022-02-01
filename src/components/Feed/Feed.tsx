import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MasonryLayout, Spinner } from "..";
import { client } from "../../client";
import { PinData } from "../../interfaces";
import { feedQuery, searchQuery } from "../../utils";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState<PinData[]>();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const getData = async (query: string) => {
      const data: PinData[] = await client.fetch(query);
      setPins(data);
      setLoading(false);
    };

    if (id) {
      const query = searchQuery(id);
      getData(query);
    } else {
      getData(feedQuery);
    }
  }, [id]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  if (!pins?.length) return <h2>No pins available</h2>;

  return <>{pins && <MasonryLayout pins={pins} />}</>;
};

export default Feed;
