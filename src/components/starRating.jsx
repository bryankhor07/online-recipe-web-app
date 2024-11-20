import React, { useState } from "react";
import "./starRating.css"; // Add appropriate styles

const StarRating = ({ onRating, averageRating, readOnly = false }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const displayedRating = readOnly ? averageRating : hover || rating;

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= displayedRating ? "on" : "off"}
            onClick={
              !readOnly
                ? () => {
                    setRating(index);
                    onRating(index);
                  }
                : undefined
            }
            onMouseEnter={!readOnly ? () => setHover(index) : undefined}
            onMouseLeave={!readOnly ? () => setHover(rating) : undefined}
            disabled={readOnly} // Disable button when read-only
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
