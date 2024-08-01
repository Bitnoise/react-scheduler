import styled from "styled-components";

export const StyledWrapper = styled.div`
  height: 440px;
  width: 514px;
  position: relative;
`;

export const StyledText = styled.p`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  letter-spacing: 1px;
  line-height: 1px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
