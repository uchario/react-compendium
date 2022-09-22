import { useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.amount;
    }, 0);
    
    return  (
        <button className={`${classes.button}`} onClick={props.onClick}>
            <span className={`${classes.icon}`}>
                <CartIcon/>
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;