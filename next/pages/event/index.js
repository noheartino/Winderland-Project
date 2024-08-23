import { useEffect, useState } from 'react';
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'
import EventHeader from '@/components/event/event-header'
import EventHomeList from '@/components/event/eventHomeList';


export default function ExpressApiPreview() {
    const [eventData, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3005/api/event')
            .then(response => response.json())
            .then(eventData => setData(eventData))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <>
            <Nav />
            <EventHeader/>
            {/* {eventData ? <pre>{JSON.stringify(eventData.applyon, null, 2)}</pre> : 'Loading...'} */}
            <EventHomeList events={eventData} />
            <Footer/>
        </>
    );
}