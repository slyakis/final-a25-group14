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
import sauce from './sprites/sauce.png';
import cheese from './sprites/cheese.png';
import mushroom from './sprites/mushroom.png';
import pepperoni from './sprites/pepperoni.png';
import pepper from './sprites/pepper.png';
import olive from './sprites/olive.png';

const sprites = {
    pizzaBase,
    sauce,
    cheese,
    pepperoni,
    mushroom,
    pepper,
    olive
}

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

function GameplayArea({handleClick, handleBuy, orders, ingredients}) {
    const handleTimeUp = () => {
        alert("Time's Up!");
    };

    return (
        <div className="nes-container with-title is-centered container">
            <p className="title">Gameplay Area</p>

            {/* Orders */}
            <div className="orders">
                <OrderList orders={orders} />
                <div id="timer-container" className="nes-container is-rounded">
                    <Timer duration={120} onTimeUp={handleTimeUp} />
                </div>
            </div>

            {/* Ingredients & Buy */}
            <div id="ingredient-container" className="ingredients">
                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('sauce')}>Sauce: {ingredients.sauce}
                        <br/><img className="icon" src={sauceIcon} alt="sauce" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('sauce')}>Buy</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('cheese')}>Cheese: {ingredients.cheese}
                        <br/><img className="icon" src={cheeseIcon} alt="cheese" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('cheese')}>Buy</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('pepperoni')}>Pepperoni: {ingredients.pepperoni}
                        <br/><img className="icon" src={pepperoniIcon} alt="pepperoni" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('pepperoni')}>Buy</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('mushroom')}>Mushroom: {ingredients.mushroom}
                        <br/><img className="icon" src={mushroomIcon} alt="mushroom" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('mushroom')}>Buy</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('pepper')}>Pepper: {ingredients.pepper}
                        <br/><img className="icon" src={pepperIcon} alt="pepper" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('pepper')}>Buy</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('olive')}>Olive: {ingredients.olive}
                        <br/><img className="icon" src={oliveIcon} alt="olive" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('olive')}>Buy</button>
                </div>
            </div>

            {/* Pizza */}
            <div className="pizza">
                <div id="pizza-container" className="nes-container is-rounded">
                    <img src={pizzaBase} alt="pizza base" style={{ width: '400px', height: '400px' }} />
                </div>
            </div>

            {/* Oven */}
            <div className="oven">
                <div id="oven-container" className="nes-container is-rounded">
                    <p>insert oven here</p>
                </div>
            </div>

            {/* Bake/Sell Buttons */}
            <div className="footer">
                <button type="button" className="nes-btn is-error">Bake</button>
                <button type="button" className="nes-btn is-success">Sell</button>
            </div>
        </div>
    )
}

function App() {
    const [ingredients, setIngredients] = useState({
        sauce: 10,
        cheese: 10,
        pepperoni: 10,
        mushroom: 10,
        pepper: 10,
        olive: 10
    })

    const [orders, setOrders] = useState(() =>
        Array.from({length: 3}, () => generateOrder())
    );

    const [revenue, setRevenue] = useState(20)

    const user = true;  //remove once user login is done

    const handleClick = (ingredient) => {
        const pizzaContainer = document.getElementById("pizza-container");

        if (ingredients[ingredient] > 0) {
            setIngredients(prev => ({
                ...prev,
                [ingredient]: prev[ingredient] - 1,
            }))

            const topping = document.createElement('img');
            topping.src = sprites[ingredient];
            topping.alt = ingredient;
            topping.className = 'topping';
            topping.id = ingredient;
            pizzaContainer.appendChild(topping);
            console.log("added topping");
        } else {
            alert(ingredient + " needs to be restocked!");
        }
    }

    const handleBuy = (ingredient) => {
        setIngredients(prev => ({
            ...prev,
            [ingredient]: prev[ingredient] + 5,
        }))

        if (ingredient === 'pepperoni' || ingredient === 'mushroom') {
            setRevenue(prev => ({
                ...prev,
                [revenue]: prev[revenue] - 8,
            }))
        } else if (ingredient === 'olive' || ingredient === 'pepper') {
            setRevenue(prev => ({
                ...prev,
                [revenue]: prev[revenue] - 4,
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
            <GameplayArea handleClick={handleClick} handleBuy={handleBuy} orders={orders} ingredients={ingredients} />
        </div>
    )
}

export default App
