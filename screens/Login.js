import React, {Component} from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import {NavigationContext} from "@react-navigation/native";
import {validarIngreso} from "./../servicios/ServiciosLogin";
import {Input} from "react-native-elements";

export class Login extends Component {
  static contextType = NavigationContext;

  constructor() {
    super();
    this.state = {
      correoElectronico: "",
      contrasenia: ""
    };
  }

  onSucces = () => {
    Alert.alert("Usuario Registrado Correctamente");
  };

  onError = error => {
    Alert.alert("Error:" + error.message);
  };

  render() {
    const navigation = this.context;
    return (<View style={styles.container}>
      <Text>Correo Electrónico</Text>
      <Input placeholder="Ingrese el correo electronico" value={this.state.correoElectronico} onChangeText={valor => {
          this.setState({correoElectronico: valor});
        }}/>
      <Text>Contraseña</Text>
      <Input placeholder="Ingrese el correo electronico" value={this.state.contrasenia} onChangeText={valor => {
          this.setState({contrasenia: valor});
        }}/>
      <Button title="Ingresar" onPress={() => {
          validarIngreso(this.state.correoElectronico, this.state.contrasenia, this.onSucces, this.onError);
        }}/>
      <Button title="Registrar" onPress={() => {
          navigation.navigate("registroScreem");
        }}/>
      <Button title="Recuperar Contraseña" onPress={() => {
          navigation.navigate("recuperarContraseniaScreem");
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
