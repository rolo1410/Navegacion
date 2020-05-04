import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Avatar, Button} from "react-native-elements";
import {
	agregarItemCarroCompra,
	eliminarCompra,
} from "./../../servicios/ServiciosCarroCompras";
import Icon from "react-native-vector-icons/FontAwesome";

export class DetalleProducto extends Component {
	constructor() {
		super();
		this.state = {
			cantidad: 0,
		};
	}

	fnAgregarCorrecto = () => {
		console.log("agregar al carrito de compra correcto");
	};
	fnAgregarError = error => {
		console.log("Error al agregar la compra" + error.code);
	};

	render() {
		let producto = this.props.route.params.producto;
		return (
			<View style={styles.container}>
				<View style={styles.imagen}>
					<Avatar size="xlarge" rounded title={"a"} 
					
					source={{uri:producto.imgUrl}}
					
					></Avatar>
				</View>
				<View style={styles.contenedorDescripcion}>
					<View style={styles.contenedorDescripcionDetalle}>
						<Text style={{fontSize: 25}}>{producto.nombre}</Text>
						<Text>{producto.descripcion}</Text>
					</View>
					<View style={styles.contenedorDescripcionPrecio}>
						<Text style={{fontSize: 35}}>{"$" + producto.precio}</Text>
					</View>
				</View>
				<View style={styles.boton}>
					<Button
						icon={
							<Icon name="minus" type="font-awesome" size={15} color="white" />
						}
						onPress={() => {
							let pedido = {producto: producto};
							agregarItemCarroCompra(
								global.mailUsuario,
								pedido,
								-1,
								this.fnAgregarCorrecto,
								this.fnAgregarError,
							);
						}}
					/>
					<Text>{this.state.cantidad}</Text>

					<Button
						icon={
							<Icon name="plus" type="font-awesome" size={15} color="white" />
						}
						onPress={() => {
							let pedido = {producto: producto, cantidad: 1};

							agregarItemCarroCompra(
								global.mailUsuario,
								pedido,
								1,
								this.fnAgregarCorrecto,
								this.fnAgregarError,
							);
						}}
					/>
				</View>

				<View></View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "lightgray",
		alignItems: "stretch",
		justifyContent: "flex-start",
	},

	imagen: {
		flex: 5,
		flexDirection: "column",
		justifyContent: "center",

		alignItems: "center",
		padding: 2,
		margin: 4,
	},
	contenedorDescripcion: {
		flex: 3,
		flexDirection: "row",

		justifyContent: "flex-start",
	},

	contenedorDescripcionDetalle: {
		flex: 3,
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center",

		margin: 2,
	},
	contenedorDescripcionPrecio: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		margin: 2,
	},
	boton: {
		flex: 1,
		flexDirection: "row",

		justifyContent: "center",
	},
});
