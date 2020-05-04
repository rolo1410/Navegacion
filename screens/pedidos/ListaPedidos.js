import React, {Component} from "react";
import {StyleSheet, View, FlatList, Text} from "react-native";
import {ItemComprado} from "./../../components/ItemComprado";
import {
	registrarListenerCarritoCompras,
	eliminarCompra,
} from "../../servicios/ServiciosCarroCompras";
import {Button, Icon} from "react-native-elements";

export class ListaPedidos extends Component {
	constructor() {
		super();
		this.state = {
			lstPedidos: [],
			total: 0,
		};
	}

	pintarLista = lista => {
		let totalCalculado = 0;
		lista.forEach(item => {
			totalCalculado = parseInt(totalCalculado) + parseInt(item.subtotal);
		});
		this.setState({lstPedidos: lista, total: totalCalculado});
	};

	componentDidMount() {
		registrarListenerCarritoCompras(global.mailUsuario, this.pintarLista);
	}

	vaciarCarroCompras = listaPedidos => {
		for (let i = 0; i < lstPedidos.length; i++) {
			eliminarCompra(global.mailUsuario, lstPedidos[i].id);
		}
	};

	render() {
		return (
			<View>
				<Button
					icon={
						<Icon
							raised
							name="trash"
							type="font-awesome"
							color="#f50"
							onPress={() => this.vaciarCarroCompras(this.state.lstPedidos)}
						/>
					}
					title="Button with icon component"
				/>

				<Text style={{fonSize: 20}}>{this.state.total}</Text>
				<FlatList
					data={this.state.lstPedidos}
					renderItem={({item}) => {
						return (
							<ItemComprado
								prpProducto={item.producto}
								prpNav={this.props.navigation}
							/>
						);
					}}
					keyExtractor={pedido => {
						pedido.producto.id;
					}}
				/>
			</View>
		);
	}
}
