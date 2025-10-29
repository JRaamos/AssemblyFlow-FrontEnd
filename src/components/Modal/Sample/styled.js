import styled from "styled-components";

export const CompanyButtonContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    gap: 16px;
    border-top: 1px solid ${props => props.theme.palette.colors.border};
    padding-top: 24px;
`;

export const CloseContainer = styled.div.attrs({
})`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;