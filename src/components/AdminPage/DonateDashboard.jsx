import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon, PencilIcon, CheckIcon, StopIcon } from '@heroicons/react/24/outline';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export default function DonateDashboard() {
  const { 
    register: registerDonate,
    handleSubmit: handleSubmitDonate
  } = useForm();
  const [donateData, setDonateData] = useState([]);
  const [donateStatus, setDonateStatus] = useState('');
  const [editDonate, setEditDonate] = useState('');
  const [editHeader, setEditHeader] = useState('');
  const [editBody, setEditBody] = useState('');

  // Subscribe to donate entry updates
  useEffect(() => {
    const docRef = doc(db, 'pages', 'DonatePage')
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setDonateData(doc.data().entries)
    });

    return unsubscribe
  }, [])

  // Handle functions
  const handleDonateSubmit = async (data) => {
    const newDonate = { header: data.header, body: data.body };

    try {
      setDonateStatus('Uploading...');
      const docRef = doc(db, 'pages', 'DonatePage');
      await updateDoc(docRef, { entries: [...donateData, newDonate] });
      setDonateStatus('Upload Successful!');
    } catch (error) {
      setDonateStatus(error.message);
    }
  }

  const handleDonateDelete = async (donate) => {
    const newDonates = donateData.filter(d => d.body !== donate.body);

    try {
      setDonateStatus('Deleting...');
      const docRef = doc(db, 'pages', 'DonatePage');
      await updateDoc(docRef, { entries: newDonates })
      setDonateStatus('Deletion Successful!');
    } catch (error) {
      setDonateStatus(error.message);
    }
  }

  const handleDonateEditStart = (donate) => {
    setEditDonate(donate);
    setEditHeader(donate.header);
    setEditBody(donate.body);
  }

  const handleDonateEditCancel = () => {
    setEditDonate(null);
    setEditHeader('');
    setEditBody('');
  }

  const handleDonateEditConfirm = async () => {
    const newDonate = { header: editHeader, body: editBody };
    const newDonates = donateData.map(d => d.body === editDonate.body ? newDonate : d);

    try {
      setDonateStatus('Updating...')
      const docRef = doc(db, 'pages', 'DonatePage')
      await updateDoc(docRef, { entries: newDonates });
      handleDonateEditCancel();
      setDonateStatus('Update Successful!')
    } catch (error) {
      setDonateStatus(error.message)
    }
  }

  return (
    <div className="p-4 space-y-4 font-lato">
      <form onSubmit={handleSubmitDonate(handleDonateSubmit)} className="space-y-2">
        <div>
          <label htmlFor="header" className="block text-sm font-bold text-gray-700">Header</label>
          <input 
            id="header" 
            {...registerDonate('header')} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-bold text-gray-700">Body</label>
          <input 
            id="body" 
            {...registerDonate('body', { required: true })} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Entry</button>
      </form>
      {donateStatus && <p>{donateStatus}</p>}
      {donateData.map((donate, index) => (
        <div key={index} className="flex items-center space-x-2">
          {editDonate === donate ? (
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
              <CheckIcon onClick={handleDonateEditConfirm} className="h-5 w-5 text-green-500 cursor-pointer" />
              <StopIcon onClick={handleDonateEditCancel} className="h-5 w-5 text-red-500 cursor-pointer" />
            </>
          ) : (
            <>
              <p className="flex-grow">{donate.header}</p>
              <p className="flex-grow">{donate.body}</p>
              <PencilIcon onClick={() => handleDonateEditStart(donate)} className="h-5 w-5 text-yellow-500 cursor-pointer" />
              <XMarkIcon onClick={() => handleDonateDelete(donate)} className="h-5 w-5 text-red-500 cursor-pointer" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}