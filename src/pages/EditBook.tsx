import React, { useState } from "react";
import Header from "../Header";

const EditTask = () => {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  return (
    <React.Fragment>
      <Header />
      <input value={title} className="" id="title" />
    </React.Fragment>
  );
};

export default EditTask;
