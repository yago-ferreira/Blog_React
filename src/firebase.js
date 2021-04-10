import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

    let firebaseConfig = {
        apiKey: "AIzaSyAxnLVYBkFF_9BPXPL8osA_qOe-W6sCWqM",
        authDomain: "reactapp-f26ad.firebaseapp.com",
        databaseURL: "https://reactapp-f26ad-default-rtdb.firebaseio.com",
        projectId: "reactapp-f26ad",
        storageBucket: "reactapp-f26ad.appspot.com",
        messagingSenderId: "616215914535",
        appId: "1:616215914535:web:4e1c1775fe173214468602",
        measurementId: "G-EM0D5M8W3W"
    };



class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        //referrenciando a database para acessar em outros locais
        this.app = app.database()
    }

    login(email,password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut().then(alert('deslogado com sucesso.'));
    }

     async register(nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email
    }

    async getUsername(callback) {
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;

        await app.database().ref('usuarios').child(uid).once('value')
        .then(callback);
    }

}



export default new Firebase();