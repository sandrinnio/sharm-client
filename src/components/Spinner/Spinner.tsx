import { FC } from "react";
import HashLoader from "react-spinners/HashLoader";

const Spinner: FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <HashLoader color="#00BFFF" />
      <p className="text-lg text-center px-2 m-5">{message}</p>
    </div>
  );
};

export default Spinner;
