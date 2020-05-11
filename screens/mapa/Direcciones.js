import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { ItemDireccion } from "./ItemDireccion"
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
import { obtenerDirecciones } from "../../servicios/ServicioDirecciones";

export class Direcciones extends Component {
    constructor() {
        super();

        this.state = {
            lstDirecciones: [],
        }
    }


    componentDidMount() {
        obtenerDirecciones(global.mailUsuario, this.repintarElementos);
    }


    repintarElementos = (direcciones) => {
        console.log("repintando elementos")
        this.setState({ lstDirecciones: direcciones });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.lstDirecciones.length === 0 ? (<Text>Sin registros</Text>) : (<FlatList
                    data={this.state.lstDirecciones}
                    renderItem={({ item }) => { return (<ItemDireccion direccion={item} fnNavegacion={this.props.navigation} repintarElementos={this.repintarElementos} ></ItemDireccion>) }}
                    keyExtractor={item => item.id}
                />)}


                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#1abc9c' title="Nueva Direccion" onPress={() => { this.props.navigation.navigate("DireccionScreem"); }}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item buttonColor='#1abc9c' title="Todos" onPress={() => { obtenerDirecciones(global.mailUsuario, false, this.repintarElementos); }}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>


                    <ActionButton.Item buttonColor='#1abc9c' title="Vigentes" onPress={() => {
                        obtenerDirecciones(global.mailUsuario, true, this.repintarElementos);
                    }}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }, container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FFEC75",
        alignItems: "stretch",
        justifyContent: "center",
        padding: 2

    },
});