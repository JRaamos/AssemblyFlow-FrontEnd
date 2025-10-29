import styled from 'styled-components' 
import { RingLoader } from "react-spinners";
import Lottie from 'react-lottie';

export const hexToRgb = (hex) => {
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length === 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255].join(',') ;
    }
    return `255,255,255`
}  

export const Touch = styled.div.attrs({ 
})`         
    cursor: pointer;
    &:hover{
        box-shadow: 0px 1px 3px ${ props => props.theme.palette.colors.shadow };
    }
`;

export const Load = styled(RingLoader).attrs( props => ({
    color:  props.theme.palette[ props.theme.palette[props?.color] ? props?.color : "primary"]?.[props.outline ? "main" : "contrastText"],
    loading: true,
    cssOverride:{},
    size:20,
    'aria-label':"Loading Spinner"
}))`
`;
 
export const Animation = styled(Lottie).attrs( props => ({  
    options:{
        loop: true,
        autoplay: true, 
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
        animationData: props.animationData
    }, 
    width: props.width ? props.width : 320
}))`        
    max-width: 100%;
`;  

export const EmptyMessage = styled.div.attrs({ 
})`         
    padding: 32px; 
    text-align: center;
    font-size: 14px;
    color: ${ props => props.theme.palette.colors.black };
`;

export const LoadCenter = styled.div.attrs({ 
})`         
    width: 20px;
    margin: 32px auto; 
    display: flex;
    justify-content: center;
`;

export const DecoratedScroll = styled.div.attrs({ 
})`

    overflow: auto; 

    ::-webkit-scrollbar-thumb {
        background-color: ${ props => props.theme.palette.secondary.main };
        outline: 0 solid ${ props => props.theme.palette.secondary.main };
    }

    ::-webkit-scrollbar {
        width: 1px;
        height: .2rem;
    }

    ::-webkit-scrollbar-track {  
    }
`;


export const Icon = styled.img.attrs((props) => ({
    src: `/icons/${props.icon}.svg`,
}))` 
    margin: ${props => props.nomargin ? `0` : `0 2px`} ;
    z-index: 1;
    ${props => props.pointer ? `cursor: pointer;` : ``}
`;


export const Title = styled.div.attrs({
})`           

    font-size: ${props => props.small ? `20px` : `32px`};
    font-weight: 900;
    text-align: ${props => props.centred ? `center` : `left`};
    margin-bottom: ${props => props.nomargin ? `0` : `16px`};
    text-transform: ${props => props.upper ? `uppercase` : `none`};
    color: ${props => props.theme.palette.colors.black };
`;

export const ButtonContainer = styled.div.attrs({
})`
    display: flex;
    ${p => p.column ? `
        flex-direction: column;
        ${ p.start ? `align-items: flex-start;` : ``}
        ${ p.center ? `align-items: center;` : ``}
        ${ p.end ? `align-items: flex-end;` : ``}
    ` : ``};    

    justify-content: space-between;
    ${ p => p.start ? `justify-content: flex-start;` : ``}
    ${ p => p.center ? `justify-content: center;` : ``}
    ${ p => p.end ? `justify-content: flex-end;` : ``}

    width: 100%;
    ${p => p.space ? `gap: 24px` : ``}
`;

export const FormTitle = styled.div.attrs({
})`
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.005em;
    text-align: left;
    text-transform: uppercase;
    color: ${props => props.theme.palette.colors.black };
`;

export const FormText = styled.div.attrs({
})`
    font-size: 18px;
    font-weight: 300;
    text-align: left;
    color: ${props => props.theme.palette.colors.black};
    margin-bottom: 8px;
`;

export const FormSpacer = styled.div.attrs({
})`
    margin-top: 24px;
    ${props => props.large ? `margin-top: 40px;` : ``}
    ${props => props.extraLarge ? `margin-top: 80px;` : ``};
    ${props => props.border ? `
        border-top: 0.5px solid ${props.theme.palette.colors.border};
        margin-bottom: 32px;
`: ``};
`;

export const Overlay = styled.div.attrs({
})`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.palette.colors.shadow};
    z-index: 1001;
    cursor: auto;
`;

export const ModalContainer = styled.div.attrs({
})`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
`;

export const ModalContent = styled.div.attrs({
})`
    gap: 16px;
    width: 100%;
    overflow-y: auto; 
    max-height: 90vh;
    box-sizing: border-box;
    animation: slideDown 0.3s ease-out;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 640px;
    background: ${props => props.theme.palette.colors.white};
    padding: 24px 40px 40px 40px;
    border-radius: 8px;
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-100%);
        }
    }

    @media (max-width: 1000px) {
        padding: 20px;
        max-width: 100%;
        min-width: 100%;
    }

    @media (max-width: 480px) {
        padding: 15px;
        gap: 15px;
    }
`;


export const FullLoad = styled.div.attrs({
    children: <>
        <Load white />
    </>
})`
    position: fixed;
    inset: 0 0 0 0;
    z-index: 999;
    background: ${ ({theme}) => theme.palette.colors.shadow };
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const SafeImage = styled.img.attrs({
    onError: e => e.target.style.display = 'none'
})``


export const DashboardActions = styled.div.attrs({
})`
    display:flex;
    justify-content: flex-end;
    ${
        p => p.start ? `
            justify-content: flex-start;
        ` : ``
    }
`;

export const DashboardActionsItem = styled.div.attrs({
})`
`;

export const TableContentImage = styled(SafeImage).attrs({
    width: 16
})`

`;