import { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, deleteField, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase.js'

export default function DonateDashboard() {
    const [entries, setEntries] = useState([]);
    const [editing, setEditing] = useState('');
    const [editHeader, setEditHeader] = useState('');
    const [editBody, setEditBody] = useState('');
    const [newHeader, setNewHeader] = useState('');
    const [newBody, setNewBody] = useState('');
    const [status, setStatus] = useState('');

    // Fetch entries from Firestore
    useEffect(() => {
        const docRef = doc(db, 'pages', 'DonatePage');
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setEntries(doc.data().entries);
        });
    
        return unsubscribe;
    }, []);

    // Handle entry edits
    const onEdit = (header, body) => {
        setEditHeader(header);
        setEditBody(body);
        setEditing(header);
    };
  
    const onCancel = () => {
        setEditing('');
    };

    const onSubmitEdit = async (event) => {
        event.preventDefault();
    
        try {
          setStatus('loading');
          const docRef = doc(db, 'pages', 'DonatePage');
          if (editHeader !== editing) {
            await updateDoc(docRef, {
              [`entries.${editing}`]: deleteField()
            });
          }
          await setDoc(docRef, { entries: { [editHeader]: editBody } }, { merge: true });
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
          [newHeader]: newBody
        };
    
        try {
          setStatus('loading');
          const docRef = doc(db, 'pages', 'DonatePage');
          await setDoc(docRef, { entries: data }, { merge: true });
          setStatus('success');
          setNewHeader('');
          setNewBody('');
        } catch (error) {
          console.error('Error updating document: ', error);
          setStatus(error.message);
        }
    };
    
    const onDelete = async (header) => {
        try {
          setStatus('loading');
          const docRef = doc(db, 'pages', 'DonatePage');
          await updateDoc(docRef, {
            [`entries.${header}`]: deleteField()
          });
          setStatus('success');
        } catch (error) {
          console.error('Error deleting entry: ', error);
          setStatus(error.message);
        }
    };

    return (
        <section className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            {status === 'loading' && <p className="text-blue-500">Updating...</p>}
            {status === 'success' && <p className="text-green-500">Entry updated successfully!</p>}
            {!['loading', 'success', 'c'].includes(status) && <p className="text-red-500">{status}</p>}
    
            <form onSubmit={onSubmitNew} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">New Entry:</label>
                <input value={newHeader} onChange={(e) => setNewHeader(e.target.value)} placeholder="Header (optional)" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" />
                <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} required placeholder="Body" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
                    Add New Entry
                </button>
            </form>
    
            <div className="mb-4">
                <h2 className="text-gray-700 text-lg font-bold mb-2">Entries:</h2>
                {Object.entries(entries).map(([header, body]) => (
                    <div key={header} className="bg-gray-100 p-2 rounded mb-2">
                        {editing === header ? (
                            <form onSubmit={onSubmitEdit}>
                                <input value={editHeader} onChange={(e) => setEditHeader(e.target.value)} placeholder="Header (optional)" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" />
                                <textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} required placeholder="Body" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
                                    Update Entry
                                </button>
                            </form>
                        ) : (
                            <div>
                                <h3 className="text-gray-700 font-bold">{header}</h3>
                                <p className="text-gray-700">{body}</p>
                            </div>
                        )}
                        {editing === header ? (
                            <button onClick={onCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                                Cancel
                            </button>
                        ) : (
                            <button onClick={() => onEdit(header, body)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                                Edit
                            </button>
                        )}
                        <button onClick={() => onDelete(header)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}