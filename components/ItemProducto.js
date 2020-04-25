import React, {Component} from "react";
import {Text, View, Button, Alert} from "react-native";
import {eliminarProductoFirebase} from "./../servicios/ServiciosProductos";
import {TouchableHighlight} from "react-native-gesture-handler";

export class ItemProducto extends Component {
  fnEliminarSucces = () => {
    console.log("Eliminado correcto");
  };

  fnEliminarError = () => {
    console.log("Eliminado correcto");
  };

  render() {
    const {prpNav, prpProducto} = this.props;

    return (<View>
      <TouchableHighlight onPress={() => {
          prpNav.navigate("formularioProductoScreem", {producto: prpProducto});
        }}>
        <View>
          <Text>{prpProducto.id}</Text>
          <Text>{prpProducto.nombre}</Text>
          <Button title="Eliminar" onPress={() => {
              eliminarProductoFirebase(prpProducto.id, this.fnEliminarSucces, this.fnEliminarError);
            }}/>
        </View>
      </TouchableHighlight>
    </View>);
  }
}
