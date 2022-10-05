import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart  = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    return (
        <Modal onClose={props.onClose}>
            <ul 
                className={`${classes['cart-items']}`}
            >
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
            <div 
                className={`${classes.total}`}
            >
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
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
                >
                    Order
                </button>}
            </div>
        </Modal>
    );
};

export default Cart;