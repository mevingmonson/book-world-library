import React from "react";

const Book = ({ title, isbn, author }) => {
  return (
    <div style={{ border: "2px solid black", width: "30%", float: "left" }}>
      <h3>{title}</h3>
      <p>By {author}</p>
      <p>ISBN {isbn}</p>
    </div>
  );
};

export default Book;
