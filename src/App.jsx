import { useState } from 'react'
import './App.css'
import Timer from './Timer'
import "nes.css/css/nes.min.css"

function Header({user}) {
    return (
        <div>
            <span className="nes-text is-primary" id="header">Bad Pizza, Sad Pizza</span>
            <p id="userInfo">Welcome {user}!</p>
        </div>
    )
}

function HomePage({user}) {
    return (
        <div className="homePage">
            <>
                <span className="nes-text is-primary" id="mainHeader">Bad Pizza, Sad Pizza</span>
                <p id="userInfo">Sign in to start!</p>
                <div className="loginPage">
                    <a className="nes-btn" href="/auth/github" id="loginButton">Sign In with Github</a>
                </div>
            </>
        </div>
    )
}

function GameplayArea({handleClick}) {
    const handleTimeUp = () => {
        alert("Time's Up!");
    };

    return (
        <div className="nes-container with-title is-centered container">
            <p className="title">Gameplay Area</p>
            <div className="orders">
                <div className="nes-container is-rounded">
                    <p>Order #1</p>
                </div>
                <div className="nes-container is-rounded">
                    <p>Order #2</p>
                </div>
                <div className="nes-container is-rounded">
                    <p>Order #3</p>
                </div>
                <div id="timer-container" className="nes-container is-rounded">
                    <Timer duration={120} onTimeUp={handleTimeUp} />
                </div>
            </div>
            <div className="ingredients">
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('sauce')}>Sauce</button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('cheese')}>Cheese</button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('pepperoni')}>Pepperoni</button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('mushroom')}>Mushroom</button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('pepper')}>Pepper</button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('olive')}>Olive</button>
            </div>
            <div className="pizza">
                <div id="pizza-container" className="nes-container is-rounded">
                    <p>insert pizza here</p>
                </div>
            </div>
            <div className="oven">
                <div id="oven-container" className="nes-container is-rounded">
                    <p>insert oven here</p>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="nes-btn is-error">Bake</button>
                <button type="button" className="nes-btn is-success">Sell</button>
            </div>
        </div>
    )
}

function App() {
    const [ingredients, setIngredients] = useState({
        sauce:10,
        cheese: 10,
        pepperoni: 10,
        mushroom: 10,
        pepper: 10,
        olive: 10
    })

    const user = true;

    const handleClick = (ingredient) => {
        console.log(ingredient);
        if (ingredients[ingredient] > 0) {
            setIngredients(prev => ({
                ...prev,
                [ingredient]: prev[ingredient] - 1,
            }))
        } else {
            setIngredients(prev => ({
                ...prev,
                [ingredient]: prev[ingredient] + 5,
            }))
        }
    }

    if(!user) {
        return (
            <>
                <HomePage user={user} />
            </>
        )
    }

    return (
        <div className="gamePage">
            <Header user={user} />
            <GameplayArea handleClick={handleClick} />
        </div>
    )
}

export default App
