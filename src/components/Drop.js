import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import Board from './../utils/Board';

const defaultGridOpts = {
  width: 20,
  showGrid: true
}

export default options => (

  function dragAndDropWrapper(WrappedComponent) {
    class Drop extends Component {
      constructor(props) {
        super(props);
        this.state = {
          node: {},
          opts: Object.assign({}, options, defaultGridOpts)
        }
      }

      static contextTypes = {
        dragDropManager: PropTypes.object,
      }

      componentDidMount() {
        this.subscriptionID = this.context.dragDropManager.subscribe(() => this.forceUpdate());

        this.node = findDOMNode(this);
        console.log('this node: ', this, ' height: ', this.node.clientHeight, ' width: ', this.node.clientWidth);
        this.node.addEventListener('drop', this.handleDrop);
        this.node.addEventListener('dragend', this.handleDragEnd);
        this.node.addEventListener('dragover', this.handleDragOver);

        this.setState({
          node: this.node
        })
      }

      componentWillUnmount() {
        this.node.removeEventListener('drop', this.handleDrop);
        this.node.removeEventListener('dragend', this.handleDragEnd);
        this.node.removeEventListener('dragover', this.handleDragOver);

        this.context.dragDropManager.unsubscribe(this.subscriptionID);
      }

      handleDragOver = (e) => {
        e.preventDefault();

        const overElementHeight = e.currentTarget.getBoundingClientRect().height / 2;
        const overElementTopOffset = e.currentTarget.getBoundingClientRect().top;
        const mousePositionY = e.clientY;

        const showAfter = mousePositionY - overElementTopOffset > overElementHeight;

        if (options.onDragOver) {
          options.onDragOver(this.props, showAfter);
        }
      }

      handleDragEnd = (e) => {
        e.preventDefault();

        const { dragDropManager } = this.context;
        if (options.onDragEnd) {
          options.onDragEnd(dragDropManager.active);
        }
      }

      handleDrop = (e) => {
        e.preventDefault();

        const { dragDropManager } = this.context;
        if (options.onDrop) {
          options.onDrop(dragDropManager.active);
        }
      }

      render() {
        console.log(' render this: ', this)
        return (
          <WrappedComponent {...this.props} >Shreyas</WrappedComponent>
        );
      }
    }

    return Drop;
  }
);
