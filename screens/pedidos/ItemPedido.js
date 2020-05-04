import React, {Component} from "react";
import {Text, View, StyleSheet, Alert} from "react-native";

import {TouchableHighlight} from "react-native-gesture-handler";
import {Avatar} from "react-native-elements";

export class ItemCompra extends Component {
	fnEliminarSucces = () => {
		console.log("Eliminado correcto");
	};

	fnEliminarError = () => {
		console.log("Eliminado correcto");
	};

	render() {
		const {prpNav, prpProducto} = this.props;

		return (
			<View>
				<TouchableHighlight
					underlayColor="white"
					onPress={() => {
						prpNav.navigate("detalleProductoScreem", {
							producto: prpProducto,
						});
					}}
				>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row", // el eje principal es el vertical
		backgroundColor: "yellow",
		alignItems: "stretch", // aplica al eje transversal (horizontal , por column)
		justifyContent: "center", // aplica al eje prinpal ()
		paddingVertical: 2,
	},
	fila: {
		flex: 1,
		flexDirection: "row",
	},
	imagen: {
		flex: 2,
		flexDirection: "column", // el eje principal es el vertical
		backgroundColor: "red",
		alignItems: "stretch", // aplica al eje transversal (horizontal , por column)
		justifyContent: "center", // aplica al eje prinpal ()
		paddingVertical: 5,
	},
	descripcion: {
		flex: 5,
		flexDirection: "column", // el eje principal es el vertical
		backgroundColor: "blue",
		alignItems: "flex-start", // aplica al eje transversal (horizontal , por column)
		justifyContent: "center", // aplica al eje prinpal ()
		paddingVertical: 10,
	},
	precio: {
		flex: 2,
		flexDirection: "column", // el eje principal es el vertical
		backgroundColor: "gray",
		alignItems: "flex-end", // aplica al eje transversal (horizontal , por column)
		justifyContent: "center", // aplica al eje prinpal ()
		paddingVertical: 10,
	},
	textoPrecio: {
		fontSize: 20,
		fontWeight: "bold",
		margin: 5,
	},
	textoDescripcion: {fontSize: 20},
});
