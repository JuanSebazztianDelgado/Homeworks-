import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirebaseData, addDataToFirebase } from "../store/slices/realtimeDatabaseSlice";

const DataComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.realtimeDatabase);

  useEffect(() => {
    dispatch(fetchFirebaseData());
  }, [dispatch]);

  const handleAddData = () => {
    const newData = { name: "Nuevo Dato", value: Math.random() };
    dispatch(addDataToFirebase(newData));
  };

  return (
    <div>
      <h2>Datos en Firebase</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {data.length === 0 ? (
        <p>No hay datos disponibles.</p>
      ) : (
        data.map((item, index) => (
          <p key={index}>
            {item.name}: {item.value}
          </p>
        ))
      )}
      <button onClick={handleAddData}>Agregar Dato</button>
    </div>
  );
};

export default DataComponent;