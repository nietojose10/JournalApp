import { collection, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../firebase/config';

export const loadNotes = async(  uid = '' ) => {
    if ( !uid ) throw new Error('El UID del usuario no esta definido.');

    //Si utilizamos la funcion de collection, debemos apuntar a una collection, de otra manera mostrara error.
    //Lo mismo aplica con la funcion de getDocs, debemos apuntar a un documento.
    const collectionRef = collection( firebaseDB, `${ uid }/journal/notes` );
    const docs = await getDocs(collectionRef);

    const notes = [];
    docs.forEach( 
        doc => {
            notes.push({ id: doc.id, ...doc.data() });
        }  
        );

    console.log( notes )
    return notes;

}