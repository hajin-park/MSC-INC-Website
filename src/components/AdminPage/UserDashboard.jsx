import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function UserDashboard() {
  const [userData, setUserData] = useState([]);
  const [userStatus, setUserStatus] = useState('');

  // Subscribe to user updates
  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, 'users');
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserData(userList);
    }

    fetchUsers();
  }, [])

  // Handle functions
  const handleUserDelete = async (user) => {
    // TODO: Implement user deletion with Firebase Admin SDK in a secure environment
  }

  return (
    <div className="p-4 font-lato">
        {userStatus && <span className="text-red-500 font-bold">{userStatus}</span>}
        <div className="mt-4 grid grid-cols-1 gap-4">
            {userData.map((user) => (
            <div key={user.id} className="flex items-center space-x-2">
                <span>{user.id}</span>
                  <div className="flex items-center space-x-2">
                      <span>{user.role}</span>
                      <button onClick={() => handleUserDelete(user)} className="py-1 px-2 bg-red-500 text-white rounded-md flex items-center space-x-1">
                          <XMarkIcon className="h-5 w-5"/>
                          <span>Delete</span>
                      </button>
                  </div>
            </div>
            ))}
        </div>
    </div>
);
}