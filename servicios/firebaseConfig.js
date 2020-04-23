import firebase from "firebase";

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
	/*debe ser llamado una sola vez*/
	firebase.initializeApp(firebaseConfig);
	global.estaConfigurado = true;
};
