import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from './firebase';

import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import New from './components/New';
import Register from './components/Register';
import './global.css';

class App extends Component {

  state = {
    firebaseInitialized: false
  };
  
  componentDidMount() {
    firebase.isInitialized().then(resultado => {
      //devolve usuario
      this.setState({firebaseInitialized: resultado});

    })
  }

  render(){
    return this.state.firebaseInitialized !== false ?(
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/dashboard/new" component={New}></Route>
          </Switch>
        </BrowserRouter>
      ) : (
      <h1>Carregando...</h1>
    );
  }
}

export default App;
