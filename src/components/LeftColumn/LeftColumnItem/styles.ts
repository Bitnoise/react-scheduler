import styled, { IStyledComponent } from "styled-components";
import { boxHeight, mobileMediaQuery } from "@/constants";
import { StyledLeftColumnItemWrapperProps, StyledTextProps } from "./types";

export const StyledWrapper: IStyledComponent<any, any> =
  styled.div<StyledLeftColumnItemWrapperProps>`
    display: flex;
    align-items: ${({ $rows }) => ($rows > 1 ? "start" : "center")};
    padding: 0.625rem 0.5rem 0.625rem 0.75rem;
    width: 100%;
    min-height: ${boxHeight}px;
    height: calc(${boxHeight}px * ${({ $rows }) => $rows});
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    transition: background-color 0.2s ease;
    cursor: ${({ $clickable }) => ($clickable ? "pointer" : "auto")};
    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }

    @media ${mobileMediaQuery} {
      padding-left: 0.5rem;
      padding-right: 0.25rem;
    }
  `;

export const StyledInnerWrapper: IStyledComponent<any, any> = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  min-width: 0;
  width: 100%;
`;

export const StyledImageWrapper: IStyledComponent<any, any> = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  @media ${mobileMediaQuery} {
    display: none;
  }
`;
export const StyledImage: IStyledComponent<any, any> = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;
export const StyledInitials: IStyledComponent<any, any> = styled.span<{ $hue: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  background-color: ${({ $hue, theme }) =>
    theme.mode === "dark" ? `hsl(${$hue} 45% 28%)` : `hsl(${$hue} 70% 92%)`};
  color: ${({ $hue, theme }) =>
    theme.mode === "dark" ? `hsl(${$hue} 70% 85%)` : `hsl(${$hue} 55% 32%)`};
`;
export const StyledTextWrapper: IStyledComponent<any, any> = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 0;
  gap: 2px;
`;
export const StyledText: IStyledComponent<any, any> = styled.p<StyledTextProps>`
  margin: 0;
  padding: 0;
  font-size: ${({ $isMain }) => ($isMain ? "0.875rem" : "0.75rem")};
  font-weight: ${({ $isMain }) => ($isMain ? 500 : 400)};
  line-height: ${({ $isMain }) => ($isMain ? "1.25rem" : "1rem")};
  color: ${({ $isMain, theme }) => ($isMain ? theme.colors.textPrimary : theme.colors.placeholder)};
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
`;
