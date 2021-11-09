import StoriesType from "./stories.type";


export const STORIES_FETCH_SAGA = (url)=>(
    {
        type: StoriesType.STORIES_FETCH_SAGA,
        payload : url
    }
);


export const STORIES_DELETE_SAGA = (item)=>(
    {
        type: StoriesType.STORIES_DELETE_SAGA,
        payload : item
    }
);


export const STORIES_FETCH_INIT = () => (
    {
        type: StoriesType.STORIES_FETCH_INIT
    }
)


export const STORIES_FETCH_SUCCESS = (data)=>(
    {
        type: StoriesType.STORIES_FETCH_SUCCESS,
        payload : data
    }
);

export const STORIES_FETCH_FAILURE = (error) => (
    {
        type: StoriesType.STORIES_FETCH_FAILURE,
        payload : error
    }
)


export  const REMOVE_STORY = (item) =>( {
    type: StoriesType.REMOVE_STORY,
    payload : item
});

export  const SET_SEARCH_TERM = (term) =>( {
    type: StoriesType.SET_SEARCH_TERM,
    payload : term
});

export  const SORT_STORY = (sortKey,isReverse) =>( {
    type: StoriesType.SORT_STORY,
    payload : {
        sortKey,
        isReverse
    }
});



