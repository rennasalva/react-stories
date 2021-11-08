import React,{Component} from "react";
import logo from './logo.svg';
import './App.css';

const list = [
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
        author: 'Dan Abramov Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];


const testComponente = (props)=>{
    console.log('Render Test Componente',props.label)
    return <label style={{ color: 'green',
        fontSize: 25}}>{props.label}</label>
}

const LiComponenente = (props)=>{
    const {item} = props;
    console.log('Render Test LiComponenente',item)
    //console.log('Li render componente',props);
    //console.log('Li render componente',item);
    return (
        <li key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
        </li>
    );
}



let     bloccoHtml = '';
const   miaVariabile = false;
const   style = {
    color: 'green',
    fontSize: 25
};


if(miaVariabile){
    bloccoHtml = <div className='active' style={style} >Aggiungo bloccoHtml true</div>
}
else{
    bloccoHtml = <div className='active' style={{color: 'red'}} >Aggiungo bloccoHtml False</div>
}


class AppClassi extends Component{

    constructor(props) {
        super(props);
        console.log('Costruttore App --> propos in App',props);

        this.state = {
           list
        }

    }

    testStringa(){
        return 'test stringa';
    }

    testEspressione(){
        return (5+8+12) / 5;
    }

    handleChangeAdd = (event)=> {
        event.preventDefault();
        console.log('aggiungo un valore alla maschera ');
        console.log(list);
        list.push({
            title: 'Redux',
            url: 'https://redux.js.org/',
            author: 'Dan Abramov Andrew Clark',
            num_comments: 2,
            points: 5,
            objectID: Math.max(...[...list.keys()])+1
        });

        /*this.setState((prevState)=>{
            return  {
                list : [
                    ...prevState.list,
                    {title: 'Redux',
                    url: 'https://redux.js.org/',
                    author: 'Dan Abramov Andrew Clark',
                    num_comments: 2,
                    points: 5,
                    objectID: 1
                    }
                ]
            }
        });*/

        this.setState((prevState)=>{
            return  {
                list : list
            }
        });
    }


    handleChangeDelete = (event)=> {
            event.preventDefault();
            console.log('aggiungo un valore alla maschera ');
            console.log(list);


        /*this.setState((prevState)=> {
            let prevStateList =prevState.list;
            prevStateList.pop();
                return {
                    list: [
                        ...prevStateList,
                    ]
                }
            }
        );*/

        list.pop();
        this.setState((prevState)=>{
            return  {
                list : list
            }
        });
    }


    render(){
        console.log('Render Componente App');

        let     bloccoHtml = '';
        const   miaVariabile = false;
        const   style = {
            color: 'green',
            fontSize: 25
        };


        if(miaVariabile){
            bloccoHtml = <div className='active' style={style} >Aggiungo bloccoHtml true</div>
        }
        else{
            bloccoHtml = <div className='active' style={{color: 'red'}} >Aggiungo bloccoHtml False</div>
        }

        return (
            <div className="App">
                <h1>Esempio Inclusione Js in Jsx  sviluppato a classi</h1>
                <input id="search" type="button" value="Add Element" onClick={this.handleChangeAdd}/>
                <input id="search" type="button" value="Delete Element" onClick={this.handleChangeDelete}/>
                <hr />
                <br />
                {"Concateno "+" Stringa"}
                <br />
                {(miaVariabile) ? <label>La variabile e popolata </label>  : <label>La variabile e a false </label>}
                <br />
                {(miaVariabile) ?? <label>La variabile e popolata </label>}
                <br />
                <ul>
                    {['casa','palazzo','grattacielo','palestra'].map((elm,key)=> <li key={key}>{elm}</li>)}
                </ul>
                <br />
                <br />
                <ul>
                    {['casa','palazzo','grattacielo','palestra']
                        .filter((ele)=>{
                            return ele.includes("pa")
                        })
                        .map((elm,key)=> <li key={key}>{elm}</li>)}
                </ul>
                <br />
                <br />
                {[1,2,3].reduce((reducer, elm)=> reducer + elm)}
                <br />
                {list.map(function (item) {
                    return (
                        <li key={item.objectID}>
                  <span>
                    <a href={item.url}>{item.title}</a>
                  </span>
                            <span>{item.author}</span>
                            <span>{item.num_comments}</span>
                            <span>{item.points}</span>
                        </li>
                    );
                })}

                <br />
                <label>Assegnamento di destrutturazione</label>
                {list.map(function ({objectID,title,author,num_comments,points,url}) {
                    return (
                        <li key={objectID}>
                  <span>
                    <a href={url}>{title}</a>
                  </span>
                            <span>{author}</span>
                            <span>{num_comments}</span>
                            <span>{points}</span>
                        </li>
                    );
                })}
                <br />
                {list.map(function (item) {
                    return (<LiComponenente key={item.objectID} item={item} ></LiComponenente>);
                })}
                {bloccoHtml}
                {this.testStringa()}
                <br />
                {this.testEspressione()}
                <br />
                {testComponente({label:'etichetta componente'})}
            </div>
    );
}


}
export default AppClassi;
