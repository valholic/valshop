import { Cross } from "../../../assets"

export default function PreviewImg({img, handleClick, file}) {
    return (
        <div key={img} className="relative w-40 h-40">
            <img src={img} className="w-40 h-40 rounded-md" />
            <img src={Cross} className="absolute top-0 right-0 z-30 w-6 h-6" onClick={() => handleClick(img, file)} />
        </div>
    )
}
