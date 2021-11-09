import {combineReducers} from 'redux';
import storiesReducer from './stories/stories.reducer'

const rootReducer = combineReducers({
    stories:storiesReducer
});

export default rootReducer;
