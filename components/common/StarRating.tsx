import React from 'react';
import Star from "@/components/pages/search-result/assets/Star.svg";
import StarFilled from "@/components/pages/search-result/assets/StarFilled.svg";
import Image from 'next/image';
import '@smastrom/react-rating/style.css'


const StarRating = ({reviewCount, totalRating}) => {
    const avgRating = Math.floor(totalRating / reviewCount);
    // const avgRating = 3;

    // Create an array to hold the star elements
    const starElements = [];


    for (let i = 1; i <= 5; i++) {
        // Determine whether the star should be filled or empty based on the rating
        const starType = i <= avgRating ? Star : StarFilled;

        // Push the star element into the array
        starElements.push(
            <Image
                className="StarImg"
                priority
                src={starType}
                alt=""
            />
        );
    }
    return (
        <div className="starImgBox">
            {starElements}
        </div>
    );
};

export default StarRating;