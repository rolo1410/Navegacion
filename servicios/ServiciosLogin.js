import firebase from "firebase";
import {Alert} from "react-native";

export const registrarUsuario = async (usuario, contrasenia, accion) => {
	/*firebase
		.auth()
		.createUserWithEmailAndPassword(usuario, contrasenia)
		.then(respuesta => {
			console.log("objeto", respuesta.user.email);
			
			accion();
		})
		.catch(error => {
			console.log("Mensaje:" + error.message);
			console.log("Codigo Error" + error.code);
			Alert.alert("Error", error.message);
    });
    */
	try {
		let respuesta = await firebase
			.auth()
			.createUserWithEmailAndPassword(usuario, contrasenia);
		console.log("objeto", respuesta.user.email);
	} catch (error) {
		console.log("Mensaje:" + error.message);
		console.log("Codigo Error" + error.code);
		Alert.alert("Error", error.message);
	}
};

export const recuperarContrasenia = (email, onSucces, onError) => {
	firebase
		.auth()
		.sendPasswordResetEmail(email)
		.then(() => {
			onSucces();
		})
		.catch(error => {
			onError(error);
		});
};

export const validarIngreso = (email, password, onSucces, onError) => {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			onSucces();
		})
		.catch(error => {
			onError(error);
		});
};

export const cerrarSession = (onSucces, onError) => {
	console.log("Cerrar session");
	firebase.auth().signOut().then(onSucces()).catch(onError);
};
