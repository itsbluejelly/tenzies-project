import React from "react"
import Dice from "./components/Dice"
import GameButton from "./components/GameButton"
import ToggleButton from "./components/ToggleButton"
import Header from "./components/Header"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    // INITIATE A CONST LIST OF DICE ELEMENTS WHICH CONTAINS THE INFO OF EACH DICE
    const [diceElementsInfo, setDiceElementsInfo] = React.useState(generateDiceInfoList())
    // INITIATE A BOOLEAN TO DETERMINE WHETHER IT IS A DARK OR LIGHT MODE
    const [darkMode, setDarkMode] = React.useState(false)
    // INITIATE A BOOLEAN TO DETERMINE IF GAME IS WON
    const [isWon, setIsWon] = React.useState(false)
    // INITIATE A BOOLEAN TO DETERMINE IF GAME HAS BEGAN
    const [hasStarted, setHasStarted] = React.useState(false)
    // A DICTIONARY OF STYLES FOR USE BY TOGGLING LIGHT AND DARK MODE
    const styles={
        dark:{
            main:{
               backgroundColor:"#0B2434" 
            },
            dice:{
                color:"#0B2434"
            },
            gameButton:{
                backgroundColor:"#5035FF"
            },
            toggleSlider:{
                backgroundColor: "#59E391",
                justifyContent:"flex-start"
            },
            toggler:{
                backgroundColor:"#0B2434"
            }
        },
        light:{
            main:{
                backgroundColor:"#59E391" 
            },
            dice:{
                color:"#59E391"
            },
            gameButton:{
                backgroundColor:"#59E391"
            },
            toggleSlider:{
                backgroundColor: "black",
                justifyContent:"flex-end"
            },
            toggler:{
                backgroundColor:"grey"
            }
        },
        activated:{
            dice:{
                light:{
                    backgroundColor:"#59E391",
                    color:"white"
                },
                dark:{
                    backgroundColor:"#5035FF",
                    color:"white"
                }
            }
        }
    }

    // CONVERTING THE LIST OF INFO TO A LIST OF DICE COMPONENTS WHILE PASSING PROPS
    const diceElements = diceElementsInfo.map(diceElementInfo => (
        <Dice
            id={diceElementInfo.id}
            value={diceElementInfo.value}
            isHeld={diceElementInfo.isHeld}
            styles={
                diceElementInfo.isHeld ?
                    darkMode ?
                        styles.activated.dice.dark:
                            styles.activated.dice.light
                    :
                    darkMode ?
                        styles.dark.dice:
                            styles.light.dice
            }
            handleClick={() => holdDice(diceElementInfo.id)}
        />
    ))
    
    // FUNCTION TO PRODUCE DICE INFO OF A UNIQUE ID AND A RANDOM VALUE AND A BOOLEAN
    function generateDiceInfo(){
        return ({
            id: nanoid(),
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false 
        })
    }

    // FUNCTION TO CREATE A LIST OF THE DICE INFO
    function generateDiceInfoList(){
        const newArray = []

        for(let i = 0; i < 10; i ++){
            newArray.push(generateDiceInfo())
        }

        return newArray
    }

    // FUNCTION TO REPLACE THE LIST OF DICE INFO WITH ANOTHER LIST OF NEW DICE INFO, UNLESS THE DICE IS HELD AT WHICH ITS VALUE IS PERSISTED
    function rollDice(){
        setDiceElementsInfo(prevDiceElementsInfo => {
            const newArray = []

            prevDiceElementsInfo.map(diceElementInfo => {
                if(diceElementInfo.isHeld){
                    newArray.push(diceElementInfo)
                }else{
                    newArray.push(generateDiceInfo())
                }
            })

            return newArray
        })
    }

    // FUNCTION TO HOLD DOWN A DICE WHEN CLICKED
    function holdDice(id){
        if(!isWon){
            setDiceElementsInfo(prevDiceElementsInfo => (
                prevDiceElementsInfo.map(diceElementInfo => {
                    if(diceElementInfo.id === id){
                        return {
                            ...diceElementInfo,
                            isHeld: !diceElementInfo.isHeld
                        }
                    }else{
                        return diceElementInfo
                    }
                })
            ))
        }
    }

    // FUNCTION CALLED WHEN GAME IS RESTARTED
    function restartGame(){
        setIsWon(false)
        setHasStarted(false)
        setDiceElementsInfo(generateDiceInfoList())
    }

    function startGame(){
        setHasStarted(true)
    }

    // FUNCTION THAT CHECKS IF SOMEONE HAS WON EVERY TIME THE LIST CONTAINING THE DATA OF THE DICE COMPONENT CHANGES, LIKE WHEN CLICKING ON IT OR ROLLING A DICS
    React.useEffect(() => {
        const diceReferral = diceElementsInfo[0].value
        const listReferral = []
        
        function checkWinner(){
            diceElementsInfo.map(diceElement => {
                if(diceReferral === diceElement.value && diceElement.isHeld){
                    listReferral.push(diceElement)
                }
            })
    
            if(listReferral.length === 10){
                setIsWon(true)
            }
        }

        return checkWinner()
    }, [diceElementsInfo])
    

    return (
    // THE WHOLE GAME OR HOME SCREEN IS CONTAINED WITHIN THE MAIN ELEMENT OF PADDING 30PX TOP AND BOTTOM, PADDING 20PX LEFT AND RIGHT
    <main
        className="min-h-screen py-[30px] font-['Roboto'] transition-all duration-500"
        style={darkMode ? styles.dark.main : styles.light.main}
    >
        {/* RENDERING CONFETTI COMPONENT ONLY WHEN GAME IS WON */}
        {isWon && <Confetti></Confetti>}

        {/* THE WHOLE GAME CONTAINS A DIV WHICH HOUSES THE ENTIRE GAME CONTENT WITH A MARGIN LEFT AND RIGHT OF 10PX */}
        <div className="bg-white h-[90vh] mx-[20px] rounded-[10px] shadow-3xl flex flex-col items-center justify-evenly px-[20px]">
            {/* THE DICES ARE CONTAINED IN A GRID OF DICES CONTAINER WHICH IS RENDERED IF GAME HAS BEGAN*/}
            {hasStarted && <div className="grid grid-flow-col grid-rows-2 gap-[20px]">
                {diceElements}
            </div>}

            {/* THE HEADER TEXT IN THE HOME PAGE IS INTRODUCED ONLY WHEN THE GAME HAS NOT BEGAN */}
            {!hasStarted && <Header/>}

            {/* A FLEX CONTAINER HOLDING BOTH GAME BUTTON AND TOGGLE BUTTON */}
            <div 
                className="flex flex-col justify-between items-center gap-[2rem]"
            >
                <GameButton
                    handleClick={hasStarted ?
                        isWon ?
                            restartGame
                        :
                            rollDice
                    :
                        startGame}
                    styles={darkMode ? styles.dark.gameButton : styles.light.gameButton}
                    buttonText={hasStarted ? 
                        isWon ?
                            "Restart Game"
                        :
                            "Roll Dice"
                    :
                        "Start Game"}
                />
                <ToggleButton
                    handleClick={() => setDarkMode(prevMode => !prevMode)}
                    styles={darkMode ? styles.dark : styles.light}
                />
            </div>
        </div>
    </main>
    )
}
