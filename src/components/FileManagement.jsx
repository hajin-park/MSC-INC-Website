import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from 'firebase/storage';
import { collection, onSnapshot } from 'firebase/firestore';
import { storage, db } from '../firebase';
import { TrashIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

export default function FileManagement() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'categories'), snapshot => {
            setCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        // Clean up the listener when the component unmounts
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchFiles();
        }
    }, [selectedCategory]);

    const fetchFiles = async () => {
        const listRef = ref(storage, 'files/' + selectedCategory);
        const files = await listAll(listRef);
        const fileURLs = await Promise.all(files.items.map(fileRef => getDownloadURL(fileRef)));
        setFiles(fileURLs.map((url, index) => ({ url, name: files.items[index].name })));
    };
    
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleUpload = async () => {
        try {
            if (!selectedFile) throw new Error('No file selected');
            if (!selectedCategory) throw new Error('No category selected');

            const storageRef = ref(storage, 'files/' + selectedCategory + '/' + selectedFile.name);
            await uploadBytes(storageRef, selectedFile);
            setSelectedFile(null); // Reset the selected file
            fetchFiles(); // Fetch the updated list of files
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (fileName) => {
        try {
            const fileRef = ref(storage, 'files/' + selectedCategory + '/' + fileName);
            await deleteObject(fileRef);
            fetchFiles(); // Fetch the updated list of files
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-custom-background p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-custom-text">File Management</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center">
                <select value={selectedCategory} onChange={handleCategoryChange} className="border-custom-text bg-custom-background h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-grow">
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <input type="file" onChange={handleFileChange} className="mt-4 ml-4" />
                <button onClick={handleUpload} className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-custom-background bg-custom-primary hover:bg-custom-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-primary">
                    <DocumentCheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Upload
                </button>
            </div>
            {files.map((file, index) => (
                <div key={index} className="flex items-center mt-4">
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-custom-text flex-grow">{file.name}</a>
                    <button onClick={() => handleDelete(file.name)} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
