import React, { Component } from 'react';

class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemName: this.props.listItem.item,
      onEdit : false
    };
  }

  edit = () => {
    this.setState({
      onEdit: true
    });
  }

  update = () => {
    let item = this.state.itemName;
    this.props.onUpdate(item, this.props.id);
    this.setState({
      onEdit: false
    });
  }

  updateValue = (event) => {
    this.setState({
      itemName : event.target.value
    });
  }

  complete = () => {
    this.props.onComplete(this.props.id);
  }

  delete = () => {
    this.props.onDelete(this.props.id, 'todo');
  }

  render() {
    return (
      <div className="">
          <div className="grid-container add-block">
            {!this.state.onEdit && <div className="grid-item grid-input list-item-name">{this.props.listItem.item}</div>}
            {this.state.onEdit && <div className="grid-item grid-input item-name"><input type="text" className="todo-input" value={this.state.itemName} onChange={this.updateValue}/></div>}
            <div className="grid-item grid-button">
              <button type="button" className="list-item-button" onClick={this.edit} disabled={this.state.onEdit}> Edit </button>
              <button type="button" className="list-item-button" onClick={this.update} disabled={!this.state.onEdit}> Save </button> 
              <button type="button" className="list-item-button" onClick={this.complete} disabled={this.state.onEdit}> Complete </button> 
              <button type="button" className="list-item-button" onClick={this.delete} disabled={this.state.onEdit}> Delete </button> 
            </div>
          </div>
      </div>
    );
  }
}

export default ListItem;
