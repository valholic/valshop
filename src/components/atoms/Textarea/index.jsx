export default function Textarea({label, name, placeholder, handleChange, value, addSize, addInputSize, ...rest}) {
    return (
        <label htmlFor={name} className={`${addSize ? addSize : 'w-3/5'} m-auto cursor-pointer`}>
            {label}
            <textarea name={name} id={name} placeholder={placeholder} onChange={(e) => handleChange(e.target.value)} value={value} className={`block box-border w-full h-20 rounded-md p-2 text-sm cursor-pointer ${addInputSize? addInputSize : ''}`} {...rest} ></textarea>
        </label>
    )
}
