import React, { useState } from "react";
import { Book } from "../type/type";
import { putNewBook } from "../api/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const NewBook = () => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [cookies] = useCookies();
  const token = cookies.token;
  const navigate = useNavigate();

  const sendNewBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Book = {
      title: title,
      url: url,
      detail: detail,
      review: review,
    };
    console.log(data);
    console.log(token);

    const response = await putNewBook(data, token);
    const errData = await response.json();

    if (response.ok) {
      navigate("/");
    } else {
      setError(errData);
      console.log(errData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">新しい本を追加</h2>
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={sendNewBook}
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              本のタイトル
            </label>
            <input
              id="title"
              type="text"
              placeholder="本のタイトル"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              本のURL
            </label>
            <input
              id="url"
              type="text"
              placeholder="本のURL"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-700"
            >
              詳細
            </label>
            <textarea
              id="detail"
              placeholder="詳細"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={(e) => setDetail(e.target.value)}
              value={detail}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            >
              レビュー
            </label>
            <textarea
              id="review"
              placeholder="レビュー"
              className="border border-gray-300 p-2 w-full rounded-md"
              onChange={(e) => setReview(e.target.value)}
              value={review}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            追加
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBook;
