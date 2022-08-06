import produce from 'immer';

export const initialState = {
    logInLoading: false, // 로그인 시도 중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도 중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 로그인 시도 중
    signUpDone: false,
    signUpError: null,

    user: null,
    signUpdata: {},
    loginData: {},
}

const dummyUser = (data) => ({
    ...data,
    nickname: 'PKB',
    id: 1,
    Posts: [{ id: 1 }],
});


export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}

export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
}

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null; //로딩할 때 에러는 없애줌
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.user = dummyUser(action.data);
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutError = null;
                draft.logOutDone = false;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.user = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpError = null;
                draft.signUpDone = false;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                draft.user = null;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
            case ADD_POST_TO_ME:
                draft.user.Posts.unshift({ id: action.data });
                break;
            // return {
            //     ...state,
            //     user: {
            //         ...state.user,
            //         Posts: [{ id: action.data }, ...state.user.Posts],
            //     }
            // };
            case REMOVE_POST_OF_ME:
                draft.user.Posts = draft.user.Posts.filter((v) => v.id = action.data);
                break;
            // return {
            //     ...state,
            //     user: {
            //         ...state.user,
            //         Posts: state.user.Posts.filter((v) => v.id = action.data),
            //     },
            // };
            default:
                break;
        };
    });
};

export default reducer;