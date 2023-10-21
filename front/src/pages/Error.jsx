import React from "react";

import { NavLink } from 'react-router-dom';

function Error() {
    return (
        <main className="error">
            <p className='error-number'>404</p>
            <p className='error-text'>Oups! This page doesn't exist.</p>
            <NavLink to={'/'} className='error-nav'>Return to homepage</NavLink>
        </main>
    )
}

export default Error;
