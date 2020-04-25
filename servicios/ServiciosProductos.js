import {Alert} from "react-native";

/**
 * Crea un producto en firebase
 * @param {Producto} producto
 * @param {*} fnOnsucces
 * @param {*} fnOnError
 */
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

export const buscarProducto = (producto, lstProductos) => {
  let ban = false;
  for (let i = 0; i < lstProductos.length; i++) {
    if (lstProductos[i].id === producto.id) {
      return i;
    }
  }

  return -1;
};

export const actualizarProducto = (producto, lstProductos) => {
  let indice = buscarProducto(producto, lstProductos);
  if (-1 !== indice) {
    console.log(indice);
    lstProductos[indice] = producto;
  }
};

export const eliminarProductoFirebase = (id, fnSucces, fnError) => {
  global.firestoreDB.collection("productos").doc(id).delete().then(fnSucces).catch(fnError);
};

export const eliminarProducto = (producto, lstProductos) => {
  let indice = buscarProducto(producto, lstProductos);
  if (-1 !== indice) {
    lstProductos.splice(indice, 1);
  }
};

/**
 * Se puede levantar sobre coleccion o sobre documento
 */
export const registrarListener = pintarLista => {
  let lstProductos = [];

  global.firestoreDB.collection("productos").onSnapshot(snapShotCambio => {
    console.log("Se disparó un evento el productos");
    /* retorna un arrego le cambios */
    let cambios = snapShotCambio.docChanges();

    cambios.forEach(cambio => {
      console.log("tipo de cambio->" + cambio.type);
      if ("added" === cambio.type) {
        console.log("se ha identificado una agregacion");
        lstProductos.push(cambio.doc.data());
      } else if ("modified" === cambio.type) {
        console.log("se ha identificado una actualizacion");
        actualizarProducto(cambio.doc.data(), lstProductos);
      } else if ("removed" === cambio.type) {
        console.log("se ha identificado una eliminacion");
        eliminarProducto(cambio.doc.data(), lstProductos);
      }
    });

    pintarLista(lstProductos);
  });
};

/**
 *
 */
export const obterProductos = (producto, fnOnsucces, fnOnError) => {
  /* Se crea la coleccion producots */
  /* si no crea el id resscribe o ide */
  /* set escribe completamente al nuevo objeto */
  global.firestoreDB.collection("productos").doc(producto.id).set(producto).then(() => {
    fnOnsucces();
  }).catch(error => {
    fnOnError(error);
  });
};

export const actualizarProductoDB = (producto, fnSucces, fnError) => {
  global.firestoreDB.collection("productos").doc(producto.id).update(producto).then(fnSucces, fnError);
};
