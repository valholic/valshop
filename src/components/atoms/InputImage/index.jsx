export default function InputImage({name, label, ...rest}) {
    return (
        <label htmlFor={name}>
            {label}
            <input type="file" id={name} name={name} required className="block mt-2" {...rest} />
        </label>
    )
}
