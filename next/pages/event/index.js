import { useEffect, useState } from 'react';
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'
import EventHeader from '@/components/event/event-header'
import EventHomeList from '@/components/event/eventHomeList';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';


export default function Eventindex() {
    const [eventData, setData] = useState([]);
    const authData = useAuth().auth
    const UserData = authData.userData
    const userlv = UserData ? UserData.member_level_id : 0

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
            {/* {userlv ? <pre>{JSON.stringify(userlv, null, 2)}</pre> : 'Loading...'} */}
            <EventHomeList events={eventData} userlv={userlv}/>
            <Footer/>
        </>
    );
}