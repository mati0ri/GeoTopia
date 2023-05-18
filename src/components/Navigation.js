import React from 'react';
import { NavLink } from 'react-router-dom';
//import jwt_decode from "jsonwebtoken";
import { useState, useEffect } from 'react';




const Navigation = () => {

    const [role, setRole] = useState(null);
    const accessToken = localStorage.getItem('accessToken');


    useEffect(() => {
        if (accessToken) {
            fetch('http://localhost:3001/api/user/current', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setRole(data.role);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de l\'utilisateur actuel:', error);
                });
        }
    }, []);




    return (
        <div className="navigation">
            <ul>
                <img src="./logo.png" alt="logo geotopia" className='logo' />

                {accessToken && (
                    <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>accueil</li>
                    </NavLink>
                )}
                {accessToken && (
                    <NavLink to="/quiz" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>quiz</li>
                    </NavLink>
                )}

                {accessToken && (
                    <NavLink to="/viewcountries" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>entrainement</li>
                    </NavLink>
                )}

                {accessToken && (
                    <NavLink to="/stats" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>stats</li>
                    </NavLink>
                )}

                {accessToken && (
                    <NavLink to="/proposition" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>participer</li>
                    </NavLink>
                )}

                {role === "admin" && (
                    <NavLink to="/admin" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>admin</li>
                    </NavLink>
                )}
            </ul>
        </div>
    );
};

export default Navigation;