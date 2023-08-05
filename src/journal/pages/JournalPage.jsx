import { IconButton, Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { savingNewNote, startLoadingNotes, startNewNote } from '../../store/journal';
//import { MailOutline } from '@mui/icons-material';

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal );
  
  //dispatch( startLoadingNotes() );

  const onClickNewNote = () => {

    dispatch( startNewNote() );
    dispatch( savingNewNote( true ) );

  }

  return (
    
    <JournalLayout>
      
      {/* <Typography>asdfasdfdsafdasfadssdfdsafdsfasdfasf </Typography> */}
      

      
      {
        (!!active) ? <NoteView /> : <NothingSelectedView />
      }
      

      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSaving }
        size='large'
        sx={{
          color:'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JournalLayout>

    )
}
