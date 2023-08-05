import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    //Cada vez que el estado del form cambie se volvera a llamar al createValidators
    useEffect(() => {
      
        createValidators();
        
    }, [ formState ]);

    useEffect(() => {
        setFormState( initialForm );
    }, [initialForm]);
    
    
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            //Se evalua el formValue en la propiedad formValue
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    },[ formValidation]);


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }
    //CreateValidators recorre un ciclo for por cada uno de los campos a validar y crea el formCheckedValues
    const createValidators = () => {

        const formCheckedValues = {};
        //Toma las llaves del objecto formValidations y las asigna a formfield
        for (const formField of Object.keys( formValidations )) {
            //Se desestructura el fn y el errorMessage de formValidations basado en el formField
            const [ fn, errorMessage = 'This field is required.' ] = formValidations[formField];
            //Aqui se arma el objecto apartir de claves y valores.
            //Lo que esta en backticks es como se crea la propieda a partir de concatenar el formfield y la palabra Valid.
            //Luego a esa propiedad se le asigna un valor a partir de un condicional ternario.
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;

        }

        setFormValidation( formCheckedValues );

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}