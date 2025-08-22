'use client'

import { createContext, useContext, useState } from "react"

const ProductContext = createContext()

export default function ProductsProvider(props) {
    const { children } = props

    const [cart, setCart] = useState({})

    function handleIncrementProduct(price_id, num, data, noIncrement) {
        const newCart = {
            ...cart
        }
        // product already in cart, so increment or decrement number in cart
        if (price_id in cart) {
            //newCart[price_id] = newCart[price_id] + num
            newCart[price_id] = {
                ...data,
                quantity:noIncrement ? num : newCart[price_id]?.quantity + num
            }
        } else {
        // product not in cart, so add it to cart
            newCart[price_id] = {
                ...data,
                quantity: num
            }
        }
        // number in cart decremented to 0, so remove product from cart
        if (parseInt(newCart[price_id].quantity) <= 0) {
            delete newCart[price_id]
        }
        // Overwrite old cart state with new cart state
        setCart(newCart)
    }

    const value = {
        cart,
        handleIncrementProduct
    }
    
    
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}
export const useProducts = () => useContext(ProductContext)