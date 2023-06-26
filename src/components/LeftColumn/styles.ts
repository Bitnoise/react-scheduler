import styled from "styled-components";
import { leftColumnWidth } from "@/constants";

export const StyledWrapper = styled.div`
  min-width: ${leftColumnWidth + "px"};
  max-width: ${leftColumnWidth + "px"};
  padding-top: 125px;
  position: sticky;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 15px rgba(39, 55, 75, 0.16);
  z-index: 2;
`;
