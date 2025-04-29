export default function Button({type, buttonName, addSize, addColor, ...rest}) {
    return (
        <button type={type} className={`${addSize ? addSize: 'w-3/5 h-8'} ${addColor ? addColor : 'bg-black text-white'} rounded-md cursor-pointer`} {...rest}>{buttonName}</button>
    )
}
