import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { storage } from '../../firebase.js'

export default function HomeDashboard() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const listRef = ref(storage, 'homePage');
    const res = await listAll(listRef);
    setFiles(res.items);
  };

  const onSubmit = async (data) => {
    const file = data.file[0];
    const storageRef = ref(storage, `homePage/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Handle progress
      }, 
      (error) => {
        // Handle error
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          fetchFiles();
          reset();
        });
      }
    );
  };

  const deleteFile = async (fileRef) => {
    await deleteObject(fileRef);
    fetchFiles();
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2">
        <input {...register('file', { required: true })} type="file" accept="image/png, image/jpeg" className="py-2 px-4 border border-gray-300 rounded-md"/>
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md flex items-center space-x-1">
          <ArchiveBoxIcon className="h-5 w-5"/>
          <span>Upload</span>
        </button>
      </form>
      {errors.file && <span className="text-red-500">This field is required</span>}
      <div className="mt-4 grid grid-cols-1 gap-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>{file.name}</span>
            <button onClick={() => deleteFile(file)} className="py-1 px-2 bg-red-500 text-white rounded-md flex items-center space-x-1">
              <XMarkIcon className="h-5 w-5"/>
              <span>Delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}