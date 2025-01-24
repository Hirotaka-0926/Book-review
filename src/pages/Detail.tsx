import React, { useState, useEffect } from "react";
import Header from "../Header";
import { getBook } from "../api/api";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const Detail = () => {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [cookies] = useCookies();
  const token = cookies.token;
  const router = useParams();
  const id = router.id;

  const sendEditBook = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const setBook = async () => {
      const response = await getBook(token, id!);
      const result = await response.json();
      if (response.ok) {
        setTitle(result.title);
        setDetail(result.detail);
        setReview(result.review);
        setUrl(result.url);
      } else {
        setError(response.statusText);
      }
    };
    setBook();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">新しい本を追加</h2>
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={sendEditBook}
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Detail;
