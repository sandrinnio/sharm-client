import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { client, urlFor } from "../../client";
import { PinData, UserInfo } from "../../interfaces";
import { fetchUser } from "../../utils";
import { Button } from "../../components";

type PinProps = {
  pin: PinData;
};

const Pin: FC<PinProps> = ({
  pin: { _id, image, destination, postedBy, save },
}) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const userInfo: UserInfo = fetchUser();

  const alreadySaved = !!save?.filter(
    (item) => item.postedBy._id === userInfo?.googleId
  )?.length;

  const savePin = async (id: string) => {
    if (!alreadySaved) {
      setSavingPost(true);

      await client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: v4(),
            userId: userInfo?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.googleId,
            },
          },
        ])
        .commit();

      window.location.reload();
    }
  };

  const deletePin = async (id: string) => {
    await client.delete(id);

    window.location.reload();
  };

  return (
    <div className="w-max m-2">
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin/${_id}`)}
      >
        <img
          className="rounded-lg w-full"
          alt="user-post"
          src={urlFor(image.asset.url).width(250).url()}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image.asset.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved && (
                <Button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  text={`${save?.length} Saved`}
                />
              )}
              {!alreadySaved && (
                <Button
                  type="button"
                  text={`${savingPost ? "Saving..." : "Save"}`}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                />
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {!!destination?.slice(8).length && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.slice(8, 17)}...
                </a>
              )}
              {postedBy._id === userInfo?.googleId && (
                <Button
                  type="button"
                  text={<AiTwotoneDelete />}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user/${postedBy._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy.image}
          alt="user-logo"
        />
        <p className="font-semibold capitalize">{postedBy.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
