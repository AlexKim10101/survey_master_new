import {
  IAnswer,
  IData,
  ILocation,
  ISlideMoveDirection,
  IState,
} from "../../types";
import {
  SET_NEW_DATA,
  SET_NEW_STATE,
  CHANGE_CURRENT_LOCATION,
  SET_USER_ANSWER,
  SET_SURVEY_UID,
  IS_LOADING,
  IS_ERROR,
  TOGGLE_MODAL_VISIBLE,
} from "./types";

export const setNewState = (payload: IState) =>
  <const>{
    type: SET_NEW_STATE,
    payload,
  };

export const setNewData = (payload: IData) =>
  <const>{
    type: SET_NEW_DATA,
    payload,
  };

export const setLoading = (payload: boolean) =>
  <const>{
    type: IS_LOADING,
    payload,
  };

export const setError = (payload: { status: boolean; message: string }) =>
  <const>{
    type: IS_ERROR,
    payload,
  };

export const setSurveyUid = (payload: string) =>
  <const>{
    type: SET_SURVEY_UID,
    payload,
  };

export const changeCurretLocation = (payload: {
  location: ILocation;
  slideMoveDirection: ISlideMoveDirection;
}) =>
  <const>{
    type: CHANGE_CURRENT_LOCATION,
    payload,
  };

export const setAnswer = (payload: IAnswer) =>
  <const>{
    type: SET_USER_ANSWER,
    payload,
  };

export const toggleModalVoisible = (payload: boolean) =>
  <const>{
    type: TOGGLE_MODAL_VISIBLE,
    payload,
  };
