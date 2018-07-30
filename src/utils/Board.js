import React from 'react';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.gridSquareStyle = {
      fontSize: this.props.sqSize * 0.75,
      lineHeight: this.props.sqSize * 0.75,
      verticalAlign: 'middle',
      display: 'table-cell',
      fontWeight: '100',
      border: '1px solid whitesmoke',
      width: '100%'
    }
	}

	render() {
		const {node, sqSize, Component} = this.props;
		const squares = [];
		const sqNum = node.clientHeight/sqSize * node.clientWidth/sqSize;
		console.log('number of squares: ', sqNum);
		return Component;
	}
}