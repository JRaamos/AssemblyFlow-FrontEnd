import styled from 'styled-components'

export const DashboardHeaderContainer = styled.div.attrs({
})`           
    height: 80px;
    width: ${p => p.less ? `calc(100% - 60px)` : `calc(100% - 224px);`}; 
    background: ${props => props.theme.palette.colors.white};
    transition: all 0.3s;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 1px solid ${p => p.theme.palette.colors.lightshadow};
`;

export const DashboardHeaderAction = styled.div.attrs({
})`           
    color: ${props => props.theme.palette.colors.white};
    font-size: 15px;
    text-transform: uppercase;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AppLogo = styled.img.attrs({
    src: `/logo1024.png`,
    alt: "logo-icon",
    height: 50
})`            
`;

export const DashboardHeaderActionIcon = styled.img.attrs({
})`           
    margin-right: 10px;
`;

export const DashboardMenuContainer = styled.div.attrs({
})`           
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
    background: ${props => props.theme.palette.colors.shadow};
`;

export const DashboardMenu = styled.div.attrs({
    className: 'menu-contant'
})`           
    max-width: 389px;
    background: ${props => props.theme.palette.colors.white};
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

export const DashboardMenuHeader = styled.div.attrs({
})`           
    height: 60px;
    width: 100%; 
    display: flex;
    align-items: center;
    padding: 0 20px;

    text-transform: uppercase;
    font-size: 15px;
    color: ${props => props.theme.palette.colors.white};
    cursor: pointer;

    background: ${props => props.theme.palette.primary.main};
    background: linear-gradient(48deg, rgba(${props => props.theme.palette.primary.main},1) 0%, rgba(${props => props.theme.palette.primary.main},.9) 21%, rgba(${props => props.theme.palette.primary.main},.75) 49%, rgba(${props => props.theme.palette.primary.main},.6) 87%, rgba(${props => props.theme.palette.primary.main},.45) 100%);
`;

export const DashboardMenuHeaderIcon = styled.img.attrs({
})`           
    margin-right: 20px;
    cursor: pointer;
`;

export const DashboardMenuHeaderUserContent = styled.div.attrs({
})`           
    padding: 27px 25px;
    border-bottom: 1px solid ${props => props.theme.palette.colors.lightgrey};
    margin-bottom: 28px;
`;

export const DashboardMenuHeaderUserImage = styled.div.attrs({
})`           
    width: 160px;
    height: 160px; 
    background: ${props => props.theme.palette.colors.grey} url(/logo1024.png) no-repeat center center / cover;
    margin: 0 auto 12px;
    overflow: hidden;
`;

export const DashboardMenuHeaderUserText = styled.div.attrs({
})`           
    font-size: 15px;
    font-weight: bold;
    color: ${props => props.theme.palette.colors.grey};
    margin-bottom: 12px; 
`;

export const DashboardMenuOption = styled.div.attrs({
})`           
    padding: 20px 30px;
    font-size: 15px;
    color: ${props => props.theme.palette.colors.grey};
    cursor: pointer; 

    &:hover{
        text-decoration: underline;
    }
    
    ${props => props.active ? `
            background: ${props.theme.palette.primary.main};
            font-size: 15px;
            font-weight: bold;
            color: ${props.theme.palette.colors.white};
        ` : ``
    }
`;

export const DashboardMenuContent = styled.div.attrs({
})` 
    flex:1;
`;

export const DashboardMenuFooter = styled.div.attrs({
})`
    padding: 20px;
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

export const UserContent = styled.div.attrs({
})`
    height: 40px;
    border-radius: 8px;
    background: ${p => p.theme.palette.colors.backgroundgrey};
    align-items: center;
    display: flex;
    gap: 8px;
    padding: 8px;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        transition: all 0.7s;
    }
`;

export const UserName = styled.div.attrs({
})`
    font-family: Raleway;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    color: ${p => p.theme.palette.colors.black};

`;

export const UserInitial = styled.div.attrs({
})`
    font-family: Raleway;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: ${props => props.home ? props.theme.palette.tertiary.main : props.theme.palette.primary.main};    
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    color: ${p => p.theme.palette.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InfoContainer = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const PlanContainer = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    min-height: 40px;
    max-height: 40px;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 32px;
`;

export const PlanContent = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    background: ${p => p.theme.palette.colors.lightgreen};
    padding: 14px;
    cursor: pointer;
`;

export const PlanButton = styled.div.attrs({
})`
    display: flex;
    align-items: center;
    gap: 4px;
    background: ${p => p.theme.palette.colors.orange};
    padding: 14px 24px;
    cursor: pointer;
`;

export const PlanButtonText = styled.div.attrs({
})`
    font-family: Montserrat;
    font-weight: 600;
    font-size: 16px;
    color: ${p => p.theme.palette.colors.white};
`;

export const PlanInfoText = styled.div.attrs({
})`
    font-family: Montserrat;
    font-weight: 500;
    font-size: 12px;
    color: ${p => p.theme.palette.colors.black};
`;

export const InputContainer = styled.div.attrs({
})`
    width: 280px;
    padding-top: 16px;

`;



export const SelectContainer = styled.div.attrs({
})`
    width: 160px;
`;
