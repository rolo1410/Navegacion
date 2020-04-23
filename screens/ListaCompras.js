import React, {Component} from "react";
import {StyleSheet, Text, View, Button} from "react-native";

export class ListaCompras extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>LISTA DE COMPRAS</Text>
				<Button
					title="Detalle Compras"
					onPress={() => {
						this.props.navigation.navigate("detalleComprasScreen");
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
