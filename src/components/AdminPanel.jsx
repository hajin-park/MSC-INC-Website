export default function AdminPanel({ name, children }) {
    return (
        <section className="bg-custom-background p-6 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold mb-4 text-custom-text">{name}</h2>
            {children}
        </section>
    )
}