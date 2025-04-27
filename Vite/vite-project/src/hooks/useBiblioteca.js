import { useContext } from 'react';
import { BibliotecaContext } from '../context/Biblioteca';

export const useBiblioteca = () => {
    const context = useContext(BibliotecaContext);

    if (!context) {
        throw new Error('useBiblioteca debe ser usado dentro de un BibliotecaProvider');
    }
    return context;
}