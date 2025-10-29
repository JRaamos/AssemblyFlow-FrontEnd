import styled from 'styled-components'

export const SideBackgroundImageContainer = styled.div.attrs({
})`          
    background: ${props => props.theme.palette.colors.white}; 
    min-height:100vh;
    height: 100%;
    position: fixed;
    width: 58%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media(max-width: 767px){ 
        position: relative;
        min-height:initial; 
        width: 100%;
    }
`;
export const SideBackgroundImage = styled.div.attrs({
})`          
    background: url(${p => p.url ? p.url : '/images/login.png'}) center center / cover no-repeat black;
    width: 100%;
    margin-left: 40px;
    height: calc(100% - 80px);
    border-radius: 80px;
`;

export const SideBackgroundImageDegree = styled.div.attrs({
})`          
    min-height:100vh; 
    background: -moz-linear-gradient(0deg, ${props => props.theme.palette.primary.main} 17%, ${props => props.theme.palette.colors.shadow} 60%);
    background: -webkit-linear-gradient(0deg, ${props => props.theme.palette.primary.main} 17%, ${props => props.theme.palette.colors.shadow} 60%);
    background: linear-gradient(0deg, ${props => props.theme.palette.primary.main} 17%, ${props => props.theme.palette.colors.shadow} 60%);

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:  flex-end;

    @media(max-width: 767px){  
        position: relative;
        min-height:initial; 
        padding-top: 20px;
        z-index: 2;
        min-height: 120px;  
    }
`;
export const FormContent = styled.div.attrs({
})`           
    min-height:100vh;
    padding: 70px 5vw;
`;
export const AppLogo = styled.img.attrs({
    src: '/logo1024.png',
    width: 120
})`           
`;

export const Content = styled.div.attrs({
})`           
    overflow:hidden;
`;

export const Touch = styled.div.attrs({
})`           
    cursor: pointer;
`; 