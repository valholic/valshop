export default function InputSelect({name, values, value, label, handleChange}) {
    return (
        <>
        <label htmlFor={name}>
            {label}
            <select name={name} id={name} value={value} required className="box-border block w-40 h-8 p-1 mt-2 text-sm rounded-md" onChange={(e) => {
                handleChange(e.target.value);
            }}>
                <option value="">Select type</option>
                {values.map((value, i) => {
                    return <option key={i} value={value}>{value}</option>
                })}
            </select>
        </label>
        </>
    )
}
