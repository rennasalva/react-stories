import {takeEvery, takeLatest, take, call, put,all} from 'redux-saga/effects';
import StoriesType from "../redux/stories/stories.type";
import {callServerApi} from '../api/index';

import {
    REMOVE_STORY,
    STORIES_FETCH_FAILURE,
    STORIES_FETCH_INIT,
    STORIES_FETCH_SUCCESS,
    SORT_STORY,
    SET_SEARCH_TERM
} from '../redux/stories/stories.action';


function* workerGetStories({payload}){
    const url = payload;
    console.log("*** url ***",url);
    yield put(STORIES_FETCH_INIT());
    try{
        const result = yield callServerApi(url);
        yield put(STORIES_FETCH_SUCCESS(result));
    }
    catch{
        yield put(STORIES_FETCH_FAILURE('errore'));
    }
}

function* workerDeleteStory({payload}){
    const item = payload;
    yield put(REMOVE_STORY(payload));
    //yield call(workerGetStories());
}

function* watchGetStoriesRequest(){
    yield takeEvery(StoriesType.STORIES_FETCH_SAGA,workerGetStories);
}

function* watchDeleteStoriesRequest(){
    yield takeEvery(StoriesType.STORIES_DELETE_SAGA,workerDeleteStory);
}


function* storiesSagas(){
    yield all([
        call(watchGetStoriesRequest),
        call(watchDeleteStoriesRequest),
    ] );
}

export default storiesSagas;
