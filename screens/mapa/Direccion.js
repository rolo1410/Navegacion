import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import { crearActualizarDireccionBD } from "./../../servicios/ServicioDirecciones";
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

export class Direccion extends Component {

    constructor() {
        super();

        Geocoder.init("AIzaSyDM1ixoT25NBGqgvDnTSC0Z0sSDaOB_zWs")
        this.state = {
            latitude: -0.3084919,
            longitude: -78.5520939,
            latitudeDelta: 0.001,
            longitudeDelta: 0.002, direccion: "",
        };
    }

    componentDidMount() {
        this.obtenerPosicionActual();
    }

    obtenerPosicionActual = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Error al otorgar el permiso");
        }

        let location = await Location.getCurrentPositionAsync({});
        if (location) {
            this.setState({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                direccion: ""
            });
        }
        console.log(location);
    };



    fnOnSucces = () => {
        console.log("Acreado exito");
    }
    fnOnError = (error) => { console.log("error", error.message); }
    render() {
        return (<View><Text>{this.state.direccion}</Text>
            <Button title="Guardar" onPress={() => {
                crearActualizarDireccionBD({ latitude: this.state.latitude, longitude: this.state.longitude, direccion: this.state.direccion, vigente: "V" }, global.mailUsuario, this.fnOnSucces, this.fnOnError);
            }}></Button>
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    latitude: this.latitude,
                    longitude: this.longitude,
                    latitudeDelta: this.latitudeDelta,
                    longitudeDelta: this.longitudeDelta,
                }}
                onRegionChange={region => {
                    this.setState({
                        latitude: region.latitude,
                        longitude: region.longitude,
                    });
                }}
                onRegionChangeComplete={async region => {

                    let direccion = await Geocoder.from(
                        region.latitude,
                        region.longitude,
                    );
                    if (direccion && direccion.results) {
                        console.log(direccion.results[0].formatted_address);
                        this.setState({ direccion: direccion.results[0].formatted_address });
                    }
                }}
            ><View>
                    <Marker
                        coordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        }}
                    ></Marker>
                </View>
            </MapView>

        </View >)
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 10,
    },
});