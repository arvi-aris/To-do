import React, { Component } from 'react';

class CompletedItem extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  undoComplete = () => {
    this.props.onUndoComplete(this.props.id);
  }

  delete = () => {
    this.props.onDelete(this.props.id, 'todo');
  }

  render() {
    return (
      <div className="">
          <div className="grid-container add-block">
            <div className="grid-item grid-input list-item-name completed-item">{this.props.listItem.item}</div>
            <div className="grid-item grid-button">
              <button type="button" className="list-item-button" onClick={this.undoComplete}> Undo complete </button>
              <button type="button" className="list-item-button" onClick={this.delete} > Delete </button> 
            </div>
          </div>
      </div>
    );
  }
}

export default CompletedItem;
