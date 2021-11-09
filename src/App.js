import './App.css';
import React from "react";
import List from "./components/stories/list.component";
import Searchform from "./components/search/searchform.component";
import Utility from "./utility";
import axios from 'axios';
import ApiConfig from "./utility/api";


const INITIAL_STATE = [
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

const getUrl = (searchTerm, page) => `${Utility.ApiConfig.url}${Utility.ApiConfig.url_search}?${Utility.ApiConfig.param_search}${searchTerm}&${Utility.ApiConfig.param_page}${page}`;
const  callServerApi = (url) =>{
    try{
        return axios.get(url);
    }
    catch {
        return false;
    }
}

const loadData = async () =>{
    let lastUrl = getUrl('React',0);
    return await callServerApi(lastUrl);
}

class App extends React.Component{

    constructor() {
        console.log('constructors');
        super();
        this.state = {
            list : INITIAL_STATE,
            searchTerm: 'React',
            data : [],
            page : 0,
            sort :{
                sortKey: 'NONE',
                isReverse: false
            },
            isLoading: false,
            isError: false,
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        try{
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    isLoading: true
                }
            });
            loadData().then(result=>{
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        list:result.data.hits,
                        page: result.data.page,
                        isLoading: false
                    }
                });
            });

        }
        catch(error) {
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        isError: true
                    }
                });
            console.log(error)
            }
    }


    handleRemoveStory = (item) => {
        console.log('Remove Item');
        this.setState((prevState)=>{
            return {
                ...prevState,
                list:prevState.list.filter((story) => story.objectID != item.objectID)
            }
        });
    };

    handleSearchSubmit = async () => {
        console.log('Search Submit find record');
        const {searchTerm,page} = this.state;
        try{
            let lastUrl = getUrl(searchTerm,page);
            console.log(lastUrl);
            const result = await axios.get(lastUrl);
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    list:result.data.hits,
                    page: result.data.page
                }
            });
        }
        catch {
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    isError: true
                }
            });
        }
    };

    handleSearchInput = (value) => {
       this.setState({
           searchTerm:value
       })
    }

    handleSort = (sortKey, isReverse)=>{
        this.setState({
            sort :{
                sortKey: sortKey,
                isReverse: isReverse
            }
        })
        console.log('handleSort',sortKey,isReverse);
    }


    handleMore = async ()=>{
        const {page,searchTerm} = this.state;
        let lastUrl = getUrl(searchTerm,page+1);
        console.log(lastUrl);
        this.setState((prevState)=>{
            return {
                ...prevState,
                isLoading: true
            }
        });
        const result = await callServerApi(lastUrl);
        console.log(result);

        if(result){
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    isLoading: false,
                    list:result.data.hits,
                    page: result.data.page
                }
            });
        }
        else{
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    isError: true
                }
            });
        }
    }

    handlePrev = async ()=>{
        const {page,searchTerm} = this.state;
        let lastUrl = getUrl(searchTerm,page-1);
        console.log(lastUrl);
        this.setState((prevState)=>{
            return {
                ...prevState,
                isLoading: true
            }
        });
        const result = await callServerApi(lastUrl);
        console.log(result);

        if(result){
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    isLoading: false,
                    list:result.data.hits,
                    page: result.data.page
                }
            });
        }
        else{
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    isError: true
                }
            });
        }
    }

    render() {
        const {list,sort,searchTerm,isError,isLoading,page} = this.state;
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
                              <button class="button button_small" type="button" onClick={this.handlePrev}>
                                  Prev Page
                              </button>
                              <button class="button button_small" type="button" onClick={this.handleMore}>
                                  Next Page
                              </button>
                            </>
                      ):
                          (
                              <button class="button button_small" type="button" onClick={this.handleMore}>
                                  Next Page
                              </button>
                          )
              }
          </div>
    );
  }


}

export default App;
