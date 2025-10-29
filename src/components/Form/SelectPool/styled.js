import styled from 'styled-components'  


export const BadgePoll = styled.div.attrs({ 
})`
    display: flex;
    flex-wrap: wrap;
    gap: 12px; 
    align-items: center;
    min-height: 56px;
`; 

export const Badge = styled.div.attrs({ 
})`
    padding: 4px 4px 4px 8px;
    border-radius: 16px ;
    border: 1px solid ${ props => props.theme.palette.colors.shadow };
    display: flex;
    gap: 12px;
  
`;
export const BadgeRemove = styled.div.attrs({ 
})`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: ${ props => props.theme.palette.colors.shadow };

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all .3s ease;
    &:hover { 
        transform: scale(1.05);
    }
`;

export const BadgeRemoveIcon = styled.img.attrs({ 
    src: '/icons/close-white.svg',
    width: 12
})`
`;

