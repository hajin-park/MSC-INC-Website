import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, deleteObject, listAll } from 'firebase/storage';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
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
        <div className="bg-custom-background p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-custom-text">Category Management</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center">
                <input type="text" value={categoryName} onChange={handleNameChange} placeholder="Category name" className="border-custom-text bg-custom-background h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-grow" />
                <button onClick={handleAdd} className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-custom-background bg-custom-primary hover:bg-custom-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-primary">
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Add Category
                </button>
            </div>
            {categories.map(category => (
                <div key={category.id} className="flex items-center mt-4">
                    <p className="text-custom-text flex-grow">{category.name}</p>
                    <button onClick={() => handleDelete(category.id, category.name)} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}