import React, {Component} from "react";
import {View, Button, Alert} from "react-native";
import {Input} from "react-native-elements";
import {recuperarContrasenia} from "./../servicios/ServiciosLogin";

export class CambioClave extends Component {
  constructor() {
    super();
    this.state = {
      correoElectronico: ""
    };
  }

  onSucces = () => {
    Alert.alert("Ingrese a su correo para recuperar contrasenia");
  };

  onError = error => {
    Alert.alert("Error:" + error.message);
  };

  render() {
    return (<View>
      <Input placeholder="Ingrese el correo electronico" value={this.state.correoElectronico} onChangeText={valor => {
          this.setState({correoElectronico: valor});
        }}/>
      <Button title="Recuperar" onPress={() => {
          console.log("Recuperar");
          recuperarContrasenia(this.state.correoElectronico, this.onSucces, this.onError);
        }}/>
    </View>);
  }
}
