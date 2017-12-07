import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Redirect } from 'react-router';

export default class ListStudents extends Component {

  constructor(props){
    super(props);
    this.state = {
      students: [],
      editSelected: false
    }
    this.delete = this.delete.bind(this);
    this.fetch = this.fetch.bind(this);
    this.edit = this.edit.bind(this);

    this.fetch();
  }

  fetch(){
    HTTP.call('GET',
    'http://localhost:8080/Alumnos-1.0-SNAPSHOT/webresources/org.ieselrincon.alumnos.alumno'
    , (error, result) => {
      if (!error) {
        //JSON.stringify(result);
        this.setState({
          students: result.data
        });
      }
    });
  }

  delete(idStudent){
    HTTP.call('DELETE',
    'http://localhost:8080/Alumnos-1.0-SNAPSHOT/webresources/org.ieselrincon.alumnos.alumno/' + idStudent
    , (error, result) => {
      if (!error) {
        this.fetch();
      }
    });
  }

  edit(idStudent){
    this.setState({
      editSelected: true,
      idStudent: idStudent
    })
  }

  showStudents(){
    return this.state.students.map((student) => (
        <tr key={student.pkId}>
          <td>{student.nombre}</td><td>{student.apellidos}</td>
          <td>
            <button className="btn btn-danger" onClick={() => this.delete(student.pkId)}>
              <span className="glyphicon glyphicon-trash"></span>
            </button>
            <button className="btn btn-info" onClick={() => this.edit(student.pkId)}>
              <span className="glyphicon glyphicon-edit"></span>
            </button>
          </td>
        </tr>
    ));
  }

  render(){
    return (
      <div>
        <div className="container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nombre</th><th>Apellidos</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí van las filas */}
              {this.showStudents()}
            </tbody>
          </table>
        </div>
        { this.state.editSelected &&
          <Redirect to={"/edit/" + this.state.idStudent} />
        }
      </div>
    );
  }
}
