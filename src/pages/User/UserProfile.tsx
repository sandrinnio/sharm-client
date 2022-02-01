import { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../../utils";
import { client } from "../../client";
import { Button, MasonryLayout, Spinner } from "../../components";
import { PinData, User } from "../../interfaces";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState<User>();
  const [pins, setPins] = useState<PinData[]>();
  const [text, setText] = useState<string | null>("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const navigate = useNavigate();

  useEffect(() => {
    const query = userQuery(id);

    const fetchUser = async () => {
      const data: User[] = await client.fetch(query);
      setUser(data[0]);
    };

    fetchUser();
  }, [id]);

  const fetchPins = async (query: string) => {
    const data: PinData[] = await client.fetch(query);
    setPins(data);
  };

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(id);

      fetchPins(createdPinsQuery);
    } else {
      const savedPinsQuery = userSavedPinsQuery(id);

      fetchPins(savedPinsQuery);
    }
  }, [text, id]);

  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  if (!user) return <Spinner message="Loading profile..." />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {id === user._id && (
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <Button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    text={<AiOutlineLogout color="red" fontSize={21} />}
                  />
                )}
                onLogoutSuccess={logout}
              />
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <Button
            type="button"
            onClick={(e) => {
              setText(e.currentTarget.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
            text="Created"
          />
          <Button
            type="button"
            onClick={(e) => {
              setText(e.currentTarget.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
            text="Saved"
          />
        </div>
        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>
        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
