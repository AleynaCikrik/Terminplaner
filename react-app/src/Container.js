import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Header from './Header';
import { getAllAppointments, getAllUsers } from './functions/Firebase';
import Search from './Search';
import Planner from './Planner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from './AddUser';
import Home from './Home';


function Container() {
    const [appointments, setAppointments] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getAllAppointments().then(data => setAppointments(data))
        getAllUsers().then(data => setUserData(data))
    }, []);

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login userData={userData} />} />
                <Route path="/home" element={<Home  appointments={appointments} setAppointments={setAppointments} userData={userData}/>} />
                <Route path="/search" element={<Search userData={userData} appointments={appointments} />} />
                <Route path="/planner" element={<Planner appointments={appointments} setAppointments={setAppointments} userData={userData} />} />
                <Route path="/addUser" element={<AddUser userData={userData} setUserData={setUserData}/>} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="colored"
            />
        </div>
    );
}

export default Container;
