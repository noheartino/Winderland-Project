import React, { useState, useEffect, useRef } from "react";
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'
import EventHeader from '@/components/event/event-header'
import EventHomeList from '@/components/event/eventHomeList'

import { useAuth } from '@/hooks/use-auth'
import { useRouter } from "next/router"
import Link from "next/link"

export default function ExpressApiPreview() {
    const [eventData, setData] = useState([])

    // user
    const Data = useAuth().auth
    const userData = Data.userData
    

    useEffect(() => {
        fetch('http://localhost:3005/api/event')
            .then(response => response.json())
            .then(eventData => setData(eventData))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <>
            <Nav />
            {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : 'Loading...'}
            <EventHeader/>
            <EventHomeList events={eventData} />
            <Footer/>
        </>
    );
}