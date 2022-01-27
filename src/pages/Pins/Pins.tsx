import { FC, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CreatePin, PinDetails } from ".";
import { Navbar, Feed, Search } from "../../components";
import { User } from "../../interfaces";

type PinsProps = {
  user?: User;
};

const Pins: FC<PinsProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:id" element={<Feed />} />
          <Route path="/pin/:id" element={<PinDetails user={user} />} />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={<Search setSearchTerm={setSearchTerm} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
