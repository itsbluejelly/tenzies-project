import React from "react";

export default function Header(){
    return(
        <div className="header-text text-center flex flex-col gap-[20px] font-['Inter']">
            <h1 className="header text-[#2B283A] text-5xl transition-all duration-500 hover:text-6xl hover:cursor-pointer">Tenzies</h1>
            <p className="header-details w-[30ch] leading-7 text-lg text-[#4A4E74] transition-all duration-500 hover:text-xl hover:cursor-pointer">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
    )
}