import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Outlet } from 'react-router-dom';
import CategorySidebar from '../components/CategorySidebar';

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
        <div className="w-full min-h-full flex flex-grow pt-24">
            <CategorySidebar categories={categories}/>
            <Outlet />
        </div>
    );
}