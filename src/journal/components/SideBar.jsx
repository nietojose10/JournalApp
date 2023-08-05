import { NotesTwoTone, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 240 }) => {
  
    const { displayName } = useSelector( state => state.auth);
    const { notes } = useSelector( state => state.journal);

    

    return (
    
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >

        <Drawer
            variant='permanent' //temporary whether we want to hide it or now
            open //if we have to a property which it will always true, we can skip declare it as true and just set the property e.g. open={ true } => open.
            sx={{ 
                display: {xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } 
            }}
        >
            {/* we must add some code in order to show the sidebar otherwise we won't see the sidebar */}
            {/* we must add the sidebar component into the main file */}
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    notes.map( note => (
                        <SideBarItem key={ note.id } { ...note }/>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
