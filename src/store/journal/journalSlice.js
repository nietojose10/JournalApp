import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({

    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], //https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // }
    
    },
    //Todo lo que se coloca en los reducers tiene que ser funciones sincronas
    //Como se utiliza el redux toolkit, podemos agregar codigo mutante y no pasa nada ya que esta herramienta se encarga
    //de manejar el estado
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state, action ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            
            state.notes = state.notes.map( note => {
                //Dentro del map llevara llaves solo si tiene la palabra return de otra manera se utilizara parentesis que indica que tiene un return implicito
                //Se utiliza el return implicito siempre que devuelva una linea el map        
                if ( note.id === action.payload.id ){
                    return action.payload;
                }
                return note;

            } );
            
            //Los reducers no deben de disparar funciones de librerias de terceros
            //No se puede disparar el sweetalert aqui
            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
        },
        // con el state.active.imageUrls preservamos las imagenes que ya tenemos y con el action.payload agregamos las nuevas imagenes que agreguemos.
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },

        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        deleteNoteById: ( state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( (note) => note.id !== action.payload );
        },
    }

});

export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, setPhotosToActiveNote, clearNotesLogout } = journalSlice.actions;