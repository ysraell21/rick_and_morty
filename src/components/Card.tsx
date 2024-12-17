import React, { useState } from "react";
import CardModal from "./CardModal";

interface IProps {
  id?: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Record<string, any>;
  location: Record<string, any>;
  image: string;
}

const Card: React.FC<IProps> = ({
  name,
  status,
  image,
  species,
  type,
  gender,
  origin,
  location,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dotColor =
    status === "Alive"
      ? "bg-green-500"
      : status === "Dead"
      ? "bg-red-500"
      : "bg-gray-500";

  const handleCardClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center overflow-visible">
      <div
        className="relative cursor-pointer border-double border-4 border-green-600 flex flex-col justify-between p-2 rounded-[5%] text-white overflow-hidden w-60 md:w-72 h-[350px] bg-white transform transition-transform duration-300 ease-in-out hover:scale-105"
        onClick={handleCardClick}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt="Character background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="z-10">
          <h2 className="text-2xl font-bold mb-0.5 text-black truncate">
            {name || "Unknown"}
          </h2>
        </div>

        <div className="bg-black flex items-center pl-1 pr-2 py-1 z-10">
          <div className="flex items-center gap-2">
            <div className="icon h-[15px] w-[15px] rounded-full grid place-content-center bg-white">
              <div className={`h-1.5 w-1.5 rounded-full ${dotColor}`}></div>
            </div>
            <p className="text-white">{status || "Unknown"}</p>
          </div>
        </div>

        <img
          src={image}
          alt="Character"
          className="w-40 object-cover mt-5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] mx-auto mb-7 z-10"
        />
      </div>

      <CardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={{
          name,
          status,
          species,
          type,
          gender,
          origin,
          location,
          image,
        }}
      />
    </div>
  );
};

export default Card;
