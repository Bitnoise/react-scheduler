import { FC, useState } from "react";
import { ConfigFormValues } from "@/types/global";
import {
  StyledButton,
  StyledCheckbox,
  StyledForm,
  StyledInnerWrapper,
  StyledInput,
  StyledLabel,
  StyledWrapper
} from "./styles";
import { ConfigPanelProps } from "./types";

const ConfigPanel: FC<ConfigPanelProps> = ({ values, onSubmit }) => {
  const [inputValues, setInputValues] = useState<ConfigFormValues>(values);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    const inputValue = type === "checkbox" ? checked : value;

    setInputValues((prev) => ({
      ...prev,
      [name]: +inputValue
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(inputValues);
  };

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInnerWrapper>
          <StyledLabel htmlFor="peopleCount">People count: </StyledLabel>
          <StyledInput
            name="peopleCount"
            type="number"
            value={inputValues.peopleCount}
            onChange={handleChange}
            min={0}
            title="How many people to display? Default: 5"
          />
        </StyledInnerWrapper>
        <StyledInnerWrapper>
          <StyledLabel htmlFor="projectsPerYear">Projects per year: </StyledLabel>
          <StyledInput
            name="projectsPerYear"
            value={inputValues.projectsPerYear}
            type="number"
            onChange={handleChange}
            min={0}
            title="Projects / year / person. Default: 5"
          />
        </StyledInnerWrapper>
        <StyledInnerWrapper>
          <StyledLabel htmlFor="yearsCovered">Years covered: </StyledLabel>
          <StyledInput
            name="yearsCovered"
            value={inputValues.yearsCovered}
            type="number"
            onChange={handleChange}
            min={0}
            title="How many years back and forward? Default: 0"
          />
        </StyledInnerWrapper>
        <StyledInnerWrapper>
          <StyledLabel htmlFor="isInFrame">Display in frame: </StyledLabel>
          <StyledCheckbox
            name="isInFrame"
            checked={inputValues.isInFrame}
            type="checkbox"
            onChange={handleChange}
            disabled
          />
        </StyledInnerWrapper>
        <StyledButton type="submit">Change</StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};

export default ConfigPanel;
