import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SideBar() {
  const allBooks = useSelector((state) => state.books);

  const orderBooksByRating = allBooks.sort((a, b) => {
    if (a.price > b.price) return 1;
    if (b.price > a.price) return -1;
    return 0;
  });

  const top5Rating = orderBooksByRating.slice(0, 5);

  return (
    <div>
      <div>
        <h3>Top 5 Rating</h3>
        {top5Rating.length ? (
          <div>
            <h5>
              #1{top5Rating[0].cover}
              {top5Rating[0].title}
              {top5Rating[0].price}
            </h5>
            <h5>
              #2{top5Rating[1].cover}
              {top5Rating[1].title}
              {top5Rating[1].price}
            </h5>
            <h5>
              #3{top5Rating[2].cover}
              {top5Rating[2].title}
              {top5Rating[2].price}
            </h5>
            <h5>
              #4{top5Rating[3].cover}
              {top5Rating[3].title}
              {top5Rating[3].price}
            </h5>
            <h5>
              #5{top5Rating[4].cover}
              {top5Rating[4].title}
              {top5Rating[4].price}
            </h5>
          </div>
        ) : (
          "No"
        )}
      </div>
      <div>
        <h3>Top 5 Sold</h3>
        <h5>Soon...</h5>
      </div>
    </div>
  );
}
