import React from 'react';
import 'nes.css/css/nes.min.css';

const TOPPING_SPRITES = {
    sauce: '/sprites/sauce.png',
    cheese: '/sprites/cheese.png',
    pepperoni: '/sprites/pepperoni.png',
    mushrooms: '/sprites/mushrooms.png',
    olives: '/sprites/olives.png',
    onions: '/sprites/onions.png',
    peppers: '/sprites/peppers.png',
    sausage: '/sprites/sausage.png',
};

export default function OrderCard({ order }) {
    return (
        <div className="nes-container is-rounded is-dark" style={{ width: '250px', margin: '10px' }}>
            <p className="title">Order #{order.id.slice(0, 4)}</p>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    minHeight: '60px',
                    width: '100%',
                }}
            >
                {order.toppings.map((topping, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <img
                            src={TOPPING_SPRITES[topping]}
                            alt={topping}
                            style={{ width: '24px', height: '24px' }}
                        />
                    </div>
                ))}
            </div>

            <hr />
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                <i className="nes-icon coin is-small" style={{ marginRight: '5px' }}></i>
                ${order.price.toFixed(2)}
            </p>
        </div>
    );
}