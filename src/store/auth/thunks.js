import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './';

//Aqui en los thunks estaran todas las tareas asincronas que tengamos que realizar en la aplicacion.
export const checkingAuthentication =  ( email, password ) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

    }

}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await singInWithGoogle();

        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        //delete result.ok //para eliminar la propiedad del ok
        dispatch( login( result ) );

    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {
        //este paso es para llamar a la funcion checkingcredentials y por el status como checking y bloquear los botones.
        dispatch( checkingCredentials() );
        
        //llamando a la funcion del proveedor
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if (!ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email , photoURL }) );

    }
 
}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        console.log({email, password});
        const result = await loginWithEmailPassword({email, password});

        console.log(result);

        if (!result.ok ) return dispatch( logout( result ) );

        console.log('Despachar la funcion login');
        dispatch( login(result) );

    }
}

export const startLogout = () => {

    return async( dispatch ) => {

        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );

    }

}