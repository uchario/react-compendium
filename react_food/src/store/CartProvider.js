import { useReducer } from 'react';

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_CART_ITEM":
            let updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
            
            const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
            const existingCartItem = state.items[existingCartItemIndex];

            let updatedItems;

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem, 
                    amount: existingCartItem.amount + action.item.amount
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };

        case "REMOVE_CART_ITEM":
            const existingCartItemIndexRemove = state.items.findIndex(
                (item) => item.id === action.id
            );
            const existingCartItemRemove = state.items[existingCartItemIndexRemove];
            const updatedTotalAmountRemove = state.totalAmount - existingCartItemRemove.price;
            
            let updatedItemsRemove;

            if (existingCartItemRemove.amount === 1) {
                updatedItemsRemove = state.items.filter((item) => item.id !== action.id);
            } else {
                const updatedItem = {...existingCartItemRemove, amount: existingCartItemRemove.amount - 1};
                updatedItemsRemove = [...state.items];
                updatedItemsRemove[existingCartItemIndexRemove] = updatedItem;
            }

            return {
                items: updatedItemsRemove,
                totalAmount: updatedTotalAmountRemove
            };

        case "CLEAR":
            return defaultCartState;

        default:
            return defaultCartState;
    }
   
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD_CART_ITEM', item: item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE_CART_ITEM', id: id});
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;