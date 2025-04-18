import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';

const useCollection = (table) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Obtener todos los documentos
  const getAll = async (condition) => {
    setError(null);
    setIsPending(true);
    setResults([]);

    try {
      let q;

      if (condition && condition.length === 3) {
        q = query(
          collection(db, table),
          where(condition[0], condition[1], condition[2])
        );
      } else {
        q = query(collection(db, table));
      }

      const resDoc = await getDocs(q);

      const docs = resDoc.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setResults(docs);
      setIsPending(false);
      return docs;
    } catch (err) {
      console.error(err.message);
      setError('Error al obtener los documentos');
      setIsPending(false);
      return [];
    }
  };

  // Agregar un nuevo documento
  const add = async (docData) => {
    setError(null);
    setIsPending(true);

    try {
      const resDoc = await addDoc(collection(db, table), docData);
      console.log('Document ID:', resDoc.id);
      setIsPending(false);
      return resDoc;
    } catch (err) {
      console.error(err.message);
      setError('No se pudo agregar el documento');
      setIsPending(false);
      return null;
    }
  };

  // Actualizar un documento
  const update = async (id, updatedData) => {
    setError(null);
    setIsPending(true);

    try {
      const docRef = doc(db, table, id);
      await updateDoc(docRef, updatedData);
      console.log(`Documento con ID ${id} actualizado`);
      setIsPending(false);
    } catch (err) {
      console.error(err.message);
      setError('No se pudo actualizar el documento');
      setIsPending(false);
    }
  };

  // Eliminar un documento
  const remove = async (id) => {
    setError(null);
    setIsPending(true);

    try {
      const docRef = doc(db, table, id);
      await deleteDoc(docRef);
      console.log(`Documento con ID ${id} eliminado`);
      setIsPending(false);
    } catch (err) {
      console.error(err.message);
      setError('No se pudo eliminar el documento');
      setIsPending(false);
    }
  };

  return { error, isPending, results, add, getAll, update, remove };
};

export default useCollection;