import React, {Component} from "react";
import {StyleSheet, Text, View, Button, Alert} from "react-native";
import {Input} from "react-native-elements";
import {crearProducto} from "../servicios/ServiciosProductos";

export class FormularioProducto extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      nombre: "",
      precio: ""
    };
  }

  crearCorrecto = () => {
    console.log("creado con existo");
    this.setState({id: "", nombre: "", precio: ""});
  };
  crearError = error => {
    Alert.alert("Error", "Se ha presentado un error con el código:" + error.codigo + " , mensaje:" + error.message);
  };

  render() {
    return (<View style={styles.container}>
      <Text>FORMULARIO DE PROUDCTO</Text>
      <Input placeholder="Id" value={this.state.id} onChangeText={valor => {
          this.setState({id: valor});
        }}/>
      <Input placeholder="Nombre" value={this.state.nombre} onChangeText={valor => {
          this.setState({nombre: valor});
        }}/>
      <Input placeholder="Precio" value={this.state.precio} onChangeText={valor => {
          this.setState({precio: valor});
        }}/>

      <Button title="Guardar" onPress={() => {
          producto = {
            id: this.state.id,
            nombre: this.state.nombre,
            precio: this.state.precio
          };

          crearProducto(producto, this.crearCorrecto, this.crearError);
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
