import { Outlet, Link as RouterLink } from "react-router-dom";
import { List, ListItem, Link, Stack } from '@mui/material';

const Layout = () => {
    return (
        <>
            <nav>
                <List component={Stack} direction="row"  sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem>
                        <Link component={RouterLink} variant="body2" to="/" underline="none">
                            Home
                        </Link> 
                    </ListItem>
                    <ListItem>
                        <Link component={RouterLink} variant="body2" to="/events" underline="none" state={{ length: 30 }}>
                            Events 
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link component={RouterLink} variant="body2" to="/events/add" underline="none">
                            Create New Event 
                        </Link>
                    </ListItem>
                </List>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;
