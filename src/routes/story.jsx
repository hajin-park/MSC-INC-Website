import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Story() {
    const [storyData, setStoryData] = useState({ textEntries: [], peopleEntries: [] });

    useEffect(() => {
        const docRef = doc(db, 'pages', 'StoryPage');
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setStoryData(doc.data());
        });
    
        return unsubscribe;
      }, []);

    return (
        <section className="w-full min-h-full flex-grow bg-zinc-50 pt-32 p-16">
            <h1 className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-center tracking-tight">Our Story!</h1>
            {storyData.textEntries.map(entry => (
                <div key={crypto.randomUUID()}>
                    <h2 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-2xl sm:text-xl text-xl text-left">{entry.header}</h2>
                    <p className="mt-4 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg text-left">{entry.body}</p>
                </div>
            ))}
            {storyData.peopleEntries.map(person => (
                <div key={crypto.randomUUID()} className="flex space-x-4">
                    <span className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg">{person.type}</span>
                    <span className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg">{person.name}</span>
                    <span className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg">{person.contact}</span>
                    <span className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg">{person.role}</span>
                </div>
            ))}
        </section>
    );
}
