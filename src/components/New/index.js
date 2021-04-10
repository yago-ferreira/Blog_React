import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import firebase from '../../firebase';
import './new.css';


class New extends Component {

    constructor(props) {
        super(props)
        this.state = {
            titulo: '',
            imagem: '',
            descricao: '',
            alert: ''
        }
        this.cadastrar = this.cadastrar.bind(this);
    }

    componentDidMount() {
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
    }


    cadastrar = async (e) => {
        e.preventDefault();

        if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== ''){
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                imagem: this.state.imagem,
                descricao: this.state.descricao,
                autor: localStorage.nome
            });
            this.props.history.push('/dashboard')
        }else {
            this.setState({alert: 'Preencha todos os campos! '})
        }
    }


    render() {
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                    <span id="alert">{this.state.alert}</span>
                    <label>Titulo:</label><br />
                    <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus
                    onChange={(e) => this.setState({titulo: e.target.value})} /><br />

                    <label>Url da imagem:</label><br />
                    <input type="text" placeholder="https://imagens.google.com" value={this.state.imagem}
                    onChange={(e) => this.setState({imagem: e.target.value})} /><br />

                    <label>Descricao:</label><br />
                    <textarea type="text" placeholder="Esse post é muito bom !" value={this.state.descricao}
                    onChange={(e) => this.setState({descricao: e.target.value})} /><br />

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default New;