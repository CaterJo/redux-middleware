import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import { takeEvery, getContext } from 'redux-saga/effects';
import {
  reducerUtils,
  handleAsyncActions,
  handleAsyncActionsById,
  createPromiseSaga,
  createPromiseSagaById
} from '../lib/asyncUtils';

/* 액션 타입 */

// 포스트 다건조회
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 단건 조회
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';
const GO_TO_HOME = 'GO_TO_HOME';


export const getPosts = () => ({ type: GET_POSTS });
// payload는 파라미터 용도
// meta는 리듀서에서 id를 알기위한 용도
export const getPost = id => ({ type: GET_POST, payload: id, meta: id });

// 사가 생성
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);
const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const goToHomeSaga = function* () {
  const history = yield getContext('history');
  history.push('/');
}

// 사가 등록
export function* postsSaga() {
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
}


// 3번째 인자를 사용하면 withExtraArgument 에서 넣어준 값들을 사용 할 수 있습니다.
export const goToHome = () => (dispatch, getState, { history }) => {
  history.push('/');
};


const initialState = {
  posts: reducerUtils.initial(),
  post: {}
};

// reducer
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
        return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POSTS_SUCCESS:
        return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POSTS_ERROR:
        return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POST:
        return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
    case GET_POST_SUCCESS:
        return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
    case GET_POST_ERROR:
        return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
    default:
      return state;
  }
}
