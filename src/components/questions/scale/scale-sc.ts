import { css } from "@emotion/react";
import { IViewType } from "./scale";

export const rootCss = css`
  & .MuiFormLabel-root {
    color: #000000;
    font-size: 1.3rem;
    font-weight: 300;
  }
`;

export const optionsCss = (horizontal: boolean, viewType: IViewType) => {
  const gap = viewType === "table" ? 4 : 0;
  return css`
    display: flex;
    flex-direction: ${horizontal ? "row" : "column"};
    gap: ${gap}px;
    flex-wrap: wrap;
  `;
};

export const optionCss = (
  selected: boolean,
  viewType: IViewType,
  highlightColor: string
) => {
  let color = "transparent";
  let backgroundColor = "transparent";
  let borderWidth = 0;
  let justifyContent = "center";
  let boxShadow = "none";
  let flex = "0 1 auto";

  if (viewType === "table") {
    color = selected ? "#fff" : "inherit";
    backgroundColor = selected ? "#46acaf" : "transparent";
    borderWidth = 1;
    flex = "1 1 0%";
  } else if (viewType === "color") {
    color = "inherit";
    backgroundColor = highlightColor;
    boxShadow = selected
      ? "#46acaf 0px 0px 0px 0.5em inset"
      : "#46acaf 0px 0px 0px 0em inset";
    flex = "1 1 0%";
  } else if (viewType === "stars") {
    color = selected ? "gold" : "#46acaf";
    justifyContent = "flex-start";
  } else if (viewType === "smiles") {
    color = selected ? "#fff" : highlightColor;
    backgroundColor = selected ? "#46acaf" : "transparent";
  } else if (viewType === "smiles-monochrome") {
    color = selected ? "#fff" : "#46acaf";
    backgroundColor = selected ? "#46acaf" : "transparent";
  }

  return css`
    border: ${borderWidth}px solid #ccc;
    padding: 1em;
    flex: ${flex};
    display: flex;
    align-items: center;
    justify-content: ${justifyContent};
    background-color: ${backgroundColor};
    color: ${color};
    user-select: none;
    box-shadow: ${boxShadow};
    transition: 0.2s;
    & > svg {
      fill: currentColor;
    }
  `;
};
