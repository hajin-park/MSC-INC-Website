import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, deleteObject, listAll } from 'firebase/storage';
import { storage, db } from '../firebase';

export default function CategoryManagement() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'categories'), snapshot => {
            setCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        // Clean up the listener when the component unmounts
        return unsubscribe;
    }, []);

    const handleNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleAdd = async () => {
        try {
            if (!categoryName) throw new Error('Category name is required');
            await addDoc(collection(db, 'categories'), { name: categoryName });
            setCategoryName('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (categoryId, categoryName) => {
        try {
            // Delete the category from Firestore
            await deleteDoc(doc(db, 'categories', categoryId));

            // Delete the files associated with the category from Storage
            const listRef = ref(storage, 'files/' + categoryName);
            const files = await listAll(listRef);
            files.items.forEach(fileRef => deleteObject(fileRef));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Category Management</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input type="text" value={categoryName} onChange={handleNameChange} placeholder="Category name" className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" />
            <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Category</button>
            {categories.map(category => (
                <div key={category.id}>
                    <p>{category.name}</p>
                    <button onClick={() => handleDelete(category.id, category.name)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">Delete</button>
                </div>
            ))}
        </div>
    );
}