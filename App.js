import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {ListaCompras} from "./screens/ListaCompras";
import {ListaProductos} from "./screens/ListaProductos";
import {FormularioProducto} from "./screens/FormularioProducto";

let navStack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<navStack.Navigator initialRouteName="listaComprasScreen">
				<navStack.Screen
					name="listaComprasScreen"
					component={ListaCompras}
					options={{title: "Lista de Compras"}}
				/>
				<navStack.Screen
					name="listaProductosScreen"
					component={ListaProductos}
					options={{title: "Lista de Productos"}}
				/>
				<navStack.Screen
					name="formularioProducto"
					component={FormularioProducto}
					options={{title: "Formulario Producto"}}
				/>
			</navStack.Navigator>
		</NavigationContainer>
	);
}
