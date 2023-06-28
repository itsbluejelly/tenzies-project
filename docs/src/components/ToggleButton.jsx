import React from "react";

// A TOGGLE BUTTON COMPONENT WHICH CONSISTS OF A DIV THAT HOUSES 2 PARAGRAPHS AND A TOGGLER
export default function ToggleButton(props){
    return(
        <div
            className="flex toggle-button"
        >
            <p
                className="text-[0.8rem] text-[#59E391]"
                style={props.styles.toggleTextLight}
            >Light
            </p>
            <div
                className="w-[40px] rounded-full mx-[5px] toggle-slider flex"
                style={props.styles.toggleSlider}
            >
                <div
                    className="toggler w-[20px] rounded-full h-[20px] cursor-pointer"
                    style={props.styles.toggler}
                    onClick={props.handleClick}
                ></div>
            </div>
            <p
                className="text-[0.8rem] text-gray"
                style={props.styles.toggleTextDark}
            >Dark
            </p>
        </div>
    )
}