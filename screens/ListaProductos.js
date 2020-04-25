import React, {Component} from "react";
import {StyleSheet, View, FlatList} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import {ItemProducto} from "../components/ItemProducto";
import {registrarListener} from "../servicios/ServiciosProductos";

export class ListaProductos extends Component {
  constructor() {
    super();

    this.state = {
      lstProductos: []
    };
  }

  pintarLista = lista => {
    this.setState({lstProductos: lista});
  };

  componentDidMount() {
    registrarListener(this.pintarLista);
  }
  render() {
    return (<View style={styles.container}>
      <FlatList data={this.state.lstProductos} renderItem={({item}) => {
          return (<ItemProducto prpProducto={item} prpNav={this.props.navigation}/>);
        }} keyExtractor={producto => producto.id + ""}/>

      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor="#9b59b6" title="Nuevo Producto" onPress={() => {
            this.props.navigation.navigate("formularioProductoScreem");
          }}>
          <Icon name="md-create" style={styles.actionButtonIcon}/>
        </ActionButton.Item>
      </ActionButton>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
