import { Fragment, useContext, useState } from 'react';
import useHttp from '../../hooks/use-http';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

import classes from './Cart.module.css';

const Cart  = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const { isLoading: isSubmitting, error, sendRequest: sendMealsRequest } = useHttp();

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

     const orderHandler = () => {
        setIsCheckout(true); //
     };

    const submitOrderHandler = async (userData) => {
        sendMealsRequest( {
            url: 'https://react-https-request-cfd6e-default-rtdb.firebaseio.com/orders.json',
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json' 
            },
            body: {
                user: userData,
                orderedItems: cartCtx.items
            }
          },
          
        );
        setDidSubmit(true);
        cartCtx.clearCart();
    };

     const modalAction = (
        <div 
                className={`${classes.actions}`}
            >
                <button 
                    className={`${classes['button--alt']}`}
                    onClick={props.onClose}
                >
                    Close
                </button>
                {hasItems &&
                <button
                    className={`${classes.button}`}
                    onClick={orderHandler}
                >
                    Order
                </button>}
            </div>
     );

    const cartModalContent = (
        <Fragment>
            <ul className={`${classes['cart-items']}`}>
                {cartCtx.items.map((cart) => (
                    <CartItem
                        key={cart.id}
                        name={cart.name}
                        amount={cart.amount}
                        price={cart.price}
                        onRemove={cartItemRemoveHandler.bind(null, cart.id)}
                        onAdd={cartItemAddHandler.bind(null, cart)}
                    />
                ))}
            </ul>
            <div className={`${classes.total}`}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modalAction}
        </Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = 
        <Fragment>
            <p>Successfully sent the order!</p>
            <div 
                className={`${classes.actions}`}
            >
                <button 
                    className={`${classes['button']}`}
                    onClick={props.onClose}
                >
                    Close
                </button>
            </div>
        </Fragment>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;