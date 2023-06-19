import { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, deleteField, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function DonateManagement() {
    const [links, setLinks] = useState({});
    const [status, setStatus] = useState('');
    const [editing, setEditing] = useState('');
    const [editName, setEditName] = useState('');
    const [editUrl, setEditUrl] = useState('');
    const [newName, setNewName] = useState('');
    const [newUrl, setNewUrl] = useState('');
  
    useEffect(() => {
        const docRef = doc(db, 'pages', 'donate');
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setLinks(doc.data().links);
        });
    
        return unsubscribe;
    }, []);
  
    const onEdit = (name, url) => {
        setEditName(name);
        setEditUrl(url);
        setEditing(name);
        };
  
    const onCancel = () => {
        setEditing('');
    };
  
    const onSubmitEdit = async (event) => {
      event.preventDefault();
  
      try {
        // Throw an error if the new entry is the same as an existing one
        if (Object.values(links).includes(editName)) throw new Error('That name already exists.');
        if (Object.values(links).includes(editUrl)) throw new Error('That url already exists.');

        setStatus('loading');
        const docRef = doc(db, 'pages', 'donate');
        if (editName !== editing) {
          await updateDoc(docRef, {
            [`links.${editing}`]: deleteField()
          });
        }
        await setDoc(docRef, { links: { [editName]: editUrl } }, { merge: true });
        setStatus('success');
        setEditing('');
      } catch (error) {
        console.error('Error updating document: ', error);
        setStatus(error.message);
      }
    };
  
    const onSubmitNew = async (event) => {
      event.preventDefault();
  
      const data = { 
        [newName]: newUrl
      };
  
      try {
        // Throw an error if the new entry is the same as an existing one
        console.log(newName)
        console.log(links)

        if (Object.keys(links).includes(newName)) throw new Error('That name already exists.');
        if (Object.values(links).includes(newUrl)) throw new Error('That url already exists.');

        setStatus('loading');
        const docRef = doc(db, 'pages', 'donate');
        await setDoc(docRef, { links: data }, { merge: true });
        setStatus('success');
        setNewName('');
        setNewUrl('');
      } catch (error) {
        console.error('Error updating document: ', error);
        setStatus(error.message);
      }
    };
  
    const onDelete = async (name) => {
      try {
        setStatus('loading');
        const docRef = doc(db, 'pages', 'donate');
        await updateDoc(docRef, {
          [`links.${name}`]: deleteField()
        });
        setStatus('success');
      } catch (error) {
        console.error('Error deleting link: ', error);
        setStatus(error.message);
      }
    };
  
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        {status === 'loading' && <p className="text-blue-500">Loading...</p>}
        {status === 'success' && <p className="text-green-500">Donate page updated successfully!</p>}
        {!['loading', 'success', 'c'].includes(status) && <p className="text-red-500">{status}</p>}
  
        <form onSubmit={onSubmitNew} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">New Site Name:</label>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700leading-tight focus:outline-none focus:shadow-outline" />
  
          <label className="block text-gray-700 text-sm font-bold mb-2">New URL:</label>
          <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
            Add New Link
          </button>
        </form>
  
        <div className="mb-4">
          <h2 className="text-gray-700 text-lg font-bold mb-2">Links:</h2>
          {Object.entries(links).map(([name, url]) => (
            <div key={name} className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
              {editing === name ? (
                <form onSubmit={onSubmitEdit}>
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  <input value={editUrl} onChange={(e) => setEditUrl(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
                    Update Link
                  </button>
                </form>
              ) : (
                <div>
                  <h3 className="text-gray-700 font-bold">{name}</h3>
                  <p>{url}</p>
                </div>
              )}
              {editing === name ? (
                <button onClick={onCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                  Cancel
                </button>
              ) : (
                <button onClick={() => onEdit(name, url)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                  Edit
                </button>
              )}
              <button onClick={() => onDelete(name)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }