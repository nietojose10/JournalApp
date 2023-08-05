import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {

  const status = useCheckAuth();

  if ( status === 'checking' ){
    return <CheckingAuth />;
  }

  return (
    //Aqui se contralan las rutas para que cuando ya estamos logueados, no podamos acceder a la ruta de login.
    <Routes>

        {
          (status === 'authenticated')
          ? <Route path="/*" element={ <JournalRoutes /> } />
          : <Route path="/auth/*" element={ <AuthRoutes /> } />
        }

        <Route path='/*' element={ <Navigate to='/auth/login'/> }/>

        {/* Login y Registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

        {/*JournalApp*/}
        {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

    </Routes>
  )
}
