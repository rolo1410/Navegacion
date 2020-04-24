import React, {Component} from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import {NavigationContext} from "@react-navigation/native";
import {validarIngreso, cerrarSession} from "./../servicios/ServiciosLogin";
import {Input} from "react-native-elements";
import {Alert} from "react-native";

export class CerrarSesion extends Component {
  static contextType = NavigationContext;

  constructor() {
    super();
    this.state = {
      correoElectronico: "",
      contrasenia: "     "
    };
  }

  onSucces = () => {
    Alert.alert("Session cerrada...");
  };

  onError = error => {
    Alert.alert("Error:" + error.message);
  };

  render() {
    const navigation = this.context;
    return (<View style={styles.container}>
      <Text>¿Está seguro de cerrar sesión?</Text>
      <Button title="Salir" onPress={() => {
          cerrarSession(this.onSucces, this.onError);
        }}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
