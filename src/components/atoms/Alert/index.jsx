export default function Alert({ error, msg }) {
    return (
        <div className={`w-2/5 h-auto p-4 ${error ? 'bg-red-300': 'bg-green-300'} border border-red-400`}>
            <p className="text-base font-bold">{msg}</p>
        </div>
    )
}
