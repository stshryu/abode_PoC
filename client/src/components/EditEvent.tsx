import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios_server from '../util/axios_server';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Event } from './EventInterface';
import { toast } from 'react-toastify';

import { Box, Typography, IconButton, TextField, Button, Grid, Paper, FormLabel } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const EditEvent:React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [date, setDate] = useState(new Date());
    const [event, setEvent] = useState<Event>({
        _id: "",
        name: "",
        description: "",
        eventDate: date,
        attendees: [""],
    });
    const [attendees, setAttendees] = useState<string[]>(event.attendees || [""]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios_server.get(`/events/${id}`);
                setEvent(response.data);
                response.data.attendees.length ? setAttendees(response.data.attendees) : setAttendees([""])
                setDate(response.data.eventDate); 
                updateName(response.data.name);
                updateDesc(response.data.description);
            } catch (error) {
                console.error('Error fetching events:', error);
                throw error;
            }
        };

        if (id) {
            fetchEvent();
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value! });
    };

    const updateName = (eventName: string) => {
        setEventName(eventName);
    }

    const updateDesc = (eventDesc: string) => {
        setEventDesc(eventDesc);
    }

    const handleAttendeeChange = (index: number, value: string) => {
        const newAttendees = [...attendees];
        newAttendees[index] = value;
        setAttendees(newAttendees);
    };

    const handleAddAttendee = () => {
        setAttendees([...attendees, '']);
    };

    const handleRemoveAttendee = (index: number) => {
        const newAttendees = [...attendees];
        newAttendees.splice(index, 1);
        setAttendees(newAttendees);
    };

    const handleDateChange = (selected_date: Date) => {
        const newDate = selected_date;
        setDate(newDate);
    }

    const handleDeleteEvent = (event: Event) => {
        try {
            const response = axios_server.delete(`/events/${id}`);
            toast.promise(response, {
                pending: 'Deleting Event ...',
                success: 'Deleted Event.',
                error: 'Something went wrong while deleting the event.',
            });
        } catch(error) {
            toast.error('Failed to delete event');
            console.error('Error deleting event:', error);
        }
        navigate('/events');
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        event.name = eventName;
        event.description = eventDesc;
        event.eventDate = date;
        event.attendees = attendees.filter((attendee) => attendee.trim() !== '')

        try {
            if (id) {
                const response = axios_server.put(`/events/${id}`, event);
                toast.promise(response, {
                    pending: 'Saving Event ...',
                    success: 'Saved!',
                    error: 'Something went wrong while saving event.',
                });
            } else {
                const response = axios_server.post('/events', event);
                toast.promise(response, {
                    pending: 'Updating Event ...',
                    success: 'Updated!',
                    error: 'Something went wrong while updating event.',
                });
            }
        } catch (error) {
            toast.error('Failed to save event');
            console.error('Error fetching events:', error);
        }
        navigate('/events');
    };

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            { event.name ? event.name : 'Create a New Event' }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Event Name"
                            variant="outlined"
                            value={eventName}
                            onChange={(e) => {updateName(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Event Description"
                            variant="outlined"
                            value={eventDesc}
                            onChange={(e) => {updateDesc(e.target.value)}}
                        /> 
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <FormLabel>Event Date</FormLabel>
                        </Grid>
                        <DatePicker 
                            selected={ new Date(date) }
                            onChange={handleDateChange}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </Grid>
                </Grid>

                <FormLabel>Event Attendees</FormLabel>
                { attendees.map((attendee, index) => (
                    <Grid container spacing={2} key={index}>
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                label={`Attendee ${index + 1}`}
                                variant="outlined"
                                value={attendee}
                                onChange={(e) => handleAttendeeChange(index, e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            {index === attendees.length - 1 && (
                                <IconButton onClick={handleAddAttendee}>
                                    <AddCircleOutline />
                                </IconButton>
                            )}
                            {index !== attendees.length - 1 && (
                                <IconButton onClick={() => handleRemoveAttendee(index)}>
                                    <RemoveCircleOutline />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>   
                ))}

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>

                <Grid container justifyContent='space-between'>
                    <Grid item xs={8}>
                        <Button type="submit" variant="contained" color="primary">
                            { id ? 'Update Event' : 'Add Event' }
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" color="warning" onClick={(e) => handleDeleteEvent(event)}>
                            Delete Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default EditEvent;
