import React from 'react';
import "./CartPage.css"

const CartPage = ({ cartItems, clearCart }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = () => {
        alert('Payment Successful! Thank you for your purchase.');
        clearCart();
    };

    return (
        <div className="cart-page">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <img src={item.image} alt={item.name} />
                            <span>{item.name}</span>
                            <span>₹{item.price}</span>
                        </div>
                    ))}
                    <div className="cart-total">
                        <p>Total: ₹{total}</p>
                        <button onClick={handleCheckout}>Make Payment</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
