import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios_server from '../util/axios_server';
import { Event } from './EventInterface';

import { Link, Container, ListItem, Table, TableBody, TableCell, TableContainer, Button, TableHead, TableRow, Paper } from '@mui/material';

const EventList = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [ascendingOrder, setAscendingOrder] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios_server.get("/events");
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (event: Event) => {
        const date = new Date(event.eventDate);
        return date.getFullYear() + "/" 
            + date.getMonth() + "/" 
            + date.getDate() + " at " 
            + date.getHours() + ":" 
            + String(date.getMinutes()).padStart(2, "0"); 
    }

    const sortByDate = (a: Event, b: Event) => {
        const dateA = Number(new Date(a.eventDate));
        const dateB = Number(new Date(b.eventDate));

        if (ascendingOrder) {
            return dateA - dateB
        } else {
            return dateB - dateA
        }
    }

    const handleSort = () => {
        setAscendingOrder(!ascendingOrder);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>
                            <Button variant="outlined" onClick={handleSort}>
                                { ascendingOrder ? 'Sort Ascending' : 'Sort Descending' }
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { events.sort(sortByDate).map((event) => (
                        <TableRow key={event._id}>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{formatDate(event)}</TableCell>
                            <TableCell>
                                <Link component={RouterLink} to={`/events/edit/${event._id}`}>Edit</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        
    );
} 

export default EventList;
