import { useNavigate } from "react-router-dom";
import { Link } from "../../../components";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-wrap items-center justify-center w-screen h-screen">
            <div className="w-full">
                <p className="items-center text-3xl font-bold text-center">Account not found</p>
                <p className="mb-5 font-bold text-center text-9xl">404</p>
                <Link linkName={'Back to login page'} addClass={'w-full'} onClick={() => {
                    navigate('/auth');
                }} />
            </div>
        </div>
    )
}
