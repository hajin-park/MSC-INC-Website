import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from 'firebase/storage';
import { collection, onSnapshot } from 'firebase/firestore';
import { storage, db } from '../firebase';

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
        <div>
            <h2 className="text-2xl font-bold mb-4">File Management</h2>
            {error && <p className="text-red-500">{error}</p>}
            <select value={selectedCategory} onChange={handleCategoryChange} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none">
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                ))}
            </select>
            <input type="file" onChange={handleFileChange} className="mt-4" />
            <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Upload</button>
            {files.map((file, index) => (
                <div key={index}>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                    <button onClick={() => handleDelete(file.name)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">Delete</button>
                </div>
            ))}
        </div>
    );
}
