import {all,call} from 'redux-saga/effects';
import storiesSagas from "./stories.saga";

export default function* rootSaga(){
    yield all([call(storiesSagas)]);
}
