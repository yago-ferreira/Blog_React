import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            password: ''
        };
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
    } 
    
    register(e) {
        e.preventDefault();

        this.onRegister();
    }

    onRegister = async() => {
        try{
         const {nome, email, password} = this.state;

            await firebase.register(nome, email, password);
            this.props.history.replace('/dashboard')

        } catch(error) {
            alert(error.message)
        }
    }

    render(){
        return(
            <div>
                <h1 className="register-h1">Novo Usuário</h1>
                <form onSubmit={this.register} id="register">
                    <label>Nome:</label><br />
                    <input type="text"  autoFocus autoComplete="off" placeholder="Yago" value={this.state.nome} 
                        onChange={(e) => this.setState({nome: e.target.value})}>
                    </input><br />
                    <label>Email:</label><br />
                    <input type="text" placeholder="test@test.com" value={this.state.email} 
                        onChange={(e) => this.setState({email: e.target.value})}>
                    </input><br />
                    <label>Senha:</label><br />
                    <input type="password"  placeholder="********" autoComplete="off" value={this.state.password} 
                        onChange={(e) => this.setState({password: e.target.value})}>
                    </input><br />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);