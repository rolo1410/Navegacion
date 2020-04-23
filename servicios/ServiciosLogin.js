import firebase from "firebase";
import {Alert} from "react-native";

export const registrarUsuario = (usuario, contrasenia, accion) => {
  firebase.auth().createUserWithEmailAndPassword(usuario, contrasenia).then(respuesta => {
    Alert.alert("Info", "Usuario Registrado");
    /* O tambien puede ser redirecionado */
    accion();
  }).catch(error => {
    console.log("Mensaje:" + error.message);
    console.log("Codigo Error" + error.code);
    Alert.alert("Error", error.message);
  });
};

export const recuperarContrasenia = (email, onSucces, onError) => {
  firebase.auth().sendPasswordResetEmail(email).then(() => {
    onSucces();
  }).catch(error => {
    onError(error);
  });
};

export const validarIngreso = (email, password, onSucces, onError) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    onSucces();
  }).catch(error => {
    onError(error);
  });
};
