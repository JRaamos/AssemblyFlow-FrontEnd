import styled from 'styled-components'

import {
    Animation
} from 'ui/styled'

export const DashboardTitle = styled.div.attrs({
})`            
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.theme.palette.colors.black};
    margin-bottom: 12px;
    ${props => props.centred ? `
            text-align: center;
        ` : ``
    }
`;

export const DashboardText = styled.div.attrs({
})`            
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
    padding: 16px 16px 0px 16px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    background: ${props => props.theme.palette.colors.white};
    border-radius: 8px;
    margin-bottom: 24px;
`;

export const ModeContainer = styled(DashboardContainer)`
    padding-bottom: 16px;
`;

export const ModeButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 14px;
    border: 1px solid ${props => props.active ? '#2563eb' : '#cbd5e1'};
    border-radius: 8px;
    background: ${props => props.active ? '#eff6ff' : '#ffffff'};
    color: #172033;
    text-align: left;
    cursor: pointer;
`;

export const ModeButtonIndicator = styled.span`
    position: relative;
    width: 42px;
    height: 24px;
    flex: 0 0 42px;
    border-radius: 999px;
    background: ${props => props.active ? '#2563eb' : '#94a3b8'};

    &::after {
        content: '';
        position: absolute;
        top: 3px;
        left: ${props => props.active ? '21px' : '3px'};
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.25);
        transition: left 140ms ease;
    }
`;

export const ModeButtonText = styled.span`
    display: grid;
    gap: 2px;
    font-size: 14px;
    font-weight: 700;
`;

export const ModeDescription = styled.span`
    color: #64748b;
    font-size: 12px;
    font-weight: 500;
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
