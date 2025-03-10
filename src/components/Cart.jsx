// Cart.js
import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cartItems, handleRemoveFromCart }) => {
    const [showPaymentGateway, setShowPaymentGateway] = useState(false);
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    const handleProceedToCheckout = () => {
        setShowPaymentGateway(true);
    };

    const handlePayment = () => {
        alert('Payment Successful! Thank you for your purchase.');
        setShowPaymentGateway(false);
    };

    return (
        <div className="cart-page">
            <h2 className="cart-title">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items-container">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-title">{item.title}</h4>
                                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <h3>Total: ${totalAmount.toFixed(2)}</h3>
                        <button className="checkout-btn" onClick={handleProceedToCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}

            {/* Dummy Payment Gateway Modal */}
            {showPaymentGateway && (
                <div className="payment-gateway">
                    <div className="payment-modal">
                        <h2>Payment Gateway</h2>
                        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                        <input type="text" placeholder="Card Number" className="payment-input" />
                        <input type="text" placeholder="Expiry Date" className="payment-input" />
                        <input type="text" placeholder="CVV" className="payment-input" />
                        <button className="confirm-btn" onClick={handlePayment}>
                            Confirm Payment
                        </button>
                        <button
                            className="cancel-btn"
                            onClick={() => setShowPaymentGateway(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
