import BinaryTree from './BinaryTree';
import arbol from './data.js';

export const App = () => (
  <div>
    <h1>Árbol Binario</h1>
    <BinaryTree root={arbol} />
  </div>
);
