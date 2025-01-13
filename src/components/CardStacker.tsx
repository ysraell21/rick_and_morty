import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const CardStacker: React.FC = () => {
  const [allData, setAllData] = useState<Array<Record<string, any>>>([]);
  const [displayData, setDisplayData] = useState<Array<Record<string, any>>>([]);
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
      const formatCombinedData = (combinedData || [])?.map((item: Record<string, any>) => {
        return {
          ...item,
          status: item?.status === "unknown" ? "?" : item?.status,
        };
      });
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
    <div className="py-10 flex flex-col items-center overflow-auto h-screen">
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
      <div className="fixed bottom-4 right-4 flex justify-end space-x-4">
        {currentPage > 0 && (
          <button
            className="py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-gray-700 hover:text-white"
            onClick={handlePrev}
          >
            Previous
          </button>
        )}

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
  );
};

export default CardStacker;


// return (
//   <>
//     <div className="py-10 flex flex-col">
//       <div className="flex space-x-4">
//         {displayData.map((item: Record<string, any>) => (
//           <Card
//             key={item.id}
//             name={item.name}
//             status={item.status}
//             species={item.species}
//             image={item.image}
//             type={item.type}
//             gender={item.gender}
//             origin={item.origin}
//             location={item.location}
//           />
//         ))}
//       </div>
//     </div>
//     <div className="fixed bottom-4 right-4 flex justify-end space-x-4">
//       {currentPage > 0 && (
//         <button
//           className="py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-gray-700 hover:text-white"
//           onClick={handlePrev}
//         >
//           Previous
//         </button>
//       )}

//       {(currentPage + 1) * limit < allData.length && (
//         <button
//           className="py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-gray-700 hover:text-white"
//           onClick={handleNext}
//         >
//           Next
//         </button>
//       )}
//     </div>
//   </>
// );