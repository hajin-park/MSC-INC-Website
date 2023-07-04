import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon, PencilIcon, CheckIcon, StopIcon } from '@heroicons/react/24/outline';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export default function StoryDashboard() {
  const { register: registerText, handleSubmit: handleSubmitText } = useForm();
  const { register: registerPerson, handleSubmit: handleSubmitPerson} = useForm();
  const [textEntries, setTextEntries] = useState([]);
  const [peopleEntries, setPeopleEntries] = useState([]);
  const [editText, setEditText] = useState(null);
  const [editPerson, setEditPerson] = useState(null);

  useEffect(() => {
    const docRef = doc(db, 'pages', 'StoryPage');
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setTextEntries(doc.data().textEntries);
      setPeopleEntries(doc.data().peopleEntries);
    });

    return unsubscribe;
  }, []);

  const handleTextSubmit = async (data) => {
    try {
      const newTextEntry = { header: data.header, body: data.body };
      const docRef = doc(db, 'pages', 'StoryPage');
      await updateDoc(docRef, { textEntries: [...textEntries, newTextEntry] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextDelete = async (textEntry) => {
    try {
      const newTextEntries = textEntries?.filter(entry => entry !== textEntry);
      const docRef = doc(db, 'pages', 'StoryPage');
      await updateDoc(docRef, { textEntries: newTextEntries });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextEditStart = (textEntry) => {
    setEditText(textEntry);
  };

  const handleTextEditCancel = () => {
    setEditText(null);
  };

  const handleTextEditConfirm = async (data) => {
    try {
      const updatedTextEntry = { header: data.header, body: data.body };
      const newTextEntries = textEntries?.map(entry => entry === editText ? updatedTextEntry : entry);
      const docRef = doc(db, 'pages', 'StoryPage');
      await updateDoc(docRef, { textEntries: newTextEntries });
      setEditText(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePersonSubmit = async (data) => {
    try {
      const newPersonEntry = { type: data.type, name: data.name, contact: data.contact, role: data.role };
      const docRef = doc(db, 'pages', 'StoryPage');
      await updateDoc(docRef, { peopleEntries: [...peopleEntries, newPersonEntry] });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePersonDelete = async (personEntry) => {
    try {
      const newPeopleEntries = peopleEntries?.filter(entry => entry !== personEntry);
      const docRef = doc(db, 'pages', 'StoryPage');
      await updateDoc(docRef, { peopleEntries: newPeopleEntries });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePersonEditStart = (personEntry) => {
    setEditPerson(personEntry);
  };

  const handlePersonEditCancel = () => {
    setEditPerson(null);
  };

  const handlePersonEditConfirm = async (data) => {
    try {
      const updatedPersonEntry = { type: data.type, name: data.name, contact: data.contact, role: data.role };
      const docRef = doc(db, 'pages', 'StoryPage');
      await updateDoc(docRef, { peopleEntries: [...peopleEntries, updatedPersonEntry] });
      setEditPerson(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row space-y-8 font-lato">
      <section>
        <form onSubmit={handleSubmitText(handleTextSubmit)} className="flex flex-col space-y-4">
          <input {...registerText('header')} type="text" placeholder="Text Header" className="border border-gray-300 p-2 rounded-md" />
          <textarea {...registerText('body')} placeholder="Body Text" className="border border-gray-300 p-2 rounded-md" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
            <PencilIcon className="h-6 w-6" />
            <span>Add Text Entry</span>
          </button>
        </form>
        {textEntries?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-4">
            {editText === entry ? (
              <form onSubmit={handleSubmitText(handleTextEditConfirm)} className="flex items-center space-x-4">
                <input {...registerText('header')} defaultValue={entry.header} className="border border-gray-300 p-2 rounded-md" />
                <textarea {...registerText('body')} defaultValue={entry.body} className="border border-gray-300 p-2 rounded-md" />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <CheckIcon className="h-6 w-6" />
                  <span>Confirm</span>
                </button>
                <button onClick={handleTextEditCancel} className="bg-yellow-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <StopIcon className="h-6 w-6" />
                  <span>Cancel</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-4">
                <h2 className="font-bold">{entry.header}</h2>
                <p>{entry.body}</p>
                <button onClick={() => handleTextEditStart(entry)} className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <PencilIcon className="h-6 w-6" />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleTextDelete(entry)} className="bg-red-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <XMarkIcon className="h-6 w-6" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
      <section>
        <form onSubmit={handleSubmitPerson(handlePersonSubmit)} className="flex flex-col space-y-4">
          <select {...registerPerson('type', { required: true })} className="border border-gray-300 p-2 rounded-md">
            <option value="">Select Type</option>
            <option value="Board Member">Board Member</option>
            <option value="Staff">Staff</option>
            <option value="Volunteer">Volunteer</option>
          </select>
          <input {...registerPerson('name')} type="text" placeholder="Name" className="border border-gray-300 p-2 rounded-md" />
          <input {...registerPerson('contact')} type="text" placeholder="Contact Info" className="border border-gray-300 p-2 rounded-md" />
          <input {...registerPerson('role', { required: true })} type="text" placeholder="Role" className="border border-gray-300 p-2 rounded-md" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
            <PencilIcon className="h-6 w-6" />
            <span>Add Person</span>
          </button>
        </form>
        {peopleEntries?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-4">
            {editPerson === entry ? (
              <form onSubmit={handleSubmitPerson(handlePersonEditConfirm)} className="flex items-center space-x-4">
                <select {...registerPerson('type', { required: true })} defaultValue={entry.type} className="border border-gray-300 p-2 rounded-md">
                  <option value="Board Member">Board Member</option>
                  <option value="Staff">Staff</option>
                  <option value="Volunteer">Volunteer</option>
                </select>
                <input {...registerPerson('name')} defaultValue={entry.name} className="border border-gray-300 p-2 rounded-md" />
                <input {...registerPerson('contact')} defaultValue={entry.contact} className="border border-gray-300 p-2 rounded-md" />
                <input {...registerPerson('role', { required: true })} defaultValue={entry.role} className="border border-gray-300 p-2 rounded-md" />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <CheckIcon className="h-6 w-6" />
                  <span>Confirm</span>
                </button>
                <button onClick={() => handlePersonEditCancel()} className="bg-yellow-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <StopIcon className="h-6 w-6" />
                  <span>Cancel</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-4">
                <h2 className="font-bold">{entry.name}</h2>
                <p>{entry.contact}</p>
                <p>{entry.role}</p>
                <button onClick={() => handlePersonEditStart(entry)} className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <PencilIcon className="h-6 w-6" />
                  <span>Edit</span>
                </button>
                <button onClick={() => handlePersonDelete(entry)} className="bg-red-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <XMarkIcon className="h-6 w-6" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}