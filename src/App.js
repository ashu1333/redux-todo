import React, { Component } from "react";
import { connect } from "react-redux";
import * as contactAction from "./actions/contactAction";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: "",
    };
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let contact = {
      name: this.state.name,
    };
    this.setState({
      name: "",
    });
    this.props.createContact(contact);
  }

  listView(data, index) {
    return (
      <div className="row">
        <div className="col-md-10">
          <li key={index} className="list-data">
            {data.name}
          </li>
        </div>
        <div>
          <button
            onClick={(e) => this.deleteContact(e, index)}
            className="btn-danger"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  deleteContact(e, index) {
    e.preventDefault();
    this.props.deleteContact(index);
  }

  render() {
    return (
      <div className="container">
        <h1> Contacts Application</h1>
        <hr />
        <div>
          <h3>Add Contact Form</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.name}
            />
            <br />
            <input className="button" type="submit" value="ADD" />
          </form>
          <hr />
          {
            <ul className="list-group">
              {this.props.contacts.map((contact, i) =>
                this.listView(contact, i)
              )}
            </ul>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: (contact) => dispatch(contactAction.createContact(contact)),
    deleteContact: (index) => dispatch(contactAction.deleteContact(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
