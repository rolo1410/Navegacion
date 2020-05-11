import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { ItemCompra } from "../../components/ItemCompra";
import { registrarListener } from "../../servicios/ServiciosProductos";

export class ListaCompras extends Component {
  constructor() {
    super();

    this.state = {
      lstProductos: []
    };
  }

  pintarLista = lista => {
    this.setState({ lstProductos: lista });
  };

  componentDidMount() {
    registrarListener(this.pintarLista);
  }
  render() {
    return (<View style={styles.container}>
      <FlatList data={this.state.lstProductos} renderItem={({ item }) => {
        return (<ItemCompra prpProducto={item} prpNav={this.props.navigation} />);
      }} keyExtractor={producto => producto.id + ""} />

      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor="#89CB8A" title="Mis Pedidos" onPress={() => {
          this.props.navigation.navigate("ListaPedidosScreem");
        }}>
          <Icon name="md-create" />
        </ActionButton.Item>
      </ActionButton>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFEC75",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 2

  },


});
