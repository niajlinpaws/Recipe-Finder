import React, { Component }  from 'react';

export default class Footer extends Component {
	render(){
		var {getPrevPage,getNextPage} = this.props;

		return (
		<div className="footer">
			<button onClick={getPrevPage}>Prev
			</button>
			<button onClick={getNextPage}>Next
			</button>
		</div>	
		);
	}
}