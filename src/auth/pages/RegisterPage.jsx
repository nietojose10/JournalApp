import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'Email must have an @.'],
  password: [ (value) => value.length >= 6, 'Password must be higher than 6 letters.'],
  displayName: [ (value) => value.length >= 6, 'Name is a must.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  //hook para tomar el state
  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  const { formState, displayName, email, password, onInputChange, 
          isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);

  

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  return (
    <AuthLayout title="Register">
      
      {/* <h1>Form Valid { isFormValid ? 'Valido' : 'Incorrecto' }</h1> */}
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn">
          <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Full Name"
              type="text"
              placeholder="Full Name"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted }//La doble negacion lo convierte en un valor boolean
              helperText={ displayNameValid }
              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Email"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted }//La doble negacion lo convierte en un valor boolean
              helperText={ emailValid }
              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Password"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted }//La doble negacion lo convierte en un valor boolean
              helperText={ passwordValid }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none'}>
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={ 12 }>
                <Button 
                disabled={ isCheckingAuthentication }
                type="submit"
                variant='contained' 
                fullWidth>
                  Sign up
                </Button>
              </Grid>
                 
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color="inherit" to="/auth/login">
              Ingresar
              </Link>
              
            </Grid>

          </Grid>
        </form>

    </AuthLayout>
        
      
  )
}
