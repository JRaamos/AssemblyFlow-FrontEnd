import styled from 'styled-components'

export const DashboardPage = styled.div.attrs({
})`            
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const DashboardBody = styled.div.attrs({
})`       
    min-height: calc(100vh);
    max-height: calc(100vh);
    width: ${p => p.less ? `calc(100% - 60px)` : `calc(100% - 224px);`}; 
    transition: all 0.3s;
    background: ${props => props.theme.palette.background.primary};
    display: flex;
    align-items: flex-start;     
    overflow:auto;
    
`;

export const DashboardBodyContent = styled.div.attrs({
})`            
    margin: 24px;
    width: 100%;
    border-radius: 11px;
    min-height: calc(100vh - 128px);
`;

export const Content = styled.div.attrs({
})`           
    overflow:hidden;
    min-width: 1512px;

`; 