import React from "react";

interface ICardModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Record<string, any>;
    location: Record<string, any>;
    image: string;
  };
}

const CardModal: React.FC<ICardModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative flex flex-col w-[50%] max-w-[500px] h-[70vh] overflow-hidden"
        style={{
          backgroundImage: `url(${content?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 overflow-auto flex-grow">
          <h1 className="text-white text-center font-bold text-4xl mb-6">
            CHARACTERS PROFILE
          </h1>
          <div className="text-white text-lg space-y-2 px-2">
            <p>
              <span className="font-semibold">Name:</span> {content?.name}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {content?.status}
            </p>
            <p>
              <span className="font-semibold">Species:</span> {content?.species}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {content?.type}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {content?.gender}
            </p>
            <p>
              <span className="font-semibold">Origin:</span>{" "}
              {content?.origin?.name}
            </p>
            <p>
              <span className="font-semibold">Last Known Location:</span>{" "}
              {content?.location?.name}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex justify-end mt-4">
          <button
            className="py-3 px-6 text-lg font-semibold border border-gray-300 text-white rounded-lg hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
