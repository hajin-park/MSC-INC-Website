import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon, PencilIcon, CheckIcon, StopIcon } from '@heroicons/react/24/outline';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ContactPageDashboard() {
  const { register: registerEmail, handleSubmit: handleSubmitEmail } = useForm()
  const { register: registerPhone, handleSubmit: handleSubmitPhone } = useForm()
  const { register: registerAddress, handleSubmit: handleSubmitAddress } = useForm()
  const [emailEntries, setEmailEntries] = useState([]);
  const [phoneEntries, setPhoneEntries] = useState([]);
  const [address, setAddress] = useState({});
  const [editEmail, setEditEmail] = useState(null);
  const [editPhone, setEditPhone] = useState(null);

  useEffect(() => {
    const docRef = doc(db, 'pages', 'ContactPage');
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setEmailEntries(doc.data().emailEntries);
      setPhoneEntries(doc.data().phoneEntries);
      setAddress(doc.data().address);
    });

    return unsubscribe;
  }, []);

  const handleEmailSubmit = async (data) => {
    try {
      const newEmailEntry = { header: data.header, email: data.email };
      const docRef = doc(db, 'pages', 'ContactPage');
      await updateDoc(docRef, { emailEntries: [...emailEntries, newEmailEntry] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailDelete = async (emailEntry) => {
    try {
      const newEmailEntries = emailEntries.filter(entry => entry !== emailEntry);
      const docRef = doc(db, 'pages', 'ContactPage');
      await updateDoc(docRef, { emailEntries: newEmailEntries });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailEditStart = (emailEntry) => {
    setEditEmail(emailEntry);
  };

  const handleEmailEditCancel = () => {
    setEditEmail(null);
  };

  const handleEmailEditConfirm = async (data) => {
    try {
      const updatedEmailEntry = { header: data.header, email: data.email };
      const newEmailEntries = emailEntries.map(entry => entry === editEmail ? updatedEmailEntry : entry);
      const docRef = doc(db, 'pages', 'ContactPage');
      await updateDoc(docRef, { emailEntries: newEmailEntries });
      setEditEmail(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneSubmit = async (data) => {
    try {
      const newPhoneEntry = { header: data.header, phone: data.phone };
      const docRef = doc(db, 'pages', 'ContactPage');
      await updateDoc(docRef, { phoneEntries: [...phoneEntries, newPhoneEntry] });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneDelete = async (phoneEntry) => {
    try {
      const newPhoneEntries = phoneEntries.filter(entry => entry !== phoneEntry);
      const docRef = doc(db, 'pages', 'ContactPage');
      await updateDoc(docRef, { phoneEntries: newPhoneEntries });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneEditStart = (phoneEntry) => {
    setEditPhone(phoneEntry);
  };

  const handlePhoneEditCancel = () => {
    setEditPhone(null);
  };

  const handlePhoneEditConfirm = async (data) => {
    try {
      const updatedPhoneEntry = { header: data.header, phone: data.phone };
      const newPhoneEntries = phoneEntries.map(entry => entry === editPhone ? updatedPhoneEntry : entry);
      const docRef = doc(db, 'pages', 'ContactPage');
      await updateDoc(docRef, { phoneEntries: newPhoneEntries });
      setEditPhone(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddressSubmit = async (data) => {
    try {
      const newAddress = { street1: data.street1, street2: data.street2, city: data.city, state: data.state, zip: data.zip };
      const docRef = doc(db, 'pages', 'ContactPage');
      await updateDoc(docRef, { address: newAddress });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col space-y-8 font-lato">
      <section>
        <form onSubmit={handleSubmitEmail(handleEmailSubmit)} className="flex flex-col space-y-4">
          <input {...registerEmail('header')} type="text" placeholder="Email Header" className="border border-gray-300 p-2 rounded-md" />
          <input {...registerEmail('email', { required: true })} type="email" placeholder="Email" className="border border-gray-300 p-2 rounded-md" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
            <PencilIcon className="h-6 w-6" />
            <span>Add Email Entry</span>
          </button>
        </form>
        {emailEntries.map((entry, index) => (
          <div key={index} className="flex items-center space-x-4">
            {editEmail === entry ? (
              <form onSubmit={handleSubmitEmail(handleEmailEditConfirm)} className="flex items-center space-x-4">
                <input {...registerEmail('header')} defaultValue={entry.header} className="border border-gray-300 p-2 rounded-md" />
                <input {...registerEmail('email', { required: true })} defaultValue={entry.email} className="border border-gray-300 p-2 rounded-md" />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <CheckIcon className="h-6 w-6" />
                  <span>Confirm</span>
                </button>
                <button onClick={handleEmailEditCancel} className="bg-yellow-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <StopIcon className="h-6 w-6" />
                  <span>Cancel</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-4">
                <h2 className="font-bold">{entry.header}</h2>
                <p>{entry.email}</p>
                <button onClick={() => handleEmailEditStart(entry)} className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <PencilIcon className="h-6 w-6" />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleEmailDelete(entry)} className="bg-red-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <XMarkIcon className="h-6 w-6" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
      <section>
        <form onSubmit={handleSubmitPhone(handlePhoneSubmit)} className="flex flex-col space-y-4">
          <input {...registerPhone('header')} type="text" placeholder="Phone Header" className="border border-gray-300 p-2 rounded-md" />
          <input {...registerPhone('phone', { required: true })} type="tel" placeholder="Phone Number" className="border border-gray-300 p-2 rounded-md" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
            <PencilIcon className="h-6 w-6" />
            <span>Add Phone Entry</span>
          </button>
        </form>
        {phoneEntries.map((entry, index) => (
          <div key={index} className="flex items-center space-x-4">
            {editPhone === entry ? (
              <form onSubmit={handleSubmitPhone(handlePhoneEditConfirm)} className="flex items-center space-x-4">
                <input {...registerPhone('header')} defaultValue={entry.header} className="border border-gray-300 p-2 rounded-md" />
                <input {...registerPhone('phone', { required: true })} defaultValue={entry.phone} className="border border-gray-300 p-2 rounded-md" />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <CheckIcon className="h-6 w-6" />
                  <span>Confirm</span>
                </button>
                <button onClick={handlePhoneEditCancel} className="bg-yellow-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <StopIcon className="h-6 w-6" />
                  <span>Cancel</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-4">
                <h2 className="font-bold">{entry.header}</h2>
                <p>{entry.phone}</p>
                <button onClick={() => handlePhoneEditStart(entry)} className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <PencilIcon className="h-6 w-6" />
                  <span>Edit</span>
                </button>
                <button onClick={() => handlePhoneDelete(entry)} className="bg-red-500 text-white p-2 rounded-md flex items-center space-x-2">
                  <XMarkIcon className="h-6 w-6" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
      <section>
        <form onSubmit={handleSubmitAddress(handleAddressSubmit)} className="flex flex-col space-y-4">
          <input {...registerAddress('street1', { required: true })} defaultValue={address.street1} type="text" placeholder="Street 1" className="border border-gray-300 p-2 rounded-md" />
          <input {...registerAddress('street2')} defaultValue={address.street2} type="text" placeholder="Street 2" className="border border-gray-300 p-2 rounded-md" />
          <input {...registerAddress('city', { required: true })} defaultValue={address.city} type="text" placeholder="City" className="border border-gray-300 p-2 rounded-md" />
          <input {...registerAddress('state', { required: true })} defaultValue={address.state} type="text" placeholder="State" className="border border-gray-300 p-2 rounded-md" />
          <input {...registerAddress('zip', { required: true })} defaultValue={address.zip} type="text" placeholder="Zip Code" className="border border-gray-300 p-2 rounded-md" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md flex items-center space-x-2">
            <PencilIcon className="h-6 w-6" />
            <span>Update Address</span>
          </button>
        </form>
      </section>
    </div>
  );
}