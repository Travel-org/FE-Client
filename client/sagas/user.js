import axios from 'axios';
import { all, fork, takeLatest, delay, put} from 'redux-saga/effects';

function logInAPI(data) {
    return axios.post('/api/login', data);
};

function* logIn(action) {
    try {
          // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: action.data, 
        });
    }
    catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        });
    }
}   
function logOutAPI(data) {
    return axios.post('/api/logout', data)
};

function* logOut(action) {
    try {
        // const result = yield call(logOutAPI, action.data); 나중에 delay지우고 실제 서버 요청하는거로 바꿈
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: action.data 
        });
    }
    catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        });
    }
}   

function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}