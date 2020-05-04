import React, {Component} from "react";
import {StyleSheet, Text, View, Button, Alert} from "react-native";
import {Input, Avatar} from "react-native-elements";
import {
	crearProducto,
	actualizarProductoDB,
} from "../../servicios/ServiciosProductos";

export class FormularioProducto extends Component {
	constructor(props) {
		super(props);

		if (null != this.props.route && null != this.props.route.params) {
			let producto = null;

			producto = this.props.route.params.producto;
			this.state = {
				id: "" + producto.id,
				nombre: producto.nombre,
				precio: producto.precio,
				imgUrl: producto.imgUrl,
				esNuevo: false,
			};
		} else {
			this.state = {
				id: "",
				nombre: "",
				precio: "",
				imgUrl: "",
				esNuevo: true,
			};
		}
	}

	crearCorrecto = () => {
		console.log("creado con existo");
		this.setState({id: "", nombre: "", precio: ""});
	};
	actualizarCorrecto = () => {
		console.log("creado con existo");
		this.setState({id: "", nombre: "", precio: ""});
	};
	crearError = error => {
		Alert.alert(
			"Error",
			"Se ha presentado un error con el código:" +
				error.codigo +
				" , mensaje:" +
				error.message,
		);
	};

	recibirUrl = urlDescarga => {
		this.setState({imgUrl: urlDescarga});
	};

	render() {
		return (
			<View style={styles.container}>
				{this.state.esNuevo ? (
					<Avatar
						rounded
						size="xlarge"
						title={this.state.nombre.substring(0, 2)}
						source={this.state.imgUrl ? {uri: this.state.imgUrl} : null}
					/>
				) : (
					<Avatar
						rounded
						size="xlarge"
						title={this.state.nombre.substring(0, 2)}
						source={{uri: this.state.imgUrl}}
					/>
				)}
				<Button
					title="Editar imagen"
					onPress={() => {
						this.props.navigation.navigate("cargarImagenProductoScreem", {
							urlDescarga: this.recibirUrl,
						});
					}}
				></Button>
				<Input
					placeholder="Id"
					disabled={!this.state.esNuevo}
					value={this.state.id}
					onChangeText={valor => {
						this.setState({id: valor});
					}}
				/>
				<Input
					placeholder="Nombre"
					value={this.state.nombre}
					onChangeText={valor => {
						this.setState({nombre: valor});
					}}
				/>
				<Input
					placeholder="Precio"
					value={this.state.precio}
					onChangeText={valor => {
						this.setState({precio: valor});
					}}
				/>

				<Button
					title="Guardar"
					onPress={() => {
						producto = {
							id: this.state.id,
							nombre: this.state.nombre,
							precio: this.state.precio,
							imgUrl: this.state.imgUrl,
						};
						if (this.state.esNuevo) {
							crearProducto(producto, this.crearCorrecto, this.crearError);
						} else {
							actualizarProductoDB(
								producto,
								this.actualizarCorrecto,
								this.crearError,
							);
						}
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
