import React from 'react';
import { connect } from 'react-redux';

//import './collection-item.styles.scss';

import { CollectionItemContainer, ItemFooterContainer } from './collection-item.styles';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';


const CollectionItem = ({item, addItem}) => {
    const { name, price, imageUrl } = item;

    return (
    <CollectionItemContainer>
        <div className='image'
            style={{ backgroundImage: `url(${imageUrl})`}}
        />
        <ItemFooterContainer>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </ItemFooterContainer>
        <CustomButton onClick={() => addItem(item)} inverted>Add to cart</CustomButton>

    </CollectionItemContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);
