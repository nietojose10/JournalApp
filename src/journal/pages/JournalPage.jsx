import { Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
//import { MailOutline } from '@mui/icons-material';

export const JournalPage = () => {
  return (
    
    <JournalLayout>
      
      {/* <Typography>asdfasdfdsafdasfadssdfdsafdsfasdfasf </Typography> */}
      {/* <NothingSelectedView /> */}
      <NoteView />
    </JournalLayout>

    )
}
