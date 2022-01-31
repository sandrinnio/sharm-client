import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { SanityImageAssetDocument } from "@sanity/client";
import { client } from "../../client";
import { Button, Spinner } from "../../components";
import { categories } from "../../utils";
import { User } from "../../interfaces";

type CreatePinProps = {
  user?: User;
};

type CreatePinState = {
  title?: string;
  about?: string;
  destination?: string;
  fields?: boolean;
  category?: string;
  imageAsset?: SanityImageAssetDocument | null;
};

const CreatePin: FC<CreatePinProps> = ({ user }) => {
  const [state, setState] = useState<CreatePinState>();
  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (
      selectedFile?.type === "image/png" ||
      selectedFile?.type === "image/svg" ||
      selectedFile?.type === "image/jpeg" ||
      selectedFile?.type === "image/gif" ||
      selectedFile?.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);

      try {
        const document = await client.assets.upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        });

        setState({ imageAsset: document });
        setLoading(false);
      } catch (error) {
        console.log("Upload failed:", error);
      }
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = async () => {
    if (state && user) {
      const { title, about, destination, category, imageAsset } = state;

      if (title && about && destination && imageAsset?._id && category) {
        const doc = {
          _type: "pin",
          title,
          about,
          destination,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          },
          userId: user._id,
          postedBy: {
            _type: "postedBy",
            _ref: user._id,
          },
          category,
        };

        await client.create(doc);

        navigate("/");
      } else {
        setState({ fields: true });

        setTimeout(() => {
          setState({ fields: false });
        }, 2000);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {state?.fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please add all fields.
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {!state?.imageAsset && (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                    TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            )}
            {state?.imageAsset && (
              <div className="relative h-full">
                <img src={state.imageAsset.url} alt="uploaded-pic" />
                <Button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setState({ ...state, imageAsset: null })}
                  text={<MdDelete />}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={state?.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={state?.about}
            onChange={(e) => setState({ ...state, about: e.target.value })}
            placeholder="Tell everyone what your Pin is about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="url"
            value={state?.destination}
            onChange={(e) =>
              setState({ ...state, destination: e.target.value })
            }
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) =>
                  setState({ ...state, category: e.target.value })
                }
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">
                  Select Category
                </option>
                {categories.map((item) => (
                  <option
                    key={item.name}
                    className="text-base border-0 outline-none capitalize bg-white text-black "
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <Button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                text="Save Pin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
