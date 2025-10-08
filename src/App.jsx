import {useEffect, useState} from 'react'
import './App.css'
import Timer from './Timer.jsx'
import "nes.css/css/nes.min.css"
import OrderList from './components/OrderList.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import {generateOrder} from "./generateOrder.jsx";
import { getCurrentUser, logout, saveGameSession } from './utils/api.js';
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

function Header({user, onLogout, activeTab, setActiveTab}) {
    return (
        <div className="header">
            <span className="nes-text is-primary" id="title">Bad Pizza, Sad Pizza</span>
            <div className="navigation">
                <button
                    type="button"
                    className={`nes-btn ${activeTab === 'game' ? 'is-primary' : ''}`}
                    onClick={() => setActiveTab('game')}
                >
                    Game
                </button>
                <button
                    type="button"
                    className={`nes-btn ${activeTab === 'leaderboard' ? 'is-primary' : ''}`}
                    onClick={() => setActiveTab('leaderboard')}
                >
                    Leaderboard
                </button>
            </div>
            <p id="userInfo">Welcome {user.username}!</p>
            <button type="button" className="nes-btn is-error" onClick={onLogout}>Logout</button>
        </div>
    )
}

function HomePage() {
    const githubAuthUrl = import.meta.env.VITE_GITHUB_AUTH_URL || 'http://localhost:3001/auth/github';

    return (
        <div className="homePage">
            <span className="nes-text is-primary" id="mainHeader">Bad Pizza, Sad Pizza</span>
            <p id="userInfo">Sign in to start!</p>
            <div className="loginPage">
                <a className="nes-btn" href={githubAuthUrl} id="loginButton">Sign In with Github</a>
            </div>
        </div>
    )
}

function GameplayArea({handleClick, handleTrash, handleBuy, handleSell, orders, ingredients, revenue, currentPizza, onTimeUp}) {
    const handleTimeUp = () => {
        onTimeUp();
    };

    return (
        <div className="nes-container with-title is-centered container">
            <button type="button" className="nes-btn is-error" onClick={() => handleTrash()}>Trash</button>
            <p>Revenue: {revenue}</p>

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
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('sauce')}>Buy FREE</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('cheese')}>Cheese: {ingredients.cheese}
                        <br/><img className="icon" src={cheeseIcon} alt="cheese" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('cheese')}>Buy FREE</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('pepperoni')}>Pepperoni: {ingredients.pepperoni}
                        <br/><img className="icon" src={pepperoniIcon} alt="pepperoni" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('pepperoni')}>Buy 5/$8</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('mushroom')}>Mushroom: {ingredients.mushroom}
                        <br/><img className="icon" src={mushroomIcon} alt="mushroom" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('mushroom')}>Buy 5/$8</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('pepper')}>Pepper: {ingredients.pepper}
                        <br/><img className="icon" src={pepperIcon} alt="pepper" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('pepper')}>Buy 5/$4</button>
                </div>

                <div className="ingredient-pair">
                    <button type="button" className="nes-btn is-primary ingredient-btn" onClick={() => handleClick('olive')}>Olive: {ingredients.olive}
                        <br/><img className="icon" src={oliveIcon} alt="olive" />
                    </button>
                    <button type="button" className="nes-btn is-warning buy-btn" onClick={() => handleBuy('olive')}>Buy 5/$4</button>
                </div>
            </div>

            {/* Pizza */}
            <div className="pizza">
                <div id="pizza-container" className="nes-container is-rounded">
                    <img src={pizzaBase}
                         alt="pizza base"
                         className="pizza-base"
                         style={{ width: '400px', height: '400px' }} />
                    {currentPizza.map((ingredient, index) => (
                        <img
                            key={index}
                            src={sprites[ingredient]}
                            alt={ingredient}
                            className={`topping topping-${ingredient}`}
                        />
                    ))}
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
                <button type="button" className="nes-btn is-success" onClick={handleSell}>Sell</button>
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
    const [currentPizza, setCurrentPizza] = useState([])
    const [user, setUser] = useState(null)
    const [_gameFinished, setGameFinished] = useState(false)
    const [pizzasSold, setPizzasSold] = useState(0)
    const [activeTab, setActiveTab] = useState('game')

    // Load user on component mount
    useEffect(() => {
        const loadUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        };

        loadUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleClick = (ingredient) => {
        if (currentPizza.includes(ingredient)) {
            alert(`${ingredient} is already on the pizza!`);
            return;
        }

        if (ingredients[ingredient] <= 0) {
            alert(`${ingredient} needs to be restocked!`);
            return;
        }

        setIngredients(prevStock => ({
            ...prevStock,
            [ingredient]: prevStock[ingredient] - 1,
        }));

        setCurrentPizza(prev => [...prev, ingredient]);
    }

    const handleBuy = (ingredient) => {
        setIngredients(prev => ({
            ...prev,
            [ingredient]: prev[ingredient] + 5,
        }))

        if (ingredient === 'pepperoni' || ingredient === 'mushroom') {
            setRevenue(prev => prev - 8)
        } else if (ingredient === 'olive' || ingredient === 'pepper') {
            setRevenue(prev => prev - 4)
        }
    }

    const handleSell = () => {
        if (orders.length === 0) return alert("No orders!");

        const sortedPizza = [...currentPizza].sort();
        console.log("sorted pizza: " + sortedPizza);

        const matchingIndex = orders.findIndex(order => {
            const sortedOrder = [...order.toppings].sort();
            console.log("sorted order: " + sortedOrder);
            return (
                sortedPizza.length === sortedOrder.length &&
                sortedPizza.every((topping, i) => topping === sortedOrder[i])
            );
        });

        if (matchingIndex === -1) {
            alert("Wrong pizza! Customer rejected it.");
        } else {
            const order = orders[matchingIndex];
            setRevenue(prev => prev + order.price);
            setPizzasSold(prev => prev + 1);
            alert(`Sold order ${order.id.slice(0, 4)} for $${order.price}!`);

            setOrders(prev => {
                const newOrders = [...prev];
                newOrders.splice(matchingIndex, 1);
                newOrders.push(generateOrder());
                return newOrders;
            })
        }

        setCurrentPizza([]);
    };

    const handleTrash = () => {
        setCurrentPizza([]);
    }

    const handleTimeUp = async () => {
        setGameFinished(true);
        alert(`Time's Up! You sold ${pizzasSold} pizzas and earned $${revenue}!`);

        // Save game session if user is logged in
        if (user) {
            try {
                await saveGameSession({
                    userId: user.id,
                    username: user.username,
                    pizzasSold: pizzasSold,
                    revenue: revenue,
                    gameTime: 120 // 2 minutes in seconds
                });
                console.log('Game session saved successfully');
            } catch (error) {
                console.error('Failed to save game session:', error);
            }
        }
    };

    if(!user) {
        return (
            <>
                <HomePage />
            </>
        )
    }

    return (
        <div className="gamePage">
            <Header user={user} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'game' ? (
                <GameplayArea handleClick={handleClick}
                              handleTrash={handleTrash}
                              handleBuy={handleBuy}
                              handleSell={handleSell}
                              orders={orders}
                              ingredients={ingredients}
                              revenue={revenue}
                              currentPizza={currentPizza}
                              onTimeUp={handleTimeUp} />
            ) : (
                <Leaderboard />
            )}
        </div>
    )
}

export default App