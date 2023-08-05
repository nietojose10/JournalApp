//Utilizamos thunks para todas aquellas funcionalidades que requieran trabajar de manera asincrona

import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {

    return async( dispatch, getState ) => {

        //para grabar en firebase necesitamos el uid
        //el getState es una funcion que nos muestra el estado actual de nuestra store 
        //console.log(getState());

        dispatch( savingNewNote() );
        
        const { uid } = getState().auth;


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //Al final se quiere conseguir un path como el siguiente:
        ///id-user-1/journal/notes/oznduGhSJDzRwjj0DFJ7
        //Esto con el objetivo de almacenar cada registro de manera correcta
        const newDoc = doc( collection( firebaseDB, `${ uid }/journal/notes` ) );
        //Si setDocResp fallara nos mostraria un error pero sino entonces todo bien
        //const setDocResp = await setDoc( newDoc, newNote );
        await setDoc( newDoc, newNote );

        //Creando la propiedad id a newNote y asignandole el ID del documento
        newNote.id = newDoc.id;

        //console.log({newDoc, setDocResp});

        // dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
        

    }

}


export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !uid ) throw new Error('El UID del usuario no esta definido.');

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    } 
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        ///MCGC9Q7NiHRMYnz1MzV1bPYZFWm1/journal/notes/6CI4X4MwQZ272KaUliDL
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        
        const noteToFireStore = { ...note };
        //Con esto se puede eliminar la propiedad de un objeto de Javascrip
        delete noteToFireStore.id;

        const docRef = doc( firebaseDB, `${ uid }/journal/notes/${ note.id }` );
        //El merge hace la union de los campos y se sustituiran por los nuevos.
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch( updateNote(note) );
    }
}

export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {
        dispatch( setSaving() );

        //await fileUpload( files[0] );
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) );

        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote(photosUrls) );

    }

}

export const startDeletingNote = () => {

    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( firebaseDB, `${ uid }/journal/notes/${ note.id }` );
        //Esta linea regresa un void por lo que no es necesario almacenarlo en ninguna variable
        await deleteDoc( docRef );

        console.log('Deleting a note');
        dispatch( deleteNoteById(note.id) );


    }

}