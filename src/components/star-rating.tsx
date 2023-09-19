"use client";
import React, { useState } from 'react';
import Rating from 'react-star-rating-component';

interface StarRatingProps {
   initialRating: number; // Specify the type as number
 }
 
 function StarRating({ initialRating }: StarRatingProps) {
   const [rating, setRating] = useState(initialRating);
   // Specify the types for nextValue, prevValue, and name
   const handleStarClick = (nextValue: number, prevValue: number, name: string) => {
     setRating(nextValue);
   };

  return (
    <div>
      <Rating
         name="rating"
        value={rating}
        onStarClick={(nextValue, prevValue, name) => handleStarClick(nextValue, prevValue, name)}
        starCount={5}
        starColor={'#ffb400'}
        emptyStarColor={'#ccc'}
      />
    </div>
  );
}

export default StarRating;

{/* <StarRating initialRating={3} /> Example: Initial rating is set to 3 */}

