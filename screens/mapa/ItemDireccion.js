import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from 'react-native-elements'
import { eliminarDireccion } from "../../servicios/ServicioDirecciones";

export class ItemDireccion extends Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {


        let { id, direccion, latitude, longitude, vigente } = this.props.direccion;


        let fnNavegacion = this.props.fnNavegacion;
        return (<View>
            <View style={(vigente === "NV") ? styles.noViegente : styles.vigente}>
                <Text>Direccion: {direccion}</Text>
                <Text>{latitude}</Text>
                <Text>{longitude}</Text>
                <Text>{vigente}</Text>
            </View>
            <View>
                <Icon
                    raised
                    name='trash'
                    type='font-awesome'
                    color='#f50'
                    onPress={() => { eliminarDireccion(id, global.mailUsuario, this.props.repintarElementos) }} />
                <Icon
                    raised
                    name='edit'
                    type='font-awesome'
                    color='#f50'
                    onPress={() => {
                        fnNavegacion.navigate("DireccionScreem");
                    }} />
            </View>
        </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    vigente: { backgroundColor: "blue" },
    noViegente: { backgroundColor: "red" }
});