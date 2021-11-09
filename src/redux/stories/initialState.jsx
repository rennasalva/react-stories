const INITIAL_STORIES_DATA = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];


const INITIAL_STATE = {
    list : INITIAL_STORIES_DATA,
    searchTerm: 'React',
    page : 0,
    pageTot:1,
    sort :{
        sortKey: 'NONE',
        isReverse: false
    },
    isLoading: false,
    isError: false,
}


export default INITIAL_STATE;
