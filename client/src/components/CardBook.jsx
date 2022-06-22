import React from "react";

export default function CardBook({title,cover,price,rating}){
    return(
        <div>
            <img src={cover} alt="Not Found ):" width='150x'/>
            <h2>{title}</h2>
            <p>{rating}</p>
            <p>{price}$</p>
        </div>
    )
}