export default function CustomerList({ name, boughtAmount, date }) {
    return (
        <div className="flex w-full h-10 p-2 bg-slate-100">
            <p className="w-1/3">{name}</p>
            <p className="w-1/3">{boughtAmount}</p>
            <p className="w-1/3">{date}</p>
        </div>
    )
}
