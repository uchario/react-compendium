import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    // props from Header
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 3000);

        return() => {
            clearTimeout(timer);
        };
        
    },[items]);
    
    return  (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={`${classes.icon}`}>
                <CartIcon/>
            </span>
            <span>Your cart</span>
            <span className={`${classes.badge}`}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;