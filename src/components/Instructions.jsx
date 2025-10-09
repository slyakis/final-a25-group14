function Instructions() {

    return (
        <div className="nes-container with-title is-centered instructions-container">
            <h1 className="title">Instructions</h1>
            <ol className="instructions">
                <li>Make the given pizza orders at the top.</li>
                <li>Click on each ingredient to add it to the pizza.</li>
                <li>Click the trash button if you mess up an order.</li>
                <li>Click bake to send your finished pizza into the oven.</li>
                <li>Once it has baked, click sell to submit the order.</li>
                <li>Click on the buy button under each ingredient when you run out to get more.</li>
                <li>Different orders are worth different prices, the goal is to make as much revenue as you can!</li>
            </ol>
        </div>
    );
}

export default Instructions;