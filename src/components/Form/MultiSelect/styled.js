import styled from 'styled-components'  

import {
    Animation,
    SafeImage
} from 'ui/styled'

export const DashboardTitle = styled.div.attrs({ 
})`            
    font-size: 22px;
    font-weight: bold;
    color: ${ props => props.theme.palette.colors.black };
    margin-bottom: 12px;
    ${
        props => props.centred ? `
            text-align: center;
        ` : ``
    }
`;

export const DashboardText = styled.div.attrs({ 
})`            
    font-size: 16px;
    line-height: 26px;
    color: ${ props => props.theme.palette.colors.black };
    ${
        props => props.centred ? `
            text-align: center;
        ` : ``
    }
`;

export const DashboardAnimation = styled(Animation).attrs({ 
    width: '100%',
    height: 420
})`             
`;



export const TitleContent = styled.div.attrs({ 
})`
    display: flex;
    align-items: center;
    gap: 12px;
`;
export const TitleContentTitle = styled.div.attrs({ 
})`
    flex:1;
    font-size: 28px;
    font-weight: 600;
`;
export const TitleContentAction = styled.div.attrs({ 
})`
    display: flex;
    align-items: center;
    gap: 12px;
`;





export const DashboardStatusContainer = styled.div.attrs({ 
})`
    display: flex;
    padding: 16px 0 24px; 
    align-items: center;
    gap: 18px;

    flex-wrap: wrap;
`;

export const DashboardStatus = styled.div.attrs({ 
})`
    display: flex;
    padding: 12px;
    background: ${ props => props.theme.palette.colors.white };
    border-radius: 16px;
    align-items: center;
    gap: 8px;
`;

export const DashboardStatusIcon = styled.img.attrs({ 
})`
`;

export const DashboardStatusContent = styled.div.attrs({ 
})`
    flex: 1;
`;

export const DashboardStatusContentTitle = styled.div.attrs({ 
})`
    font-size: 20px;
    font-weight: 600;
    color: ${ props => props.theme.palette.colors.black };
`;

export const DashboardStatusContentText = styled.div.attrs({ 
})`
    font-size: 14px;
    color: ${ props => props.theme.palette.colors.black };
`;

export const DashboardStatusContentTotalizer = styled.div.attrs({ 
})`
    display: flex;
    padding: 12px 18px;
    background: ${ props => props.theme.palette.colors.whitegrey };

    align-items: center;
    gap: 12px;
    border-radius: 8px;
    margin-left: 8px;
`;

export const DashboardStatusContentTotalizerTitle = styled.div.attrs({ 
})`
    padding: 8px 12px;
    background: ${ props => props.theme.palette.colors.green };
    color: ${ props => props.theme.palette.colors.white };
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
`;

export const DashboardStatusContentTotalizerText = styled.div.attrs({ 
})`
`;





export const DashboardTableContainer = styled.div.attrs({ 
})`
    background: ${ props => props.theme.palette.colors.white };
    padding: 16px;
`;

export const DashboardTableContainerHeader = styled.div.attrs({ 
})`
    display: flex;
    align-items: center; 
    padding: 0 0 18px;
    border-bottom: .5px solid ${ p => p.theme.palette.colors.lightshadow };
    margin: 0 0 18px;
`;

export const DashboardTableTitle = styled.div.attrs({ 
})`
    flex:1;
    font-size: 28px;
    font-weight: 600;
    color: ${ props => props.theme.palette.colors.black };
`;

export const DashboardTableContainerHeaderAction = styled.div.attrs({ 
})`
`;


export const TableImagesRow = styled.div.attrs({ 
})`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

export const TableImage = styled(SafeImage).attrs({ 
    width: 40,
    height: 40,
})`
    object-fit: cover;
    border-radius: 8px;
`;

export const DashboardFormSpace = styled.div.attrs({ 
})`
    margin-top: 12px;
    ${
        p => p.bigger ? `
            margin-top: 24px;
        ` : ``
    }
`;





export const DashboardResearch = styled.div.attrs({ 
})`
`;

export const Question = styled.div.attrs({ 
})`
    padding: 16px 2px 4px;
`;

export const Answer = styled.div.attrs({ 
})`
    padding: 16px 8px;
    background: ${ props => props.theme.palette.colors.oddgrey };
`;


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

