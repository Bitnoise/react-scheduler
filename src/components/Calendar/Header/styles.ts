import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: ${({ theme }) => theme.navHeight};
`;

export const StyledHeaderRow = styled.div`
  display: flex;
  width: fit-content;
`;
