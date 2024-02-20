import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios_server from '../util/axios_server';
import { Event } from './EventInterface';
import { toast } from 'react-toastify';

import { Link, Container, ListItem, Table, TableBody, TableCell, TableContainer, Button, TableHead, TableRow, Paper } from '@mui/material';

interface DateRange { 
    length: number;
    getAll: boolean;
}

const EventList: React.FC<DateRange> = (dateRange) => {
    const { length, getAll } = dateRange; 
    const [events, setEvents] = useState<Event[]>([]);
    const [ascendingOrder, setAscendingOrder] = useState(true);

    useEffect(() => {
        const currentDate: Date = new Date();
        const endDate: Date = new Date();
        endDate.setDate(endDate.getDate() + length);

        const fetchEvents = async () => {
            try {
                if (getAll) {
                    const response = await axios_server.get('/events');
                    setEvents(response.data);
                } else {
                    const request_string = 
                        length > 0 
                        ? `/events/${currentDate.toISOString()}/${endDate.toISOString()}`
                        : `/events/${endDate.toISOString()}/${currentDate.toISOString()}`
                    const response = await axios_server.get(request_string);
                    setEvents(response.data);
                }
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

    const deleteEvent = async (event: Event) => {
        try {
            const response = axios_server.delete(`/events/${event._id}`);
            toast.promise(response, {
                pending: 'Deleting Event ...',
                success: 'Deleted Event.',
                error: 'Something went wrong with deleting the event.',
            });
        } catch(error) {
            toast.error('Failed to delete event');
            console.error('Error fetching events:', error);
        }
    }

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
                        <TableCell> {/* formatting :) */}
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
                            <TableCell>
                                <Button variant="outlined" onClick={() => deleteEvent(event)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
} 

export default EventList;
