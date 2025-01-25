import React, { useState, useEffect } from "react";
import Header from "../Header";
import { getBook, putBook } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const EditBook = () => {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const token = cookies.token;
  const router = useParams();
  const id = router.id;

  const sendEditBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: title,
      detail: detail,
      review: review,
      url: url,
    };
    const response = await putBook(data, token, id!);
    const result = await response.json();
    if (response.ok) {
      console.log("成功");
      navigate("/");
    } else {
      setError(response.status + " 送信に失敗しました" + result.ErrorMessageJP);
    }
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

export default EditBook;
