import styled from 'styled-components'
import { Icon } from 'ui/styled';


export const DashboardMenuContainer = styled.div.attrs({
})`           
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: ${props => props.theme.palette.colors.shadow};
`;

export const DashboardMenu = styled.div.attrs({
    className: 'menu-contant'
})`           
    width: ${p => p.less ? '60px' : '224px'};
    padding: ${p => p.less ? '8px' : '16px'};
    background: ${props => props.theme.palette.colors.white};
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
    /* Scrollbar styling */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: ${props => props.theme.palette.colors.white};
    }

    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.palette.colors.shadow};
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.palette.primary.main};
    }
`;

export const DashboardMenuHeader = styled.div.attrs({
})`           
    width: 100%;
    display: flex;
    gap: 18px;
    justify-content: center;
    margin: 8px 0px 20px 0px;
    align-items: center;
    ${p => p.less ? `
            flex-direction: column;
        ` : ``};
`;

export const LogoIcon = styled(Icon).attrs({
})`   
    width: 190px;
`;


export const DashboardMenuOption = styled.div.attrs({
})`           
    padding: 11px 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer; 
    width: 100%;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    
    ${props => props.active ? `
            background: ${props.theme.palette.lightBlue.main};
                    ` : ``
    }
`;
export const DashboardMenuBorder = styled.div.attrs({
})`           
    border-top: .5px solid ${p => p.theme.palette.colors.shadow};
`;


export const OptionText = styled.div.attrs({
})` 
    font-family: Montserrat;
    font-weight: 500;
    font-size: 15px;
    color: ${p => p.active ? p.theme.palette.colors.white : p.theme.palette.colors.black};
    cursor: pointer;
`;

export const DashboardMenuContent = styled.div.attrs({
})` 
    flex:1;
    margin-top: 20px;
    gap: 8px;
    display: flex;
    flex-direction: column;
`;

export const DashboardMenuFooter = styled.div.attrs({
})`
    gap: 8px;
    display: flex;
    flex-direction: column;
`;

export const DashboardVersionContent = styled.div.attrs({
})` 
    margin: 24px 0;
`;

export const DashboardVersionText = styled.div.attrs({
})`
    font-size: 15px;
    font-weight: bold;
    color: ${props => props.theme.palette.colors.grey};
    text-align: center; 
`;
