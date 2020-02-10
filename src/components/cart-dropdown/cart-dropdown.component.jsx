import React from 'react';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selector';
import './cart-dropdown.style.scss';
import { createStructuredSelector } from 'reselect';
import { withRouter} from 'react-router-dom';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItem.length ?
                (cartItems.map(cartItem => 
                    (<CartItem key={cartItem.id} item={CartItem}/>)))
                : (
                    <span className='empty-message'>Your cart is empty</span>
                )
            }
        </div>
        <CustomButton onClick={() =>{ 
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }}>
            GO TO CHECKOUT
        </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));