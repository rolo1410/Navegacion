export const crearProducto = (producto, fnOnsucces, fnOnError) => {
  /* Se crea la coleccion producots */
  /* si no crea el id resscribe o ide */
  /* set escribe completamente al nuevo objeto */
  global.firestoreDB.collection("productos").doc(producto.id).set(producto).then(() => {
    fnOnsucces();
  }).catch(error => {
    fnOnError(error);
  });
};
