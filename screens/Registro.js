import React, {Component} from "react";
import {StyleSheet, Text, View, Button, Alert} from "react-native";
import {Input} from "react-native-elements";
import {registrarUsuario} from "../servicios/ServiciosLogin";

export class Registro extends Component {
  constructor() {
    super();
    this.state = {
      correoElectronico: "",
      contrasenia: ""
    };
  }

  irLogin = () => {
    console.log("irLogin->");
    this.props.navigation.goBack();
  };

  render() {
    return (<View style={styles.container}>
      <Input placeholder="Correo Electrónico" value={this.state.correoElectronico} onChangeText={valor => {
          this.setState({correoElectronico: valor});
        }}/>
      <Input placeholder="Contraseña" secureTextEntry={true} value={this.state.contrasenia} onChangeText={valor => {
          this.setState({contrasenia: valor});
        }}/>
      <Button title="Enviar" onPress={() => {
          registrarUsuario(this.state.correoElectronico, this.state.contrasenia, this.irLogin);
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
