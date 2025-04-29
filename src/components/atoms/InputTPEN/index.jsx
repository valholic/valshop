export default function InputTPEN({type, name, label, addSize, placeholder, handleChange, value, addMargin, ...rest}) {
    return (
        <label htmlFor={name} className={`${addSize ? addSize : 'w-3/5'} ${addMargin ? addMargin : 'm-auto'} cursor-pointer`}>
            {label}
            <input type={type} name={name} id={name} {...rest} className={`box-border block w-full h-8 p-2 ${label ? 'mt-2' : ''} text-sm rounded-md cursor-pointer`} placeholder={placeholder} value={value} onChange={(e) => handleChange(e.target.value)}  />
        </label>
    )
}
