import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon, ArchiveBoxIcon, PencilIcon, CheckIcon, StopIcon } from '@heroicons/react/24/outline';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { db, storage } from '../../firebase';

export default function EventDashboard() {
  const { 
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    formState: { errors: errorsCategory } 
  } = useForm();
  const { 
    register: registerFile,
    handleSubmit: handleSubmitFile,
    formState: { errors: errorsFile } 
  } = useForm();
  const [categoryData, setCategoryData] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const [categoryStatus, setCategoryStatus] = useState('');
  const [fileData, setFileData] = useState([]);
  const [fileSelected, setFileSelected] = useState('');
  const [fileStatus, setFileStatus] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Subscribe to category entry updates
  useEffect(() => {
    const docRef = doc(db, 'pages', 'EventPage')
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setCategoryData(doc.data().categories)
    });

    return unsubscribe
  }, [])

  // Retrieve image files on category selection updates
  useEffect(() => {
    if (categorySelected) {
      fetchFiles(categorySelected)
    }
  }, [categorySelected])

  // Retrieve image files from Firestore Storage
  const fetchFiles = async (category) => {
    const listRef = ref(storage, category)
    const files = await listAll(listRef)
    const fileURLs = await Promise.all(files?.items.map(fileRef => getDownloadURL(fileRef)))
    setFileData(fileURLs.map((url, index) => ({ url, name: files?.items[index].name })))
  }

  // Handle functions
  const handleFileChange = (e) => {
    setFileSelected(e.target.files[0]);
  }

  const handleFileSubmit = async () => {
    try {
        setFileStatus('Uploading...');
        const storageRef = ref(storage, `${categorySelected}/${fileSelected.name}`);
        await uploadBytes(storageRef, fileSelected);
        setFileSelected(null);
        fetchFiles(categorySelected);
        setFileStatus("Upload Successful!")
    } catch (error) {
        setFileStatus(error.message);
    }
  }

  const handleFileDelete = async (file) => {
    try {
      setFileStatus('Deleting...');
      const storageRef = ref(storage, `${categorySelected}/${file}`);
      await deleteObject(storageRef);
      fetchFiles(categorySelected);
      setFileStatus("Deletion Successful!")
    } catch (error) {
      setFileStatus(error.message);
    }
  }

  const handleCategoryChange = (e) => {
      setCategorySelected(e.target.value);
  };

  const handleCategorySubmit = async (data) => {
    const newCategory = { name: data.name, description: data.description };

    try {
      setCategoryStatus('Uploading...');
      const docRef = doc(db, 'pages', 'EventPage');
      await updateDoc(docRef, { categories: [...categoryData, newCategory] });
      setCategoryStatus('Upload Successful!');
    } catch (error) {
      setCategoryStatus(error.message);
    }
  }

  const handleCategoryDelete = async (category) => {
    const newCategories = categoryData.filter(c => c.name !== category.name);

    try {
      setCategoryStatus('Deleting...');
      const docRef = doc(db, 'pages', 'EventPage');
      const listRef = ref(storage, category.name)
      const files = await listAll(listRef)
      const fileNames = files?.items.map(item => item.name)
      await Promise.all(fileNames.map(name => handleFileDelete(name)))
      await updateDoc(docRef, { categories: newCategories })
      setCategoryStatus('Deletion Successful!');
    } catch (error) {
      setCategoryStatus(error.message);
    }
  }

  const handleCategoryEditStart = (category) => {
    setEditCategory(category);
    setEditName(category.name);
    setEditDescription(category.description);
  }

  const handleCategoryEditCancel = () => {
    setEditCategory(null);
    setEditName('');
    setEditDescription('');
  }

  const handleCategoryEditConfirm = async () => {
    const newCategory = { name: editName, description: editDescription };
    const newCategories = categoryData.map(c => c.name === editCategory.name ? newCategory : c);

    try {
      setCategoryStatus('Updating...')

      // Update Firestore category entries
      const docRef = doc(db, 'pages', 'EventPage')
      await updateDoc(docRef, { categories: newCategories });

      // Move category files in Storage to updated category name folder
      if (editName !== editCategory.name) {
        const storageRef = ref(storage, editCategory.name)
        const files = await listAll(storageRef)
        const fileNames = files?.items.map(item => item.name)
        const oldStorageRefs = fileNames.map(file => ref(storage, `${editCategory.name}/${file}`))
        const newStorageRefs = fileNames.map(file => ref(storage, `${editName}/${file}`))
        await Promise.all(oldStorageRefs.map(ref => deleteObject(ref)))
        await Promise.all(newStorageRefs.map((ref, index) => uploadBytes(ref, fileNames[index])))
      }

      handleCategoryEditCancel();
      setCategoryStatus('Update Successful!')
    } catch (error) {
      setCategoryStatus(error.message)
    }
  }

  return (
    <div className="flex md:flex-row flex-col w-full h-screen m-8 font-lato">
        <section className="w-full min-h-screen p-8 flex flex-col">
          {errorsCategory.name && <span className="text-red-500 font-bold">This field is required</span>}
          {categoryStatus && <span className="text-red-500 font-bold">{categoryStatus}</span>}
          <form onSubmit={handleSubmitCategory(handleCategorySubmit)} className="w-full h-fit flex md:space-x-2 space-y-2 md:flex-row flex-col">
                <input {...registerCategory('name', { required: true })} type="text" placeholder="Category Name" className="py-2 px-4 border border-gray-300 rounded-md"/>
                <input {...registerCategory('description')} type="text" placeholder="Category Description" className="py-2 px-4 border border-gray-300 rounded-md"/>
                <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md flex items-center space-x-1">
                <ArchiveBoxIcon className="h-5 w-5"/>
                <span>Add Category</span>
                </button>
            </form>
            <div className="mt-4 grid grid-cols-1 gap-4">
                {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        {editCategory === category ? (
                            <>
                                <input
                                  type="text"
                                  value={editName}
                                  placeholder={category.name}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="py-2 px-4 border border-gray-300 rounded-md"/>
                                <input
                                  type="text"
                                  value={editDescription}
                                  placeholder={category.description}
                                  onChange={(e) => setEditDescription(e.target.value)}
                                  className="py-2 px-4 border border-gray-300 rounded-md"/>
                                <button onClick={handleCategoryEditConfirm} className="py-1 px-2 bg-green-500 text-white rounded-md flex items-center space-x-1">
                                <CheckIcon className="h-5 w-5"/>
                                <span>Confirm</span>
                                </button>
                                <button onClick={handleCategoryEditCancel} className="py-1 px-2 bg-yellow-500 text-white rounded-md flex items-center space-x-1">
                                <StopIcon className="h-5 w-5"/>
                                <span>Cancel</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{category.name}</span>
                                <span>{category.description}</span>
                                <button onClick={() => handleCategoryEditStart(category)} className="py-1 px-2 bg-green-500 text-white rounded-md flex items-center space-x-1">
                                <PencilIcon className="h-5 w-5"/>
                                <span>Edit</span>
                                </button>
                                <button onClick={() => handleCategoryDelete(category)} className="py-1 px-2 bg-red-500 text-white rounded-md flex items-center space-x-1">
                                <XMarkIcon className="h-5 w-5"/>
                                <span>Delete</span>
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
     
        <section className="w-full min-h-screen p-8">
            {errorsFile.file && <span className="text-red-500 font-bold">This field is required</span>}
            {fileStatus && <span className="text-red-500 font-bold">{fileStatus}</span>}
            <form onSubmit={handleSubmitFile(handleFileSubmit)} className="w-full h-fit flex space-x-2">
                <select {...registerFile('category', { required: true })} onChange={handleCategoryChange} value={categorySelected} className="px-8 border border-gray-300 rounded-md">
                    <option value="">Select Category</option>
                    {categoryData.map((category) => (
                        <option key={crypto.randomUUID()} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <input {...registerFile('file', { required: true })} onChange={handleFileChange} type="file" accept="image/png, image/jpeg, image/jpg" className="px-4 border border-gray-300 rounded-md"/>
                <button type="submit" className="px-4 bg-blue-500 text-white rounded-md flex items-center space-x-1">
                    <ArchiveBoxIcon className="h-5 w-5"/>
                    <span>Upload</span>
                </button>
            </form>
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
    </div>
  );
}