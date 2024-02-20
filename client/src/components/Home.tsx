import React from 'react';
import { Container, Typography, TableBody, Table, TableHead, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import EventList from './EventList';

const Home: React.FC  = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h3">
                Dashboard
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Upcoming Events</TableCell>
                            <TableCell>Expired Events</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ verticalAlign: 'top' }}>
                                <EventList {...{ length: 7, getAll: false }} />
                            </TableCell>
                            <TableCell style={{ verticalAlign: 'top'}}>
                                <EventList {...{ length: -30, getAll: false }}/>
                            </TableCell>
                        </TableRow>
                    </TableBody> 
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Home;
