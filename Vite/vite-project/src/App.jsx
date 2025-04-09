import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmail, signInWithGoogle, signOut } from './store/slices/authSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleEmailSignIn = () => {
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');
    dispatch(signInWithEmail({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div>
      <h1>Autenticación con Firebase</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {user ? (
        <div>
          <p>Bienvenido, {user.displayName || user.email}</p>
          <button onClick={handleSignOut}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <p>No has iniciado sesión</p>
          <button onClick={handleEmailSignIn}>Iniciar sesión con Email</button>
          <button onClick={handleGoogleSignIn}>Iniciar sesión con Google</button>
        </div>
      )}
    </div>
  );
}

export default App;