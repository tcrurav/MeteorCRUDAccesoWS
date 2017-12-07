import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListStudents from './ListStudents.js';
import InsertStudent from './InsertStudent.js';
import EditStudent from './EditStudent.js';

const Main = () => (
  <Switch>
    <Route exact path='/' component={ListStudents}/>
    <Route path='/insert' component={InsertStudent}/>
    <Route path='/edit/:idStudent' component={EditStudent}/>
  </Switch>
);

export default Main;
