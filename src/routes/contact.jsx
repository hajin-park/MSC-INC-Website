import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Contact() {
    const [contactData, setContactData] = useState({ address: {}, emailEntries: [], phoneEntries: [] });

    useEffect(() => {
        const docRef = doc(db, 'pages', 'ContactPage');
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setContactData(doc.data());
        });
    
        return unsubscribe;
      }, []);

    return (
        <section className="w-full min-h-full flex-grow bg-zinc-50 pt-32 p-16">
            <h1 className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-center tracking-tight">Contact Us!</h1>
            <h2 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-2xl sm:text-xl text-xl text-left">
                Our Location
            </h2>
            <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg text-left">
                {contactData.address.street1}
            </p>
            <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg text-left">
                {contactData.address.street2}
            </p>
            <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg text-left">
                {contactData.address.city}, {contactData.address.state}, {contactData.address.zip}
            </p>

            {contactData.emailEntries.map(entry => (
                <div key={crypto.randomUUID()}>
                    <h2 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-2xl sm:text-xl text-xl text-left">{entry.header}:</h2>
                    <p className="mt-4 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg text-left">{entry.email}</p>
                </div>
            ))}
            {contactData.phoneEntries.map(entry => (
                <div key={crypto.randomUUID()} className="flex space-x-4">
                    <h2 className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg">{entry.header}:</h2>
                    <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg">{entry.phone}</p>
                </div>
            ))}
            <p className="mt-8 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg text-center">
                If you have any further questions or concerns please contact the Merced Senior Community Center at 209- 385-8803. Thank you for visiting our website and we look forward to your visit!
            </p>
        </section>
    );
}
