import { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, deleteField, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export default function StoryDashboard() {
  const [story, setStory] = useState('');
  const [mission, setMission] = useState('');
  const [editing, setEditing] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('');
  const [members, setMembers] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    const docRef = doc(db, 'pages', 'aboutUs');
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setMembers(doc.data().members);
      setStory(doc.data().story);
      setMission(doc.data().mission);
    });

    return unsubscribe;
  }, []);

  const updateField = async (field, value) => {
    try {
      setStatus('loading');
      const docRef = doc(db, 'pages', 'aboutUs');
      await setDoc(docRef, { [field]: value }, { merge: true });
      setStatus('success');
    } catch (error) {
      console.error('Error updating document: ', error);
      setStatus('error');
    }
  };

  const onSubmitStory = (event) => {
    event.preventDefault();
    updateField('story', story);
  };

  const onSubmitMission = (event) => {
    event.preventDefault();
    updateField('mission', mission);
  };

  const onSubmitNewMember = async (event) => {
    event.preventDefault();

    const data = { 
      [newName]: { email: newEmail, role: newRole }
    };

    try {
      setStatus('loading');
      const docRef = doc(db, 'pages', 'aboutUs');
      await setDoc(docRef, { members: data }, { merge: true });
      setStatus('success');
      setNewName('');
      setNewEmail('');
      setNewRole('');
    } catch (error) {
      console.error('Error updating document: ', error);
      setStatus(error.message);
    }
  };

  const onSubmitEditMember = async (event) => {
    event.preventDefault();

    try {
      setStatus('loading');
      const docRef = doc(db, 'pages', 'aboutUs');
      if (editName !== editing) {
        await updateDoc(docRef, {
          [`members.${editing}`]: deleteField()
        });
      }
      await setDoc(docRef, { members: { [editName]: { email: editEmail, role: editRole } } }, { merge: true });
      setStatus('success');
      setEditing('');
    } catch (error) {
      console.error('Error updating document: ', error);
      setStatus(error.message);
    }
  };

  const onDeleteMember = async (name) => {
    try {
      setStatus('loading');
      const docRef = doc(db, 'pages', 'aboutUs');
      await updateDoc(docRef, {
        [`members.${name}`]: deleteField()
      });
      setStatus('success');
    } catch (error) {
      console.error('Error deleting member: ', error);
      setStatus(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      {status === 'loading' && <p className="text-blue-500">Loading...</p>}
      {status === 'success' && <p className="text-green-500">Our Story page information updated successfully!</p>}
      {!['loading', 'success', 'c'].includes(status) && <p className="text-red-500">{status}</p>}

      <form onSubmit={onSubmitStory} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Our Story:</label>
        <textarea value={story} onChange={(e) => setStory(e.target.value)} placeholder={story} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
          Update Story
        </button>
      </form>

      <form onSubmit={onSubmitMission} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Our Mission:</label>
        <textarea value={mission} onChange={(e) => setMission(e.target.value)} placeholder={mission} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
          Update Mission
        </button>
      </form>

      <form onSubmit={onSubmitNewMember} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

        <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
        <select value={newRole} onChange={(e) => setNewRole(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select a role</option>
          <option value="Board Member">Board Member</option>
          <option value="Volunteer">Volunteer</option>
        </select>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
          Add Member
        </button>
      </form>

      <div className="mb-4">
        <h2 className="text-gray-700 text-lg font-bold mb-2">Members:</h2>
        {Object.entries(members).map(([name, { email, role }]) => (
          <div key={name} className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
            {editing === name ? (
              <form onSubmit={onSubmitEditMember}>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <select value={editRole} onChange={(e) => setEditRole(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select a role</option>
                  <option value="Board Member">Board Member</option>
                  <option value="Volunteer">Volunteer</option>
                </select>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
                  Update Member
                </button>
              </form>
            ) : (
              <div>
                <h3 className="text-gray-700 font-bold">{name}</h3>
                <p>{email}</p>
                <p>{role}</p>
              </div>
            )}
            <div>
              {editing === name ? (
                <button onClick={() => setEditing('')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                  Cancel
                </button>
              ) : (
                <button onClick={() => { setEditing(name); setEditName(name); setEditEmail(email); setEditRole(role); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                  Edit
                </button>
              )}
              <button onClick={() => onDeleteMember(name)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}