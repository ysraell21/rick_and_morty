import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import logo from "../assets/rick_&_morty_logo.png";

const CardStacker: React.FC = () => {
  const [allData, setAllData] = useState<Array<Record<string, any>>>([]);
  const [displayData, setDisplayData] = useState<Array<Record<string, any>>>(
    []
  );
  const [currentPage, setCurrentPage] = useState(0);

  const limit = 5; // Number of cards per page for web view

  const fetchAllData = async () => {
    try {
      const firstResponse = await axios.get(
        "https://rickandmortyapi.com/api/character?page=1"
      );
      const totalPages = firstResponse.data.info.pages;

      const promises = [];
      for (let i = 1; i <= totalPages; i++) {
        promises.push(
          axios.get(`https://rickandmortyapi.com/api/character?page=${i}`)
        );
      }

      const responses = await Promise.all(promises);
      const combinedData = responses.flatMap(
        (response) => response.data.results
      );
      const formatCombinedData = (combinedData || [])?.map(
        (item: Record<string, any>) => {
          return {
            ...item,
            status: item?.status === "unknown" ? "?" : item?.status,
          };
        }
      );
      setAllData(formatCombinedData);
      setDisplayData(formatCombinedData.slice(0, limit));
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage * limit < allData.length) {
      setCurrentPage(nextPage);
      setDisplayData(allData.slice(nextPage * limit, (nextPage + 1) * limit));
    }
  };

  const handlePrev = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 0) {
      setCurrentPage(prevPage);
      setDisplayData(allData.slice(prevPage * limit, (prevPage + 1) * limit));
    }
  };

  return (
    <>
      <div className="bg-blue-100 fixed top-0 left-0 right-0 z-50 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            <img className="h-auto max-w-20" src={logo} alt="image" />
          </div>
        </div>
      </div>

      <div className="mt-60 py-10 flex flex-col items-center overflow-auto h-screen">
        {/* Responsive Card Layout */}
        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-4 w-full px-4`}
        >
          {displayData.map((item: Record<string, any>) => (
            <div key={item.id} className="flex justify-center">
              <Card
                name={item.name}
                status={item.status}
                species={item.species}
                image={item.image}
                type={item.type}
                gender={item.gender}
                origin={item.origin}
                location={item.location}
              />
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-between px-4">
          {/* Mobile view buttons */}
          <div className="sm:hidden flex justify-between w-full">
            {/* Previous button (left side) */}
            {currentPage > 0 && (
              <button
                className="fixed bottom-4 left-4 py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-gray-700 hover:text-white"
                onClick={handlePrev}
              >
                &lt; {/* Previous symbol */}
              </button>
            )}

            {/* Next button (right side by default) */}
            {(currentPage + 1) * limit < allData.length && (
              <button
                className="fixed bottom-4 right-4 py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-gray-700 hover:text-white"
                onClick={handleNext}
              >
                &gt; {/* Next symbol */}
              </button>
            )}
          </div>

          {/* Web view buttons */}
          <div className="hidden sm:flex justify-end space-x-4 w-full">
            {currentPage > 0 && (
              <button
                className="py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-gray-700 hover:text-white"
                onClick={handlePrev}
              >
                Previous
              </button>
            )}

            {/* Only show Next button if there is more data */}
            {(currentPage + 1) * limit < allData.length && (
              <button
                className="py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-gray-700 hover:text-white"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardStacker;
