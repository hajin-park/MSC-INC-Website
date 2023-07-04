import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../utils/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AdminSidebar from '../components/AdminPage/AdminSidebar';

export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (currentUser) {
        const checkAdmin = async () => {
            const docRef = doc(db, 'users', currentUser.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && docSnap.data().role === 'admin') {
                setIsAdmin(true);
            } else {
                setError('You do not have access to this page.');
            }
        }

        checkAdmin();
        }
    }, [currentUser]);

    const onSubmit = async (data) => {
        try {
        await signin(data.email, data.password);
        } catch {
        setError('Failed to sign in');
        }
    }

    return (
    isAdmin ? (
        <div className="w-full min-h-screen flex flex-grow pt-20">
            <AdminSidebar/>
            <Outlet />
        </div>
    ) : (
        <div className="w-full min-h-screen flex flex-col pt-20">
            {error && <span className="text-red-500 font-bold">{error}</span>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                <input {...register('email', { required: true })} type="email" placeholder="Email" className="py-2 px-4 border border-gray-300 rounded-md"/>
                {errors.email && <span className="text-red-500">This field is required</span>}
                <input {...register('password', { required: true })} type="password" placeholder="Password" className="py-2 px-4 border border-gray-300 rounded-md"/>
                {errors.password && <span className="text-red-500">This field is required</span>}
                <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md">Sign In</button>
            </form>
        </div>
    )
    );
}