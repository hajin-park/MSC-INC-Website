import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export default function CategoryDisplay() {
    const { categoryName } = useParams();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const listRef = ref(storage, 'files/' + categoryName);
            const files = await listAll(listRef);
            const fileURLs = await Promise.all(files.items.map(fileRef => getDownloadURL(fileRef)));
            setFiles(fileURLs.map((url, index) => ({ url, name: files.items[index].name })));
        };

        fetchFiles();
    }, [categoryName]);

    return (
        <div className="flex-1 p-4">
            <h2 className="text-2xl font-bold mb-4">Files</h2>
            {files.map((file, index) => (
                <div key={index} className="block py-2 px-4 hover:bg-gray-200">
                    <img src={file.url} alt={file.name} />
                    <p>{file.name}</p>
                </div>
            ))}
        </div>
    );
}