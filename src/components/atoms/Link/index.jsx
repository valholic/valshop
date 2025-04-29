export default function Link({linkName, addClass, ...rest}) {
    return (
        <p className={`text-center underline cursor-pointer ${addClass ? addClass : ''}`} {...rest}>{linkName}</p>
    )
}
