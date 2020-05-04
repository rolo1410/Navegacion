import React, {Component} from "react";
import {View} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {BottomTabBar} from "@react-navigation/bottom-tabs";
import {Button, Avatar} from "react-native-elements";

export class CargarImagen extends Component {
	constructor() {
		super();
		this.state = {imgUrl: ""};
	}

	uriToBlob = (dataUrl, callback) => {
		let req = new XMLHttpRequest();
		req.open("GET", dataUrl, true);
		req.responseType = "blob";
		req.onload = () => {
			callback(req.response);
		};
		req.onerror = error => {
			console.log("error", error);
		};
		req.send(null);
	};

	abrirImagen = async () => {
		let permissionResult;
		try {
			permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
		} catch (err) {
			Alert.alert("error");
		}
		if (permissionResult.granted === false) {
			Alert.alert("Permission to access camera roll is required!");
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		if (!pickerResult.cancelled) {
			console.log("URI:", pickerResult.uri);
			this.setState({imgUrl: pickerResult.uri});
		}
	};

	recuperarUrlDescarga = async nombre => {
		let urlDescarga = await global.fireStorage
			.refFromURL("gs://cursornfb.appspot.com/imagenes/" + nombre)
			.getDownloadURL();
		return urlDescarga;
	};

	guardarenStorage = () => {
		this.uriToBlob(this.state.imagen, blob => {
			let date = new Date().getTime();
			let nombreArchivo = "img_" + date.toString;
			console.log(nombreArchivo);
			global.fireStorage
				.ref()
				.child(nombreArchivo)
				.put(blob)
				.then(console.log("ya subio la imagen "));

			/**/
			let urlDescarga = this.recuperarUrlDescarga(nombreArchivo);

			/**/
			this.props.route.params.urlDescarga(urlDescarga);
		});
	};

	render() {
		return (
			<View>
				<Avatar title="img" source={{uri: this.state.imgUrl}}></Avatar>
				<Button
					title="Seleccionar"
					onPress={() => {
						this.abrirImagen();
					}}
				></Button>
				<Button
					title="Subir"
					onPress={() => {
						this.guardarenStorage();
					}}
				></Button>
			</View>
		);
	}
}
