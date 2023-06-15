import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function HomeManagement() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        const listRef = ref(storage, "homePage");
        const files = await listAll(listRef);
        const fileURLs = await Promise.all(files.items.map(fileRef => getDownloadURL(fileRef)));
        setFiles(fileURLs.map((url, index) => ({ url, name: files.items[index].name })));
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        try {
            if (!selectedFile) throw new Error('No file selected');

            setStatus("loading")
            const fileRef = ref(storage, `homePage/${selectedFile.name}`);
            await uploadBytes(fileRef, selectedFile);
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
            const fileRef = ref(storage, `homePage/${fileName}`);
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
            {status === 'success' && <p className="text-green-500">Home page updated successfully!</p>}
            {!['loading', 'success', 'c'].includes(status) && <p className="text-red-500">{status}</p>}

            <form onSubmit={handleUpload} className="mb-4">
                <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFileChange} className="mb-2" />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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
