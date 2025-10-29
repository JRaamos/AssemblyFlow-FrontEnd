import Button from "components/Form/Button";
import styled from "styled-components";

export const Content = styled.div.attrs({
})`
  display: flex;
  gap: 8px;
`;

export const ButtonSelected = styled(Button).attrs({
  noIcon: true,
  gradient: true,
  small: true,
})`
`;

export const ButtonDefault = styled(Button).attrs({
  outlineGradient: true,
  noIcon: true,
  white: true,
})`
`;

export const PaginationContainer = styled.div.attrs({
})`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  max-width: calc(100vw - 368px);
  padding: 16px 0;
  gap: 16px

`;

export const PaginationQuantity = styled.div.attrs({})`

  font-size: 14px;
  font-weight: 600;
  line-height: 21.28px;
  text-align: center;
`;