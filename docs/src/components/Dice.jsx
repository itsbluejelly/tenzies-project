import React from "react";

export default function Dice(props){
    return(
        // THE DICE INSTANCE IS A DIV WHICH CONTAINS A PARAGRAPH AND IS A SQUARE OF 60PX AND A PADDING OF 20PX
        <div 
            className="bg-white rounded-[4px] shadow-dice max-w-[70px] max-h-[70px] min-w-[30px] min-h-[30px] p-[20px] flex justify-center items-center cursor-pointer flex-grow dice transition-all duration-200"
            key={props.id}
            onClick={props.handleClick}
            style={props.styles}
        >
            <p 
                className="font-extrabold text-[1.5rem] dice-text"
                >{props.value}
            </p>
        </div>
    )
}