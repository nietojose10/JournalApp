import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"

export const SideBar = ({ drawerWidth = 240 }) => {
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
                    Jose Nieto
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['January','February','March','April'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot/>
                                </ListItemIcon>
                                <Grid container>

                                    <ListItemText primary={ text }/>
                                    <ListItemText secondary={ 'This is a text for test the sidebar' }/>

                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
