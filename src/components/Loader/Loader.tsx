import { FC } from "react";
import { LoaderProps } from "./types";
import { StyledWalker, StyledWrapper } from "./styles";

const Loader: FC<LoaderProps> = ({ isLoading, position }) => {
  return isLoading ? (
    <StyledWrapper position={position}>
      <StyledWalker />
    </StyledWrapper>
  ) : null;
};

export default Loader;
