import { Button } from "../../atoms";

export default function AddCart({amount, handleAmount, price, stock, handleIsCart, handleAddCart, title}) {
    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-600 opacity-20">
            </div>
            <div className="fixed z-50 w-1/2 p-2 rounded-md top-1/4 h-44 bg-slate-100 left-1/4 right-1/4">
                <p className="mb-5 text-xl font-bold">{title}</p>
                <div className="flex items-center w-full h-fit gap-x-2">
                    <Button buttonName={'➖'} type={'button'} addSize={'w-fit p-1'} onClick={amount <= 0 ? () => handleAmount(0) : () => handleAmount(amount - 1)} />
                    <p>{amount}</p>
                    <Button buttonName={'➕'} type={'button'} addSize={'w-fit p-1'} onClick={amount >= stock ? () => handleAmount(stock) : () => handleAmount(amount + 1)} />
                </div>
                <p className="my-2 text-base">Total: Rp{price * amount}</p>
                <div className="flex mt-2 gap-x-2">
                    <Button buttonName={'Cancel'} type={'button'} addSize={'w-1/5 h-8'} onClick={() => {
                                            handleIsCart(false);
                                        }} />
                    <Button buttonName={'Add'} type={'button'} addSize={'w-1/5 h-8'} onClick={handleAddCart} />
                </div>
            </div>
        </>
    )
}
