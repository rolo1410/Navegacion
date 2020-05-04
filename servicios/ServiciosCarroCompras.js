export const agregarItemCarroCompraDeprecated = (
	mail,
	itemCompra,
	cantidadAumentar,
	fnOnsucces,
	fnOnError,
) => {
	global.firestoreDB
		.collection("carroCompras")
		.doc(mail)
		.collection("items")
		.doc(itemCompra.producto.id)
		.get()
		.then(respuesta => {
			console.log(respuesta.exists);
			if (respuesta.exists) {
				let cantidadActual = respuesta.data().cantidad;

				global.firestoreDB
					.collection("carroCompras")
					.doc(mail)
					.collection("items")
					.doc(itemCompra.producto.id + "")
					.update({
						cantidad: parseInt(cantidadActual) + parseInt(cantidadAumentar),
						subtotal:
							(parseInt(cantidadActual) + parseInt(cantidadAumentar)) *
							parseInt(itemCompra.producto.precio),
					})
					.then(() => {
						console.log("actualizado");
					})
					.catch();
			} else {
				itemCompra.subtotal = itemCompra.producto.precio;
				global.firestoreDB
					.collection("carroCompras")
					.doc(mail)
					.collection("items")
					.doc(itemCompra.producto.id)
					.set(itemCompra)
					.then(() => {
						console.log("creado");
					})
					.catch();
			}
		})
		.catch(error => {});
};

export const buscarCompra = (producto, lstProductos) => {
	let ban = false;
	for (let i = 0; i < lstProductos.length; i++) {
		if (lstProductos[i].id === producto.id) {
			return i;
		}
	}
};

export const actualizarCompra = (producto, lstProductos) => {
	let indice = buscarCompra(producto, lstProductos);
	if (-1 !== indice) {
		console.log(indice);
		lstProductos[indice] = producto;
	}
};

export const eliminarCompraFirebase = (email, idCompra, fnSucces, fnError) => {
	global.firestoreDB
		.collection("carroCompras")
		.doc(email)
		.collection("items")
		.doc(idCompra)
		.delete()
		.then(fnSucces)
		.catch(fnError);
};

export const eliminarCompra = (producto, lstProductos) => {
	let indice = buscarCompra(producto, lstProductos);
	if (-1 !== indice) {
		lstProductos.splice(indice, 1);
	}
};

export const registrarListenerCarritoCompras = (
	email,
	actualizarListaCarroCompras,
) => {
	let lstProductos = [];
	global.firestoreDB
		.collection("carroCompras")
		.doc(email)
		.collection("items")
		.onSnapshot(snapShotCambio => {
			let cambios = snapShotCambio.docChanges();

			cambios.forEach(cambio => {
				if ("added" === cambio.type) {
					lstProductos.push(cambio.doc.data());
				} else if ("modified" === cambio.type) {
					actualizarCompra(cambio.doc.data(), lstProductos);
				} else if ("removed" === cambio.type) {
					eliminarCompra(cambio.doc.data(), lstProductos);
				}
			});

			actualizarListaCarroCompras(lstProductos);
		});
};

export const agregarItemCarroCompra = async (
	mail,
	itemCompra,
	cantidadAumentar,
	fnOnsucces,
	fnOnError,
) => {
	try {
		let respuesta = await global.firestoreDB
			.collection("carroCompras")
			.doc(mail)
			.collection("items")
			.doc(itemCompra.producto.id)
			.get();

		if (respuesta.exists) {
			let cantidadActual = respuesta.data().cantidad;

			let actualiado = global.firestoreDB
				.collection("carroCompras")
				.doc(mail)
				.collection("items")
				.doc(itemCompra.producto.id + "")
				.update({
					cantidad: parseInt(cantidadActual) + parseInt(cantidadAumentar),
					subtotal:
						(parseInt(cantidadActual) + parseInt(cantidadAumentar)) *
						parseInt(itemCompra.producto.precio),
				});
		} else {
			itemCompra.subtotal = itemCompra.producto.precio;
			let respuesta = global.firestoreDB
				.collection("carroCompras")
				.doc(mail)
				.collection("items")
				.doc(itemCompra.producto.id)
				.set(itemCompra);
		}
	} catch (error) {
		console.log("error", error);
	}
};
