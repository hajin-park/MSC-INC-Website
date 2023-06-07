import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Outlet } from 'react-router-dom';
import CategorySidebar from '../components/CategorySidebar';

export default function Events() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoryData = await getDocs(collection(db, 'categories'));
            setCategories(categoryData.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchCategories();
    }, []);

    return (
        <div className="flex">
            <CategorySidebar categories={categories}/>
            <Outlet />
        </div>
    );
}