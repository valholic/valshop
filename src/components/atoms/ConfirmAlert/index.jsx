import Button from "../Button";

export default function ConfirmAlert({ handleYes, title, handleNo }) {
    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center w-screen h-screen bg-slate-600 opacity-20">

            </div>
            <div className="fixed z-50 w-1/3 h-40 p-2 rounded-md top-1/4 bg-slate-100 left-1/3 right-1/3">
                <p className="text-2xl font-bold">Confirm to continue</p>
                <p className="my-5 text-base">{title}</p>
                <div className="flex items-end flex-1 gap-x-2">
                    <Button buttonName={'No'} type={'button'} addSize={'w-1/5 h-8'} onClick={() => {
                        handleNo(false);
                    }} />
                    <Button buttonName={'Yes'} type={'button'} addSize={'w-1/5 h-8'} onClick={handleYes} />
                </div>
            </div>
        </>
    )
}
