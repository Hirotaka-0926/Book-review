import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Book } from "../type/type";
import BookOffset from "./BookOffset";
import { getBooks } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();

  const linkNewBook = () => {
    navigate("/new");
  };
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getBooks(count);
      const data = await response.json();
      console.log(response);
      setBooks(data);
    };
    fetchBooks();
  }, [count]);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">本一覧</h1>
        <button
          className="bg-green-700 mb-4 text-white rounded-md p-2"
          onClick={linkNewBook}
        >
          新規作成
        </button>
        <BookOffset counter={count} setCount={setCount} />
        <Link to="/edit">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <div key={book.id} className="bg-white p-4 rounded-md shadow-md">
                <h1>{book.title}</h1>
                <p>{book.url}</p>
                <p>{book.detail}</p>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
