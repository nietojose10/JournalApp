import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        //Dispatch siempre se llama cuando queramos actualizar el estado del store, ya que el store llama a su reducer y guarda el nuevo valor del estado.
        dispatch(setActiveNote({ title, body, id, date, imageUrls }));
    }       

    const newTitle = useMemo( () => {
        return title.length > 17
                ? title.substring(0,17) + '...'
                : title;
    }, [ title ]);

  return (
    
    <ListItem  disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>

                <ListItemText primary={ newTitle }/>
                <ListItemText secondary={ body }/>

            </Grid>
        </ListItemButton>
    </ListItem>

  )
}
