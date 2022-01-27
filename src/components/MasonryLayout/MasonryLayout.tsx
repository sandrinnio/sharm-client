import { FC } from "react";
import Masonry from "react-masonry-css";
import { PinData } from "../../interfaces";
import { Pin } from "../../pages";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout: FC<{ pins: PinData[] }> = ({ pins }) => (
  <Masonry
    className="flex animate-slide-fwd"
    breakpointCols={breakpointColumnsObj}
  >
    {pins?.map((pin) => (
      <Pin key={pin._id} pin={pin} />
    ))}
  </Masonry>
);

export default MasonryLayout;
