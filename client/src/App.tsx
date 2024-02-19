import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import 'react-toastify/dist/ReactToastify.css';
import Container from "@mui/material/Container";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ReactDom from "react-dom/client";
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from "./components/Layout";
import Home from './components/Home';
import EditEvent from './components/EditEvent';
import EventList from './components/EventList';

export default function App() {
    return (
        <Container maxWidth="sm">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="events" element={<EventList />} />
                        <Route path="events/add/" element={<EditEvent />} />
                        <Route path="events/edit/:id" element={<EditEvent />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ Container>
    );
}

const root = ReactDom.createRoot(document.getElementById('root')!);
root.render(<App />)
