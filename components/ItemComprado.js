import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Avatar, Icon} from "react-native-elements";
import {eliminarCompraFirebase} from "../servicios/ServiciosCarroCompras";

export class ItemComprado extends Component {
	fnEliminarSucces = () => {
		console.log("Eliminado correcto");
	};

	fnEliminarError = () => {
		console.log("Eliminado correcto");
	};

	render() {
		const {prpNav, prpProducto} = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.imagen}>
					<Avatar
						rounded
						size="medium"
						title={prpProducto.nombre.substring(0, 2).toUpperCase()}
						source={{uri:prpProducto.imgUrl}}
					></Avatar>
				</View>
				<View style={styles.contenedorDetalle}>
					<View style={{flexDirection: "row"}}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 18,
								marginLeft: 2,
								paddingTop: 4,
							}}
						>
							{prpProducto.nombre}
						</Text>
						<Text>{"    $" + prpProducto.precio}</Text>
						
					</View>
					<Text style={{color: "gray", marginLeft: 6}}>
						{prpProducto.descripcion}
					</Text>
				</View>
				<View style={styles.contenedorBotones}>
					<Icon
						name="trash-o"
						type="font-awesome"
						onPress={() => {
							eliminarCompraFirebase(
								global.mailUsuario,
								prpProducto.id,
								this.fnEliminarSucces,
								this.fnEliminarError,
							);
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 5,
		paddingVertical: 1,
	},
	imagen: {backgroundColor: "#ffff", paddingVertical: 6, paddingLeft: 2},
	contenedorDetalle: {
		flex: 7,
		flexDirection: "column",
		backgroundColor: "#ffff",
	},
	contenedorBotones: {
		flex: 2,
		justifyContent: "center",
		backgroundColor: "lightblue",
		flexDirection: "column",
	},
});
