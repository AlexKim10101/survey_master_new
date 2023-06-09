import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../types";
import { Dispatch } from "redux";
import { css } from "@emotion/react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Progress } from "antd";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import {
  DEFAULT_STROKE_COLOR,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_TRAIL_COLOR,
} from "../../consts/const";
import { changeCurretLocation } from "../../services/redux/actions";

type ISurvey = ConnectedProps<typeof connector>;

const pageCss = css`
  @media (max-width: 576px) {
    padding-right: 0%;
    padding-left: 0%;
  }
`;

export const accordionCss = css`
  width: 100%;
  & .MuiAccordionSummary-content {
    align-items: center;
    gap: 20px;
  }

  & .MuiAccordionDetails-root {
    display: flex;
    justify-content: space-between;
  }
`;

const Survey: React.FC<ISurvey> = ({ selectPage, pages, userAnswers }) => {
  return (
    <div css={pageCss}>
      <div>
        {pages.map((page, index) => {
          const allQuestionCount = page.questions.filter(
            (q) => q.config.dataType !== "textblock"
          ).length;
          const requiredQuestionsCount = page.questions.filter(
            (q) => q.config.dataType !== "textblock"
          ).length;
          let doneQuestionCount = 0;
          page.questions.forEach((q) => {
            userAnswers.hasOwnProperty(q.docID) &&
              userAnswers[q.docID].values.length !== 0 &&
              doneQuestionCount++;
          });

          return (
            <Accordion
              key={index}
              // defaultExpanded={true}
              disabled={false}
              css={accordionCss}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={String(page.docID)}
                id={String(page.docID)}
              >
                <Progress
                  type="circle"
                  size={50}
                  strokeColor={DEFAULT_STROKE_COLOR}
                  trailColor={DEFAULT_TRAIL_COLOR}
                  percent={Math.floor(
                    (doneQuestionCount / allQuestionCount) * 100
                  )}
                />

                <Typography>страница {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <div className="questionSize">
                    <div className="question">Всего вопросов: </div>
                    <div className="questionNumber">{allQuestionCount}</div>
                  </div>
                  <div className="questionSize">
                    <div className="question">Обязательных вопросов: </div>
                    <div className="questionNumber">
                      {requiredQuestionsCount}
                    </div>
                  </div>
                </div>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    selectPage(index);
                  }}
                >
                  Перейти
                </Button>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const pages = state.data ? state.data.pages : [];
  const userAnswers = state.userAnswers;
  return {
    pages,
    userAnswers,
  };
};

const mapDispathToProps = (dispatch: Dispatch) => {
  return {
    selectPage: (index: number) => {
      dispatch(
        changeCurretLocation({
          location: {
            pageIndex: index,
            pathName: "section",
            questionIndex: 0,
            title: "section",
          },
          slideMoveDirection: "right-to-left",
        })
      );
    },
  };
};

const connector = connect(mapStateToProps, mapDispathToProps);

export default connector(Survey);
