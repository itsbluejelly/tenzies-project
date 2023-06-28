import React from "react";

/* A BUTTON TO ENGAGE THE GAME */
export default function GameButton(props){
    return(
        <button 
            className="bg-[#59E391] dark:bg-[#5035FF] text-white font-extrabold font-['Roboto'] max-w-[200px] p-[30px] rounded-lg h-[24px] flex justify-center items-center text-[1.2rem] game-button whitespace-nowrap transition-all duration-500 hover:outline-[10px] hover:shadow-3xl"
            style={props.styles}
            onClick={props.handleClick}
        >
            <p>{props.buttonText}</p>
        </button>
    )
}