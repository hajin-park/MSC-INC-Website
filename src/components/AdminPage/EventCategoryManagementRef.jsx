import { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, deleteField, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function CategoryManagement() {
    const [categories, setCategories] = useState({});
    const [status, setStatus] = useState('');
    const [editing, setEditing] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
  
    useEffect(() => {
        const docRef = doc(db, 'pages', 'eventCategories');
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setCategories(doc.data().categories);
        });
    
        return unsubscribe;
    }, []);
  
    const onEdit = (category) => {
        setEditCategory(category);
        setEditing(category);
        };
  
    const onCancel = () => {
        setEditing('');
    };
  
    const onSubmitEdit = async (event) => {
      event.preventDefault();
  
      try {
        // Throw an error if the new category name is the same as an existing one
        if (Object.values(categories).includes(editCategory)) throw new Error('Category already exists.');

        setStatus('loading');
        const docRef = doc(db, 'pages', 'eventCategories');
        if (editCategory !== editing) {
          await updateDoc(docRef, {
            [`categories.${editing}`]: deleteField()
          });
        }
        await setDoc(docRef, { categories: { [editCategory]: editCategory } }, { merge: true });
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
        [newCategory]: newCategory
      };
  
      try {
        // Throw an error if the new category name is the same as an existing one
        if (Object.values(categories).includes(newCategory)) throw new Error('Category already exists.');

        setStatus('loading');
        const docRef = doc(db, 'pages', 'eventCategories');
        await setDoc(docRef, { categories: data }, { merge: true });
        setStatus('success');
        setNewCategory('');
      } catch (error) {
        console.error('Error updating document: ', error);
        setStatus(error.message);
      }
    };
  
    const onDelete = async (name) => {
      try {
        setStatus('loading');
        const docRef = doc(db, 'pages', 'eventCategories');
        await updateDoc(docRef, {
          [`categories.${name}`]: deleteField()
        });
        setStatus('success');
      } catch (error) {
        console.error('Error deleting category: ', error);
        setStatus(error.message);
      }
    };
  
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            {status === 'loading' && <p className="text-blue-500">Updating...</p>}
            {status === 'success' && <p className="text-green-500">Category section updated successfully!</p>}
            {!['loading', 'success', 'c'].includes(status) && <p className="text-red-500">{status}</p>}
    
            <form onSubmit={onSubmitNew} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Category:</label>
            <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700leading-tight focus:outline-none focus:shadow-outline" />
    
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
                Add New Category
            </button>
            </form>
    
            <div className="mb-4">
            <h2 className="text-gray-700 text-lg font-bold mb-2">Categories:</h2>
            {Object.entries(categories).map(([name, category]) => (
                <div key={category} className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
                {editing === name ? (
                    <form onSubmit={onSubmitEdit}>
                    <input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
                        Update Category
                    </button>
                    </form>
                ) : (
                    <div>
                    <h3 className="text-gray-700 font-bold">{name}</h3>
                    </div>
                )}
                {editing === name ? (
                    <button onClick={onCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                    Cancel
                    </button>
                ) : (
                    <button onClick={() => onEdit(name)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
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