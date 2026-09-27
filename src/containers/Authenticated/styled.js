import styled from 'styled-components'

export const DashboardPage = styled.div.attrs({
})`            
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 0;
`;

export const DashboardBody = styled.main.attrs({
    'data-layout': 'workspace',
})`       
    min-height: calc(100vh);
    max-height: calc(100vh);
    width: ${p => p.less ? `calc(100% - 60px)` : `calc(100% - 224px)`};
    transition: all 0.3s;
    background: ${props => props.theme.palette.background.primary};
    display: flex;
    align-items: flex-start;     
    overflow:auto;

    @media (max-width: 900px) {
        width: 100%;
        min-height: 100svh;
        max-height: 100svh;
        padding-top: 58px;
    }
    
`;

export const DashboardBodyContent = styled.div.attrs({
})`            
    margin: 24px;
    width: calc(100% - 48px);
    min-width: 0;
    border-radius: 11px;
    min-height: calc(100vh - 128px);

    @media (max-width: 900px) {
        margin: 18px;
        width: calc(100% - 36px);
        min-height: calc(100svh - 94px);
    }

    @media (max-width: 640px) {
        margin: 12px;
        width: calc(100% - 24px);
        min-height: calc(100svh - 82px);
        padding-bottom: 120px;
    }
`;

export const Content = styled.div.attrs({
})`           
    min-width: 0;
    width: 100%;

`;

export const MobileTopBar = styled.header`
    display: none;

    @media (max-width: 900px) {
        position: fixed;
        z-index: 90;
        top: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        gap: 12px;
        height: 58px;
        padding: 0 16px;
        border-bottom: 1px solid #e2e8f0;
        background: rgba(255, 255, 255, 0.96);
        box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
        backdrop-filter: blur(12px);
    }
`;

export const MobileMenuButton = styled.button`
    display: grid;
    place-content: center;
    gap: 4px;
    width: 42px;
    height: 42px;
    padding: 0;
    border: 1px solid #cbd5e1;
    border-radius: 9px;
    background: #ffffff;
    cursor: pointer;

    span {
        width: 18px;
        height: 2px;
        border-radius: 999px;
        background: #173c75;
    }
`;

export const MobileBrand = styled.strong`
    color: #172033;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    letter-spacing: -0.015em;
`;
