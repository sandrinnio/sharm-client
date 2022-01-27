import { FC } from "react";
import { urlFor } from "../../client";
import { PinData } from "../../interfaces";

type PinProps = {
  pin: PinData;
  className: string;
};

const Pin: FC<PinProps> = ({
  pin: { _id, image, destination, postedBy },
  className,
}) => {
  return (
    <div>
      <img
        className="rounded-lg w-full"
        alt="user-post"
        src={urlFor(image).width(250).url()}
      />
    </div>
  );
};

export default Pin;
