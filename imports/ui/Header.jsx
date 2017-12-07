import React from 'react';

const Header = () => (
  <nav className="navbar navbar-inverse">
   <div className="container-fluid">
     <div className="navbar-header">
       <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
         <span className="icon-bar"></span>
         <span className="icon-bar"></span>
         <span className="icon-bar"></span>
       </button>
       <a className="navbar-brand" href="#">Alumnado</a>
     </div>
     <div className="collapse navbar-collapse" id="myNavbar">
       <ul className="nav navbar-nav">
         <li className="active"><a href="/">Inicio</a></li>
         <li><a href="/">Listado</a></li>
         <li><a href="/insert">Insertar</a></li>
       </ul>
     </div>
   </div>
  </nav>
);

export default Header;
