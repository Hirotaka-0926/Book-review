import React from "react";

interface Props {
  counter: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const BookOffset: React.FC<Props> = ({ counter, setCount }) => {
  const handlePrev = () => {
    if (counter == 0) {
      setCount(0);
    } else {
      setCount(counter - 10);
    }
  };
  return (
    <div className="flex justify-between mb-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={handlePrev}
      >
        前へ
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={() => setCount((prev) => prev + 10)}
      >
        次へ
      </button>
    </div>
  );
};

export default BookOffset;
