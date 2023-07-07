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

  const formFieldsIds = {
    peopleCount: "peopleCount",
    projectsPerYear: "projectsPerYear",
    yearsCovered: "yearsCovered",
    isFullscreen: "isFullscreen"
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(inputValues);
  };

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInnerWrapper>
          <StyledLabel htmlFor={formFieldsIds.peopleCount}>People count: </StyledLabel>
          <StyledInput
            id={formFieldsIds.peopleCount}
            name={formFieldsIds.peopleCount}
            type="number"
            value={inputValues.peopleCount}
            onChange={handleChange}
            min={0}
            title="How many people to display? Default: 5"
          />
        </StyledInnerWrapper>
        <StyledInnerWrapper>
          <StyledLabel htmlFor={formFieldsIds.projectsPerYear}>Projects per year: </StyledLabel>
          <StyledInput
            id={formFieldsIds.projectsPerYear}
            name={formFieldsIds.projectsPerYear}
            value={inputValues.projectsPerYear}
            type="number"
            onChange={handleChange}
            min={0}
            title="Projects / year / person. Default: 5"
          />
        </StyledInnerWrapper>
        <StyledInnerWrapper>
          <StyledLabel htmlFor={formFieldsIds.yearsCovered}>Years covered: </StyledLabel>
          <StyledInput
            id={formFieldsIds.yearsCovered}
            name={formFieldsIds.yearsCovered}
            value={inputValues.yearsCovered}
            type="number"
            onChange={handleChange}
            min={0}
            title="How many years back and forward? Default: 0"
          />
        </StyledInnerWrapper>
        <StyledInnerWrapper>
          <StyledLabel htmlFor={formFieldsIds.isFullscreen}>Fullscreen: </StyledLabel>
          <StyledCheckbox
            id={formFieldsIds.isFullscreen}
            name={formFieldsIds.isFullscreen}
            checked={inputValues.isFullscreen}
            type="checkbox"
            onChange={handleChange}
          />
        </StyledInnerWrapper>
        <StyledButton type="submit">Change</StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};

export default ConfigPanel;
