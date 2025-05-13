class ArbolBinario {
    constructor() {
      this.raiz = null;
    }
  
    insertar(valor) {
      const nuevoNodo = new Nodo(valor);
      if (!this.raiz) {
        this.raiz = nuevoNodo;
        return;
      }
  
      let actual = this.raiz;
      while (true) {
        if (valor < actual.valor) {
          if (!actual.izquierda) {
            actual.izquierda = nuevoNodo;
            return;
          }
          actual = actual.izquierda;
        } else {
          if (!actual.derecha) {
            actual.derecha = nuevoNodo;
            return;
          }
          actual = actual.derecha;
        }
      }
    }

    preorden (nodo) {
        if (!nodo) return;
        console.log(nodo.valor);
        preorden(nodo.izquierda);
        preorden(nodo.derecha);
    }

    inorden (nodo) {
        if (!nodo) return;
        inorden(nodo.izquierda);
        console.log(nodo.valor);
        inorden(nodo.derecha);
    }

    postorden (nodo) {
        if (!nodo) return;
        postorden(nodo.izquierda);
        postorden(nodo.derecha);
        console.log(nodo.valor);
    }
  }
  