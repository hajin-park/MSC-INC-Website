import { useState, useEffect } from 'react';
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from 'firebase/storage';
import { doc, onSnapshot } from 'firebase/firestore';
import { storage, db } from '../firebase';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function FileManagement() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const docRef = doc(db, 'pages', 'eventCategories');
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setCategories(doc.data().categories);
        });
    
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchFiles();
        }
    }, [selectedCategory]);

    const fetchFiles = async () => {
        const listRef = ref(storage, selectedCategory);
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

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            if (!selectedFile) throw new Error('No file selected');
            if (!selectedCategory) throw new Error('No category selected');
            
            setStatus('loading');
            const storageRef = ref(storage, `${selectedCategory}/${selectedFile.name}`);
            await uploadBytes(storageRef, selectedFile);
            setSelectedFile(null); // Reset the selected file
            fetchFiles(); // Fetch the updated list of files
            setStatus("success")
        } catch (error) {
            setStatus(error.message);
        }
    };

    const handleDelete = async (fileName) => {
        try {
            setStatus('loading');
            const fileRef = ref(storage, selectedCategory + '/' + fileName);
            await deleteObject(fileRef);
            fetchFiles(); // Fetch the updated list of files
            setStatus("success")
        } catch (error) {
            setStatus(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            {status === 'loading' && <p className="text-blue-500">Loading...</p>}
            {status === 'success' && <p className="text-green-500">Category file updated successfully!</p>}
            {!['loading', 'success', 'c'].includes(status) && <p className="text-red-500">{status}</p>}

            <select value={selectedCategory} onChange={handleCategoryChange} className="border-custom-text bg-custom-background h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-grow">
                <option value="">Select a category</option>
                {Object.entries(categories).map(([name, category]) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <form onSubmit={handleUpload} className="mb-4">
                <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFileChange} className="mb-2" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Upload Image
                </button>
            </form>

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