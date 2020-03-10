import React from 'react';
import { withRouter } from 'react-router-dom';

import { MenuItemContainer, BackgroundImage, 
        ContentContainer, TitleContainer, SubtitleContainer } from './menu-item.styles';




const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (

        <MenuItemContainer
            size={size} 
            onClick={() => {history.push(`${linkUrl}`)}}
        >
            <BackgroundImage
                className='background-image' imageUrl={imageUrl} />
            <ContentContainer>
                <TitleContainer>{title.toUpperCase()}</TitleContainer>
                <SubtitleContainer>SHOP NOW</SubtitleContainer>
            </ContentContainer>
        </MenuItemContainer>

);

export default withRouter(MenuItem); 