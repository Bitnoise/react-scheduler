import { FC, useState } from "react";
import dayjs from "dayjs";
import { ConfigFormValues } from "@/types/global";
import { formFieldsIds } from "@/constants";
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
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValues((prev) => ({
      ...prev,
      startDate: value ? dayjs(value).format("YYYY-MM-DD") : undefined
    }));
  };

  return (
    <StyledWrapper onMouseLeave={() => setIsExpanded(false)} isExpanded={isExpanded}>
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
          <StyledLabel htmlFor={formFieldsIds.startDate}>Starting date </StyledLabel>
          <StyledInput
            id={formFieldsIds.startDate}
            name={formFieldsIds.startDate}
            value={inputValues.startDate ?? ""}
            type="date"
            onChange={handleDateChange}
            title="When do you want to start your scheduler? Default: today"></StyledInput>
        </StyledInnerWrapper>
        <StyledInnerWrapper>
          <StyledLabel htmlFor={formFieldsIds.maxRecordsPerPage}>Records/page: </StyledLabel>
          <StyledInput
            id={formFieldsIds.maxRecordsPerPage}
            name={formFieldsIds.maxRecordsPerPage}
            value={inputValues.maxRecordsPerPage}
            type="number"
            onChange={handleChange}
            min={1}
            title="How many records per page? Default: 10"
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
        {isExpanded ? (
          <StyledButton type="submit">Change</StyledButton>
        ) : (
          <StyledButton onClick={() => setIsExpanded(true)} type="button">
            Expand config panel
          </StyledButton>
        )}
      </StyledForm>
    </StyledWrapper>
  );
};

export default ConfigPanel;
