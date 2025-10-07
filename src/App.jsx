import React, {useEffect, useState} from 'react'
import './App.css'
import Timer from './Timer'
import "nes.css/css/nes.min.css"
import OrderList from './components/OrderList.jsx';
import {generateOrder} from "./generateOrder.jsx";
import sauceIcon from './sprites/sauceIcon.png';
import cheeseIcon from './sprites/cheeseIcon.png';
import pepperoniIcon from './sprites/pepperoniIcon.png';
import mushroomIcon from './sprites/mushroomIcon.png';
import oliveIcon from './sprites/oliveIcon.png';
import pepperIcon from './sprites/pepperIcon.png';
import pizzaBase from './sprites/base.png';

function Header({user}) {
    return (
        <div className="header">
            <span className="nes-text is-primary" id="title">Bad Pizza, Sad Pizza</span>
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

function GameplayArea({handleClick, orders}) {
    const handleTimeUp = () => {
        alert("Time's Up!");
    };

    return (
        <div className="nes-container with-title is-centered container">
            <p className="title">Gameplay Area</p>
            <div className="orders">
                <OrderList orders={orders} />
                <div id="timer-container" className="nes-container is-rounded">
                    <Timer duration={120} onTimeUp={handleTimeUp} />
                </div>
            </div>
            <div className="ingredients">
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('sauce')}>Sauce
                    <img className="icon" src={sauceIcon} alt="sauce" />
                </button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('cheese')}>Cheese
                    <img className="icon" src={cheeseIcon} alt="cheese" />
                </button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('pepperoni')}>Pepperoni
                    <img className="icon" src={pepperoniIcon} alt="pepperoni" />
                </button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('mushroom')}>Mushroom
                    <img className="icon" src={mushroomIcon} alt="mushroom" />
                </button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('pepper')}>Pepper
                    <img className="icon" src={pepperIcon} alt="pepper" />
                </button>
                <button type="button" className="nes-btn is-primary" onClick={() => handleClick('olive')}>Olive
                    <img className="icon" src={oliveIcon} alt="olive" />
                </button>
            </div>
            <div className="pizza">
                <div id="pizza-container" className="nes-container is-rounded">
                    <img src={pizzaBase} alt="pizza base" style={{ width: '400px', height: '400px' }} />
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
    const [orders, setOrders] = useState(() =>
        Array.from({length: 3}, () => generateOrder())
    );

    const user = true;  //remove once user login is done

    const handleClick = (ingredient) => {
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
            <GameplayArea handleClick={handleClick} orders={orders} />
        </div>
    )
}

export default App
