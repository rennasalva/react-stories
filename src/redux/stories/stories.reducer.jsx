import INITIAL_STATE from "./initialState";
import {SET_SEARCH_TERM} from "./stories.action";

const storiesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                list: action.payload.data.hits,
                page: action.payload.data.page,
            };
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'REMOVE_STORY':
            return {
                ...state,
                list: state.list.filter(
                    story => action.payload.objectID !== story.objectID
                ),
            };
        case 'SORT_STORY':
            return {
                ...state,
                sort :{
                    sortKey: action.payload.sortKey,
                    isReverse: action.payload.isReverse
                }
            }
        case 'SET_SEARCH_TERM':
            return {
                ...state,
                searchTerm: action.payload
            }
        default:
            return  state;
    }

}


export default storiesReducer;
