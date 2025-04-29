import { Cross } from "../../../assets";

export default function Tag({tags, handleTag}) {
    return (
        <div className="box-border flex h-6 px-2 border-black rounded-lg justify-evenly w-fit bg-slate-300">{tags} <img src={Cross} className="h-6" onClick={()=> handleTag(tags)} /></div>
    )
}
