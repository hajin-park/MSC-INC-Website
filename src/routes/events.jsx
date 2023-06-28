import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Outlet } from 'react-router-dom';
import CategorySidebar from '../components/EventPage/CategorySidebar';

export default function Events() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const docRef = doc(db, 'pages', 'eventCategories');
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setCategories(doc.data().categories);
        });
        
        return unsubscribe;
    }, []);

    return (
        <div className="w-full min-h-full flex-grow flex bg-zinc-50 pt-32">
            <CategorySidebar categories={categories}/>
            <Outlet />
        </div>
    );
}