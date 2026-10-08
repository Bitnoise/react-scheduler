import { FC } from "react";
import {
  StyledImage,
  StyledImageWrapper,
  StyledInitials,
  StyledInnerWrapper,
  StyledText,
  StyledTextWrapper,
  StyledWrapper
} from "./styles";
import { LeftColumnItemProps } from "./types";

const avatarHues = [206, 162, 262, 24, 338, 190, 44, 120];

// initials of the first two words, e.g. "Jane Doe" -> "JD"
const getInitials = (title: string): string =>
  title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

// a stable hue per name so each person keeps the same avatar colour
const getAvatarHue = (title: string): number => {
  let hash = 0;
  for (const char of title) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return avatarHues[Math.abs(hash) % avatarHues.length];
};

const LeftColumnItem: FC<LeftColumnItemProps> = ({ id, item, rows, onItemClick }) => {
  return (
    <StyledWrapper
      title={item.subtitle ? item.title + " | " + item.subtitle : item.title}
      $clickable={typeof onItemClick === "function"}
      $rows={rows}
      onClick={() => onItemClick?.({ id, label: item })}
    >
      <StyledInnerWrapper>
        <StyledImageWrapper>
          {item.icon ? (
            <StyledImage src={item.icon} alt="Icon"></StyledImage>
          ) : (
            <StyledInitials $hue={getAvatarHue(item.title)} aria-hidden="true">
              {getInitials(item.title)}
            </StyledInitials>
          )}
        </StyledImageWrapper>
        <StyledTextWrapper>
          <StyledText $isMain>{item.title}</StyledText>
          {item.subtitle && <StyledText>{item.subtitle}</StyledText>}
        </StyledTextWrapper>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

export default LeftColumnItem;
