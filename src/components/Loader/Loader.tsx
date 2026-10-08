import { FC } from "react";
import { LoaderProps } from "./types";
import { StyledProgressBar, StyledWrapper } from "./styles";

const Loader: FC<LoaderProps> = ({ isLoading, position }) => {
  return isLoading ? (
    <StyledWrapper $position={position} role="progressbar" aria-busy="true">
      <StyledProgressBar />
    </StyledWrapper>
  ) : null;
};

export default Loader;
