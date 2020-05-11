export const crearActualizarDireccionBD = async (
	direccion,
	correoElectronico,
	fnOnSucces,
	fnOnError,
) => {
	try {

		let respuesta = await global.firestoreDB
			.collection("direcciones")
			.doc(correoElectronico)
			.collection("puntos")
			.doc(direccion.id + "").get()


		if (respuesta.exists) {
		} else {
			let documento = await global.firestoreDB
				.collection("direcciones")
				.doc(correoElectronico).collection("puntos").doc().set({ direccion });

		}
	} catch (error) {
		console.log("error", error);
	}
};





export const obtenerDirecciones = async (correoElectronico, vigentes, fnCargarLista) => {

	const direcciones = [];
	let respuesta = await global.firestoreDB
		.collection("direcciones")
		.doc(correoElectronico)
		.collection("puntos").get();
	console.log("error", vigentes);
	respuesta.docs.forEach(doc => {
		doc.data().id = doc.id;
		let direccion = doc.data();
		direccion.direccion.id = doc.id;

		direccion.direccion.vigente = (direccion.vigente !== "NV") ? "V" : direccion.vigente;
		if (vigentes) {

			if (direccion.vigente !== "NV") {

				direcciones.push(direccion.direccion);
			}
		} else {
			direcciones.push(direccion.direccion);

		}
	});

	/**/
	fnCargarLista(direcciones);
}

export const eliminarDireccion = async (idDireccion, correoElectronico, pintarLista) => {
	console.log(correoElectronico);
	respuesta = await global.firestoreDB
		.collection("direcciones")
		.doc(correoElectronico)
		.collection("puntos").doc(idDireccion).update({ vigente: "NV" });





	obtenerDirecciones(correoElectronico, true, pintarLista);
}


