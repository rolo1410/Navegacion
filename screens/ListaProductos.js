import React, {Component} from "react";
import {StyleSheet, Text, View, Button, Alert} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export class ListaProductos extends Component {
	render() {
		return <View style={styles.container}></View>;
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
