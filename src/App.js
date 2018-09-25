import React, { Component } from 'react';
//import logo from './logo.svg';
// import './App.css';
import RecipeList from './components/RecipeList';
import Footer from './components/Footer';
import axios from 'axios';

let SEARCH_URL = "http://www.food2fork.com/api/search?key=<YOUR-API-KEY>";

class App extends Component {

  constructor(props) {
    super(props);
 
    this.searchItem = this.searchItem.bind(this);
    this.getPrevPage = this.getPrevPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);


    this.state = {
     items: [],
     search:'',
     page:1,
     index:0
    };
  }

  getNextPage(){
    var { index , page , search , items } = this.state;
      
    if(index === (page*30 - 10))
    {
      if(page*30 === items.length)
      return this.fetch(search,page+1)
      .then(response=>this.setState(prevState=>({
        items:prevState.items.concat(response.data.recipes.map(recipe=>recipe.title)),
        index:prevState.index + 10,
        page:prevState.page + 1
      })));
      else  
      return; 
    }

    this.setState(prevState=>{
      return {
        index:prevState.index + 10
      };
    });
  }

  getPrevPage(){
    var { index } = this.state;

    if(!index)
      return;

    this.setState(prevState=>({
      index:prevState.index - 10
    }));
  }

  fetch(input,page=1){
    return axios.get(`${SEARCH_URL}&q=${input}&page=${page}`);
  } 

  searchItem(e){

    /* unable to make a fetch call from the browser to other origin, 
       so i've provided the static data
      */

    if (this._inputElement.value !== "") {

      this.fetch(this._inputElement.value)
      .then(response=>{
        
        this.setState({
          search:this._inputElement.value,
          items:response.data.recipes.map(recipe=>recipe.title),
          page:1,
          index:0
        });
       
        //this._inputElement.value = "";
      });
    }
            
    e.preventDefault();
  }

  render() {

    console.log(this.state);

    var {items,index}=this.state;
    
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.searchItem}>
            <input
            ref={(val) => this._inputElement = val}  
            placeholder="Enter Ingredient Name">
            </input>
            <button type="submit">
              Search
            </button>
          </form>
        </div>
        <RecipeList entries={items.slice(index,index+10)}/>
        <Footer getPrevPage={this.getPrevPage} getNextPage={this.getNextPage}/>
      </div>
    );
  }
}

export default App;
