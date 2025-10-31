import styled from 'styled-components'

import {
    Animation
} from 'ui/styled'

export const DashboardTitle = styled.div.attrs({
})`            
    font-size: 24px;
    font-weight: bold;
    font-family: Kumbh Sans;
    color: ${props => props.theme.palette.colors.black};
    margin-bottom: 12px;
    ${props => props.centred ? `
            text-align: center;
        ` : ``
    }
`;

export const DashboardText = styled.div.attrs({
})`            
    font-family: Kumbh Sans;
    font-size: 16px;
    line-height: 26px;
    color: ${props => props.theme.palette.colors.black};
    ${props => props.centred ? `
            text-align: center;
        ` : ``
    }
`;

export const DashboardAnimation = styled(Animation).attrs({
    width: '100%',
    height: 420
})`             
`;

export const DashboardContainer = styled.div.attrs({
})`            
    padding: 16px 24px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    background: ${props => props.theme.palette.colors.white};
    border-radius: 8px;
    margin-bottom: 24px;
`;

export const DashboardContent = styled.div.attrs({
})`            
    padding: 8px 24px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    background: ${props => props.theme.palette.colors.white};
    position: fixed;
    bottom: 0;
    right: 0;
    left: 225px;
`;
