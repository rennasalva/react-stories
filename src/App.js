import React,{Component} from "react";
import './App.css';
import {connect} from "react-redux";
import Utility from "./utility";
import {callServerApi} from './api/index'
import List from "./components/stories/list.component";
import Searchform from "./components/search/searchform.component";
import {selectStoriedData} from './redux/stories/stories.selectors';

import {
    REMOVE_STORY,
    STORIES_FETCH_FAILURE,
    STORIES_FETCH_INIT,
    STORIES_FETCH_SUCCESS,
    SORT_STORY,
    SET_SEARCH_TERM,
    STORIES_FETCH_SAGA,
    STORIES_DELETE_SAGA
} from './redux/stories/stories.action';



const getUrl = (searchTerm, page) => `${Utility.ApiConfig.url}${Utility.ApiConfig.url_search}?${Utility.ApiConfig.param_search}${searchTerm}&${Utility.ApiConfig.param_page}${page}`;

const loadData = async (term = 'React',page = 0) =>{
    let lastUrl = getUrl(term,page);
    return await callServerApi(lastUrl);
}

class App extends Component{


  componentDidMount() {
      const {searchTerm,page,STORIES_FETCH_SAGA}  = this.props;
      const url = getUrl(searchTerm,page);
      //console.log('utl',url);
      //console.log('utl',url);
      STORIES_FETCH_SAGA(url);
  }

    handleRemoveStory = (item) => {
        const {REMOVE_STORY,STORIES_DELETE_SAGA}  = this.props;
        console.log('Remove Item');
        STORIES_DELETE_SAGA(item);
    };

    handleSort = (sortKey, isReverse)=>{
        const {SORT_STORY}  = this.props;
        SORT_STORY(sortKey,isReverse);
        console.log('handleSort',sortKey,isReverse);
    }

    handleSearchInput = (value) => {
        const {SET_SEARCH_TERM}  = this.props;
        SET_SEARCH_TERM(value);
    }

    handleSearchSubmit =() => {
        console.log('Search Submit find record');
        const {STORIES_FETCH_SAGA,searchTerm,page} = this.props;
        const url = getUrl(searchTerm,page);
        STORIES_FETCH_SAGA(url);
    };

    handleMore =  ()=> {
        const {searchTerm,page,STORIES_FETCH_SAGA}  = this.props;
        const url = getUrl(searchTerm,page+1);
        STORIES_FETCH_SAGA(url);
    }

    handlePrev =()=> {
        const {searchTerm,page,STORIES_FETCH_SAGA}  = this.props;
        const url = getUrl(searchTerm,page-1);
        STORIES_FETCH_SAGA(url);
    }


    render(){
    const {list,sort,searchTerm,isError,isLoading,page} = this.props;
    return (
        <div className="container">
            <h1 className="title">My React Articles</h1>
            <Searchform searchTerm={searchTerm}
                        onSearchInput={this.handleSearchInput}
                        onSearchSubmit={this.handleSearchSubmit}
            />

            {isError && <p>Something went wrong ...</p>}

            <List list={list}
                  onRemoveItem={this.handleRemoveStory}
                  handleSort={this.handleSort}
                  sort={sort}
            />

            {
                isLoading ? (
                        <p>Loading ...</p>
                    )
                    : (page > 0) ?(
                            <>
                                <button className="button button_small" type="button" onClick={this.handlePrev}>
                                    Prev Page
                                </button>
                                <button className="button button_small" type="button" onClick={this.handleMore}>
                                    Next Page
                                </button>
                            </>
                        ):
                        (
                            <button className="button button_small" type="button" onClick={this.handleMore}>
                                Next Page
                            </button>
                        )
            }
        </div>
    );
  }

}

const mapDispatchToProps = (dispatch) =>(
    {
        STORIES_FETCH_INIT : () => dispatch(STORIES_FETCH_INIT()),
        STORIES_FETCH_SUCCESS : (data) => dispatch(STORIES_FETCH_SUCCESS(data)),
        STORIES_FETCH_SAGA : (item) => dispatch(STORIES_FETCH_SAGA(item)),
        STORIES_DELETE_SAGA : (url) => dispatch(STORIES_DELETE_SAGA(url)),
        STORIES_FETCH_FAILURE : (error) => dispatch(STORIES_FETCH_FAILURE(error)),
        REMOVE_STORY : (item) => dispatch(REMOVE_STORY(item)),
        SET_SEARCH_TERM : (term) => dispatch(SET_SEARCH_TERM(term)),
        SORT_STORY : (sortKey,isReverse) => dispatch(SORT_STORY(sortKey,isReverse)),
    }
)


const mapStateToProps = (state) => (
    {
        list : selectStoriedData,
        ...state.stories
    }
)




export default connect(mapStateToProps,mapDispatchToProps)(App);
