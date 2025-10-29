import styled from 'styled-components'  

export const Content = styled.div.attrs({ 
})`
`;

export const FormWrapper = styled.div.attrs({ 
})`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 24px 0;
    @media(max-width:767px){
        flex-direction: column;
    }
`;

export const FormInput = styled.div.attrs({ 
})`
    width: 100%;
    max-width: calc(calc(100% - 24px) / 3);
    ${
        props => props.full ? `
            max-width: 100%;
        ` : ``
    }
    ${
        props => props.half ? `
            max-width: calc(calc(100% - 12px) / 2);
        ` : ``
    }
    ${
        props => props.quarter ? `
            max-width: calc(calc(100% - 36px) / 4);
        ` : ``
    }
    
    ${
        props => props.twenty ? `
            max-width: calc(calc(100% - 48px) / 5);
        ` : ``
    }

    @media(max-width:991px){
        max-width: calc(calc(100% - 12px) / 2);
    }
    @media(max-width:767px){
        max-width: 100%;
    }
`;

export const FormSeparator = styled.div.attrs({ 
})`
    margin: 12px 0;
    width: 100%;
    border-bottom: 1px solid ${ props => props.theme.palette.colors.shadow };
`;

export const ContentForm = styled.div.attrs({ 
})`
    position: relative;
    ${
        p => p.active ? `
            padding: 12px;
            border: 1px solid ${ p.theme.palette.colors.shadow };
            border-radius: 8px;
        ` : ``
    }
`;

export const ContentFormHeader = styled.div.attrs({ 
})`
    ${
        p => p.active ? `
            font-size: 16px;
            color: ${ p.theme.palette.colors.grey };
            padding: 8px 0 14px 8px;
            border-bottom: 1px solid ${ p.theme.palette.colors.shadow };
        ` : ``
    }
`;


export const UploadContent = styled.div.attrs({ 
})`
    border: 1px solid  ${ p => p.theme.palette.colors.shadow };
    border-style: dashed;
    height: 56px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${
        p => p.image ? `
            background: url(${p?.image}) no-repeat center center / contain;
        ` : ``
    }
    cursor: pointer;
`;


export const InputRequired = styled.b.attrs({ 
})`
    font-size: 14px;
    color: ${ p => p.theme.palette.colors.lightgrey };
`;


export const AutofillButton = styled.div.attrs({
})`
    padding: 0px;
    position: absolute;
    top: 0;
    right: 0;
    
    border: 2px solid ${ p => p.theme.palette.colors.shadow };
    border-top-left-radius: 60px;
    border-bottom-right-radius: 60px;

    cursor: pointer;
    &:hover{
        transition: all .3s ease;
        transform: scale(1.05);
    }
`;

export const AutofillButtonIcon = styled.img.attrs({
    src:'/icons/circle.svg'
})`
    width: 18px;
    margin: 0 18px;
    margin: -3px -6px;
`;
