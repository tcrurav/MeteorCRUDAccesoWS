import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Redirect } from 'react-router';

export default class EditStudent extends Component {

  constructor(props){
    super(props);
    this.state = {
      disabled: true,
      editSuccess: false,
      idStudent: this.props.match.params.idStudent
    }
    this.edit = this.edit.bind(this);
    this.fetch = this.fetch.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeSurname = this.changeSurname.bind(this);

    this.fetch(this.state.idStudent);
  }

  fetch(idStudent){
    HTTP.call('GET',
    'http://localhost:8080/Alumnos-1.0-SNAPSHOT/webresources/org.ieselrincon.alumnos.alumno/' + idStudent
    , (error, result) => {
      if (!error) {
        this.setState({
          pkId: result.data.pkId,
          name: result.data.nombre,
          surname: result.data.apellidos,
          disabled: false
        });
      }
    });
  }

  edit(event){
    event.preventDefault();
    HTTP.call('PUT',
    'http://localhost:8080/Alumnos-1.0-SNAPSHOT/webresources/org.ieselrincon.alumnos.alumno/'
    + this.state.idStudent, {
      data: { pkId: this.state.idStudent, nombre: this.state.name, apellidos: this.state.surname}
    }, (error, result) => {
      if (!error) {
        this.setState({
          editSuccess: true
        });
      }
    });
  }

  changeName(event){
    this.setState({
      name: event.target.value
    });
  }

  changeSurname(event){
    this.setState({
      surname: event.target.value
    });
  }

  showForm(){
    return (
      <form onSubmit={this.edit}>
        <div className="form-group">
         <label htmlFor="name">Nombre:</label>
         <input type="text" className="form-control" id="name" name="name"
                value={this.state.name}
                onChange={this.changeName}/>
        </div>
        <div className="form-group">
         <label htmlFor="surname">Apellidos:</label>
         <input type="text" className="form-control" id="surname" name="surname"
                value={this.state.surname}
                onChange={this.changeSurname}/>
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    );
  }

  render(){
    return (
      <div>
        <div className="container">
          { !this.state.disabled &&
            this.showForm()
          }
        </div>
        { this.state.editSuccess &&
          <Redirect to='/' />
        }
      </div>
    );
  }
}
