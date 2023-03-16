import {createAction} from "../../utils/reducer/recuder.util";
import {USER_ACTION_Types} from './user-types';

export const setCurrentUser = (user) => {
    return createAction(USER_ACTION_Types.SET_CURRENT_USER, user);
};

export const checkUserSession = () => createAction(USER_ACTION_Types.CHECK_USER_SESSION);

export const googleSignInStartPop = () => createAction(USER_ACTION_Types.GOOGLE_SIGN_IN_POP_START);

export const googleSignInStartredi = () => createAction(USER_ACTION_Types.GOOGLE_SIGN_IN_REDI_START);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_Types.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (user) => createAction(USER_ACTION_Types.SIGN_IN_SUCCESS, user);
export const signInFailed = (error) => createAction(USER_ACTION_Types.SIGN_IN_FAILed, error);

export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_Types.SIGN_UP_START, {email, password, displayName});
export const signUpSuccess = (user, additionalDetails) => createAction(USER_ACTION_Types.SIGN_IN_SUCCESS, {user, additionalDetails});
export const signUpFailed = (error) => createAction(USER_ACTION_Types.SIGN_UP_FAILED, error)


export const signOutStart = () => createAction(USER_ACTION_Types.SIGN_OUT_START);
export const signOutSuccess = () => createAction(USER_ACTION_Types.SIGN_OUT_SUCCESS);
export const signOutFailed = (error) => createAction(USER_ACTION_Types.SIGN_OUT_FAILED, error);


