import { FC } from "react";
import { useTheme } from "styled-components";
import Icon from "../Icon";
import { ToggleProps } from "./types";
import { ToggleContainer, ToggleCircle, IconContainer } from "./styles";

const Toggle: FC<ToggleProps> = ({ toggleTheme }) => {
  const theme = useTheme();

  return (
    <ToggleContainer onClick={toggleTheme}>
      <ToggleCircle />
      <IconContainer>
        {theme.mode === "light" ? (
          <Icon iconName="sun" height="16" width="16" />
        ) : (
          <Icon iconName="moon" height="16" width="16" />
        )}
      </IconContainer>
    </ToggleContainer>
  );
};

export default Toggle;
