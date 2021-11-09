import React,{Component,useReducer,useState,useEffect,useCallback} from "react";
import './App.css';
import {connect} from "react-redux";
import Utility from "./utility";
import {callServerApi} from './api/index'
import List from "./components/stories/list.component";
import Searchform from "./components/search/searchform.component";
import {selectStoriedData} from './redux/stories/stories.selectors';
import storiesReducer from './redux/stories/stories.reducer'
import INITIAL_STATE from "./redux/stories/initialState";

import {
    REMOVE_STORY,
    STORIES_FETCH_FAILURE,
    STORIES_FETCH_INIT,
    STORIES_FETCH_SUCCESS,
    SORT_STORY,
    SET_SEARCH_TERM
} from './redux/stories/stories.action';



const getUrl = (searchTerm, page) => `${Utility.ApiConfig.url}${Utility.ApiConfig.url_search}?${Utility.ApiConfig.param_search}${searchTerm}&${Utility.ApiConfig.param_page}${page}`;

const loadData = async (url) =>{
    return await callServerApi(url);
}

 const App = (props)=>{

        const [stories, dispatchStories] = useReducer(
            storiesReducer,
            INITIAL_STATE
        );

        //custom Hook
        const useSemiPersistentState = (key, initialState) => {
             const [value, setValue] = React.useState(
                 localStorage.getItem(key) || initialState
             );

             React.useEffect(() => {
                 localStorage.setItem(key, value);
             }, [value, key]);

            return [value, setValue];
        };

        const {list,sort,isError,isLoading,page,pageTot} = stories;

        const [searchTerm, setSearchTerm] = useSemiPersistentState(
         'search',
         'React'
     );

        const [url, setUrl] = useState(getUrl(searchTerm, 0));



        const handleFetchStories = useCallback(()=>{
                dispatchStories(STORIES_FETCH_INIT());
                try{
                    loadData(url).then(result=>{
                        console.log(result);
                        dispatchStories(STORIES_FETCH_SUCCESS(result))
                    });
                }
                catch{
                    dispatchStories(STORIES_FETCH_FAILURE('Errore di Fetching'));
                }
            },[url]
            );



        useEffect(()=>{
           handleFetchStories()
         },[handleFetchStories]);



        const handleRemoveStory = (item) => {
            console.log('Remove Item');
            dispatchStories(REMOVE_STORY(item));
        };

        const handleSort = (sortKey, isReverse)=>{
            dispatchStories(SORT_STORY(sortKey,isReverse));
            console.log('handleSort',sortKey,isReverse);
        }

        const handleSearchInput = (value) => {
            dispatchStories(SET_SEARCH_TERM(value));
        }

        const handleSearchSubmit = async () => {
            setUrl(getUrl(searchTerm, page+1));
        };

        const handleMore = async ()=> {
            setUrl(getUrl(searchTerm, page+1));
        }

        const handlePrev = async ()=> {
            setUrl(getUrl(searchTerm, page-1));
        }



     return (
        <div className="container">
            <h1 className="title">My React Articles</h1>
            <Searchform searchTerm={searchTerm}
                        onSearchInput={handleSearchInput}
                        onSearchSubmit={handleSearchSubmit}
            />

            {isError && <p>Something went wrong ...</p>}

            <List list={list}
                  onRemoveItem={handleRemoveStory}
                  handleSort={handleSort}
                  sort={sort}
            />

            {
                isLoading ? (
                        <p>Loading ...</p>
                    )
                    : (page > 0 && page <= pageTot) ?(
                            <>
                                <button className="button button_small" type="button" onClick={handlePrev}>
                                    Prev Page
                                </button>
                                <button className="button button_small" type="button" onClick={handleMore}>
                                    Next Page
                                </button>
                            </>
                        ):
                        (
                            <button className="button button_small" type="button" onClick={handleMore}>
                                Next Page
                            </button>
                        )
            }
        </div>
    );
}

export  default  App;
