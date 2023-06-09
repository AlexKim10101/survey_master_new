import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { setAnswer } from "../../../services/redux/actions";
import { IAnswer, IOption, IQuestion, IState } from "../../../types";
import { selectQuestionCss } from "../sc";
import {
  Box,
  Chip,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import { css } from "@emotion/react";
import { DEFAULT_HINT_VALUE, PRIMARY_COLOR } from "../../../consts/const";

type IMultiDropDownViewProps = {
  currentQuestionIndex: number;
  question: IQuestion;
  setAnswer: (answer: IAnswer) => void;
  userAnswer: IAnswer;
};

export const formControlCss = css`
  width: 100%;
`;

export const chipWrapperCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  padding-left: 0.5em;
`;
export const chipCss = (isDefault: boolean) => css`
  color: ${isDefault ? "#555" : "inherit"};
  background-color: ${isDefault ? "transparent" : "#e5e5e5"};
  padding: 0.5em;
  border-radius: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40%;
`;

export const selectCss = css`
  & .MuiSelect-selectMenu {
    min-height: 2em;
  }
`;

export const iconCss = (selected: boolean) => css`
  &.MuiSvgIcon-root {
    margin-right: 5px;
    fill: ${PRIMARY_COLOR};
    ${!selected && "visibility:hidden"}
  }
`;

export const menuItemCss = css`
  &.MuiListItem-root.Mui-selected {
    background-color: transparent;
  }
  &.MuiMenuItem-root {
    white-space: wrap;
  }
`;

const MultiDropDownView: React.FC<IMultiDropDownViewProps> = ({
  question,
  setAnswer,
  userAnswer,
}) => {
  const { docID, hint, config } = question;
  const options = config.options!;
  const optionsDict = options.reduce(
    (res, option) => ({ ...res, [`${option.docID}`]: option }),
    {
      default: {
        docID: 0,
        height: 0,
        order: 0,
        photoID: 0,
        title: hint ? hint : DEFAULT_HINT_VALUE,
        width: 0,
      },
    }
  ) as { [key: string]: IOption };

  const userAnswerExist = userAnswer && userAnswer.values.length > 0;
  const value = userAnswerExist
    ? (userAnswer as IAnswer).values.map((item) => item.optionID)
    : ["default"];

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const optionIDs = e.target.value as string[];
    const newValue = optionIDs
      .filter((optionID) => optionID !== "default")
      .map((optionID) => ({
        optionID: Number(optionID),
        value: String(optionsDict[optionID].title),
      }));

    setAnswer({
      questionID: docID,
      values: newValue,
    });
  };

  return (
    <FormControl variant="standard" css={formControlCss}>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        disableUnderline
        renderValue={(items) => {
          const ids = items as string[];
          const options = ids.map((id: string) => optionsDict[id]);
          if (ids.length === 1 && ids[0] === "default")
            return (
              <div key={docID} css={chipCss(true)}>
                {options[0].title}
              </div>
            );
          return (
            <div css={chipWrapperCss}>
              {options.map(({ docID, title }) => (
                <div key={docID} css={chipCss(false)}>
                  {title}
                </div>
              ))}
            </div>
          );
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          getContentAnchorEl: null,
        }}
        css={selectCss}
      >
        {options.map((item) => (
          <MenuItem key={item.docID} value={item.docID} css={menuItemCss}>
            <CheckIcon
              css={iconCss((value as number[]).includes(item.docID))}
            />
            <span>{item.title}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiDropDownView;
