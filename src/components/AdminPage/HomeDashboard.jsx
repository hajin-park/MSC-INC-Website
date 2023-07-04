import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon, ArchiveBoxIcon, PencilIcon, CheckIcon, StopIcon } from '@heroicons/react/24/outline';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, deleteObject, listAll } from 'firebase/storage';
import { db, storage } from '../../firebase.js'


export default function HomeDashboard() {
  const { register, handleSubmit,  formState: { errors } } = useForm();
  const { register: registerAnnouncement, handleSubmit: handleSubmitAnnouncement} = useForm();
  const [fileData, setFileData] = useState([]);
  const [fileSelected, setFileSelected] = useState('');
  const [fileStatus, setFileStatus] = useState('');
  const [announcementData, setAnnouncementData] = useState([]);
  const [announcementStatus, setAnnouncementStatus] = useState('');
  const [editAnnouncement, setEditAnnouncement] = useState('');
  const [editHeader, setEditHeader] = useState('');
  const [editBody, setEditBody] = useState('');

  useEffect(() => {
    fetchFiles("homePage");
  }, []);

  // Subscribe to announcement entry updates
  useEffect(() => {
    const docRef = doc(db, 'pages', 'HomePage')
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setAnnouncementData(doc.data().announcements)
    });

    return unsubscribe
  }, [])

  // Handle functions
  const handleAnnouncementSubmit = async (data) => {
    const newAnnouncement = { header: data.header, body: data.body };

    try {
      setAnnouncementStatus('Uploading...');
      const docRef = doc(db, 'pages', 'HomePage');
      await updateDoc(docRef, { announcements: [...announcementData, newAnnouncement] });
      setAnnouncementStatus('Upload Successful!');
    } catch (error) {
      setAnnouncementStatus(error.message);
    }
  }

  const handleAnnouncementDelete = async (announcement) => {
    const newAnnouncements = announcementData.filter(a => a.body !== announcement.body);

    try {
      setAnnouncementStatus('Deleting...');
      const docRef = doc(db, 'pages', 'HomePage');
      await updateDoc(docRef, { announcements: newAnnouncements })
      setAnnouncementStatus('Deletion Successful!');
    } catch (error) {
      setAnnouncementStatus(error.message);
    }
  }

  const handleAnnouncementEditStart = (announcement) => {
    setEditAnnouncement(announcement);
    setEditHeader(announcement.header);
    setEditBody(announcement.body);
  }

  const handleAnnouncementEditCancel = () => {
    setEditAnnouncement(null);
    setEditHeader('');
    setEditBody('');
  }

  const handleAnnouncementEditConfirm = async () => {
    const newAnnouncement = { header: editHeader, body: editBody };
    const newAnnouncements = announcementData.map(a => a.body === editAnnouncement.body ? newAnnouncement : a);

    try {
      setAnnouncementStatus('Updating...')
      const docRef = doc(db, 'pages', 'HomePage')
      await updateDoc(docRef, { announcements: newAnnouncements });
      handleAnnouncementEditCancel();
      setAnnouncementStatus('Update Successful!')
    } catch (error) {
      setAnnouncementStatus(error.message)
    }
  }

  // Retrieve image files from Firestore Storage
  const fetchFiles = async (folder) => {
    const listRef = ref(storage, folder)
    const files = await listAll(listRef)
    const fileURLs = await Promise.all(files?.items.map(fileRef => getDownloadURL(fileRef)))
    setFileData(fileURLs.map((url, index) => ({ url, name: files?.items[index].name })))
  }

  const handleFileDelete = async (file) => {
    try {
      setFileStatus('Deleting...');
      const storageRef = ref(storage, `homePage/${file}`);
      await deleteObject(storageRef);
      fetchFiles("homePage");
      setFileStatus("Deletion Successful!")
    } catch (error) {
      setFileStatus(error.message);
    }
  }

  const handleFileSubmit = async () => {
    try {
        setFileStatus('Uploading...');
        const storageRef = ref(storage, `homePage/${fileSelected.name}`);
        await uploadBytes(storageRef, fileSelected);
        setFileSelected(null);
        fetchFiles("homePage");
        setFileStatus("Upload Successful!")
    } catch (error) {
        setFileStatus(error.message);
    }
  }

  // Handle functions
  const handleFileChange = (e) => {
    setFileSelected(e.target.files[0]);
  }

  return (
    <div className="flex md:flex-row flex-col w-full h-screen m-8 font-lato">
      <section className="p-4">
        {errors.name && <span className="text-red-500 font-bold">This field is required</span>}
        {fileStatus && <span className="text-red-500 font-bold">{fileStatus}</span>}

        <form onSubmit={handleSubmit(handleFileSubmit)} className="flex items-center space-x-2">
          <input {...register('file', { required: true })} onChange={handleFileChange} type="file" accept="image/png, image/jpg, image/jpeg" className="py-2 px-4 border border-gray-300 rounded-md"/>
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md flex items-center space-x-1">
            <ArchiveBoxIcon className="h-5 w-5"/>
            <span>Upload</span>
          </button>
        </form>
        {errors.file && <span className="text-red-500">This field is required</span>}
        <div className="mt-4 grid grid-cols-1 gap-4">
          {fileData.map((file) => (
            <div key={crypto.randomUUID()} className="flex items-center space-x-2">
              <span>{file.name}</span>
              <button onClick={() => handleFileDelete(file.name)} className="py-1 px-2 bg-red-500 text-white rounded-md flex items-center space-x-1">
                <XMarkIcon className="h-5 w-5"/>
                <span>Delete</span>
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="p-4">
        {announcementStatus && <p>{announcementStatus}</p>}
        <form onSubmit={handleSubmitAnnouncement(handleAnnouncementSubmit)} className="space-y-2">
          <div>
            <label htmlFor="header" className="block text-sm font-bold text-gray-700">Header</label>
            <input 
              id="header" 
              {...registerAnnouncement('header')} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-bold text-gray-700">Body</label>
            <input 
              id="body" 
              {...registerAnnouncement('body', { required: true })} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Entry</button>
        </form>
        {announcementData.map((announcement, index) => (
          <div key={index} className="flex items-center space-x-2">
            {editAnnouncement === announcement ? (
              <>
                <input 
                  value={editHeader} 
                  onChange={(e) => setEditHeader(e.target.value)} 
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                />
                <input 
                  value={editBody} 
                  onChange={(e) => setEditBody(e.target.value)} 
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                />
                <CheckIcon onClick={handleAnnouncementEditConfirm} className="h-5 w-5 text-green-500 cursor-pointer" />
                <StopIcon onClick={handleAnnouncementEditCancel} className="h-5 w-5 text-red-500 cursor-pointer" />
              </>
            ) : (
              <>
                <p className="flex-grow">{announcement.header}</p>
                <p className="flex-grow">{announcement.body}</p>
                <PencilIcon onClick={() => handleAnnouncementEditStart(announcement)} className="h-5 w-5 text-yellow-500 cursor-pointer" />
                <XMarkIcon onClick={() => handleAnnouncementDelete(announcement)} className="h-5 w-5 text-red-500 cursor-pointer" />
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}