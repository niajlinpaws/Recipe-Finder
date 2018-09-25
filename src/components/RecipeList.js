import React, { Component }  from 'react';

export default class RecipeList extends Component {
  createItem(item,index) {
    return <li key={index}>{item}</li>
  }
 
  render() {
    var entries = this.props.entries;
    var listItems = entries.map(this.createItem);
 
    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};