import React, { createContext, useContext, useState } from 'react'

// start bucket or shared bucket
const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);