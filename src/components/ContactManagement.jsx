import React, { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function ContactManagement() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const docRef = doc(db, 'pages', 'contactInfo');
        const unsubscribe = onSnapshot(docRef, (doc) => {
            const data = doc.data();
            setEmail(data.email || '');
            setPhoneNumber(data.phoneNumber || '');
            if (data.address) {
                setStreet(data.address.street || '');
                setCity(data.address.city || '');
                setState(data.address.state || '');
                setZip(data.address.zip || '');
            }
        });

        return unsubscribe;
    }, []);

    const updateField = async (field, value) => {
      try {
        setStatus('loading');
        const docRef = doc(db, 'pages', 'contactInfo');
        await setDoc(docRef, { [field]: value }, { merge: true });
        setStatus('success');
      } catch (error) {
        console.error('Error updating document: ', error);
        setStatus(error.message);
      }
    };
  
    const onSubmitEmail = (event) => {
      event.preventDefault();
      updateField('email', email);
    };
  
    const onSubmitPhoneNumber = (event) => {
      event.preventDefault();
      updateField('phoneNumber', phoneNumber);
    };
  
    const onSubmitAddress = (event) => {
      event.preventDefault();
      updateField('address', { street, city, state, zip });
    };
  
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        {status === 'loading' && <p className="text-blue-500">Loading...</p>}
        {status === 'success' && <p className="text-green-500">Contact information updated successfully!</p>}
        {!['loading', 'success', 'c'].includes(status) && <p className="text-red-500">{status}</p>}
  
        <form onSubmit={onSubmitEmail} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={email} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
            Update Email
          </button>
        </form>
  
        <form onSubmit={onSubmitPhoneNumber} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
          <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder={phoneNumber} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
            Update Phone Number
          </button>
        </form>
  
        <form onSubmit={onSubmitAddress} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Street:</label>
          <input value={street} onChange={(e) => setStreet(e.target.value)} placeholder={street} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

          <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder={city} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

          <label className="block text-gray-700 text-sm font-bold mb-2">State:</label>
          <input value={state} onChange={(e) => setState(e.target.value)} placeholder={state} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

          <label className="block text-gray-700 text-sm font-bold mb-2">Zip:</label>
          <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder={zip} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">
            Update Address
          </button>
        </form>
      </div>
    );
};