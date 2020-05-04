import firebase from "firebase";
import "@firebase/firestore";
import "@firebase/storage";
import {decode, encode} from "base-64";

export const cargarConfiguracion = () => {
	const firebaseConfig = {
		apiKey: "AIzaSyDmeXIripothoX5n69tYQ5lcICrJVhq3Jk",
		authDomain: "serbas-ffc6c.firebaseapp.com",
		databaseURL: "https://serbas-ffc6c.firebaseio.com",
		projectId: "serbas-ffc6c",
		storageBucket: "serbas-ffc6c.appspot.com",
		messagingSenderId: "1098042861063",
		appId: "1:1098042861063:web:9acef6867ddf769cfcaca2",
	};

	/* debe ser llamado una sola vez */
	/* como solo es una vez y es una configuración le pongo aquí */
	/* es por culpa de la version del firebase */
	if (!global.btoa) {
		global.btoa = encode;
	}

	if (!global.atob) {
		global.atob = decode;
	}

	firebase.initializeApp(firebaseConfig);
	global.firestoreDB = firebase.firestore();
	global.fireStorage = firebase.storage();
	global.estaConfigurado = true;
};
