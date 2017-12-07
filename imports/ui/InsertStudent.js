import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Redirect } from 'react-router';

export default class InsertStudent extends Component {

  constructor(props){
    super(props);
    this.state = {
      insertSuccess: false
    }
    this.insert = this.insert.bind(this);
  }

  insert(event){
    event.preventDefault();
    var formInsert = event.target;
    HTTP.call('POST',
    'http://localhost:8080/Alumnos-1.0-SNAPSHOT/webresources/org.ieselrincon.alumnos.alumno', {
      data: { nombre: formInsert.name.value, apellidos: formInsert.surname.value}
    }, (error, result) => {
      if (!error) {
        this.setState({
          insertSuccess: true
        });
      }
    });
  }

  render(){
    return (
      <div>
        <div className="container">
          <form onSubmit={this.insert}>
            <div className="form-group">
             <label htmlFor="name">Nombre:</label>
             <input type="text" className="form-control" id="name" name="name"/>
            </div>
            <div className="form-group">
             <label htmlFor="surname">Apellidos:</label>
             <input type="text" className="form-control" id="surname" name="surname"/>
            </div>
            <button type="submit" className="btn btn-primary">Insertar</button>
          </form>
        </div>
        { this.state.insertSuccess &&
          <Redirect to='/' />
        }

      </div>
    );
  }
}
