import React, {Component} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ListaCompras} from "./screens/ListaCompras";
import {ListaProductos} from "./screens/ListaProductos";
import {Informacion} from "./screens/Informacion";
import {Login} from "./screens/Login";
import {DetalleCompra} from "./screens/DetalleCompra";
import {FormularioProducto} from "./screens/FormularioProducto";
import {Icon} from "react-native-elements";

import {createDrawerNavigator} from "@react-navigation/drawer";
import {Registro} from "./screens/Registro";
import {CambioClave} from "./screens/CambioClave";
import {cargarConfiguracion} from "./servicios/firebaseConfig";

import firebase from "firebase";
import {CerrarSesion} from "./screens/CerrarSesion";

import {YellowBox} from "react-native";

let navStack = createStackNavigator();
let NavTab = createBottomTabNavigator();
let NavDrawer = createDrawerNavigator();

function TabHome() {
  return (<NavTab.Navigator>
    <NavTab.Screen name="listaProductosScreem" component={ListaProductos} options={{
        tabBarLabel: "Productos",
        tabBarIcon: () => {
          <Icon name="cart" type="evilicon" color="#517fa4"/>;
        }
      }}/>
    <NavTab.Screen name="listaComprasScreem" component={ListaCompras} options={{
        tabBarLabel: "Compras",
        tabBarIcon: () => {
          <Icon name="cart" type="evilicon" color="#517fa4"/>;
        }
      }}/>
  </NavTab.Navigator>);
}

function Home() {
  return (<navStack.Navigator>
    <navStack.Screen name="tabHome" component={TabHome} options={{
        title: "Inicio"
      }}/>
    <navStack.Screen name="detalleCompra" component={DetalleCompra} options={{
        title: "Detalle Compra"
      }}/>
    <navStack.Screen name="formularioProductoScreem" component={FormularioProducto}/>
  </navStack.Navigator>);
}

export default class App extends Component {
  constructor() {
    super();
    YellowBox.ignoreWarnings(["componentWillReceiveProps"]);
    if (!global.estaConfigurado) {
      cargarConfiguracion();
    }
    this.state = {
      login: false
    };

    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario) {
        console.log("Usuario autenticado");
        this.setState({login: true});
      } else {
        console.log("Usuario no autenticado");
        this.setState({login: false});
      }
    });
  }

  autenticacion = () => {
    this.setState({login: true});
  };
  registro = () => {
    this.setState({login: true});
  };

  salir = () => {
    this.setState({login: false});
  };

  render() {
    return (<NavigationContainer>
      {
        this.state.login
          ? (<NavDrawer.Navigator initialRouteName="Inicio">
            <NavDrawer.Screen name="Inicio" component={Home}/>
            <NavDrawer.Screen name="Informacion" component={Informacion}/>
            <NavDrawer.Screen name="Cerrar Sesion" component={CerrarSesion}/>
          </NavDrawer.Navigator>)
          : (<navStack.Navigator>
            <navStack.Screen name="Login" options={{
                title: "Autenticación"
              }} component={Login}/>
            <navStack.Screen name="registroScreem" options={{
                title: "Registro"
              }} component={Registro}/>
            <navStack.Screen name="recuperarContraseniaScreem" options={{
                title: "Recuperar Contraseña"
              }} component={CambioClave}/>
          </navStack.Navigator>)
      }
    </NavigationContainer>);
  }
}
