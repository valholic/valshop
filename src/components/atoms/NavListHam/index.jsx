import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function NavListHam({img, path, name, handleBurger}) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={`flex flex-wrap items-center w-full h-8 gap-3 px-5 my-5 cursor-pointer hover:bg-cyan-100 ${location.pathname === `/${params.uid}/${path}` ? 'bg-cyan-100' : ''}`} onClick={location.pathname === `/${params.uid}/${path}` ? () => navigate() : () => {
                navigate(`/${params.uid}/${path}`);
                if(handleBurger) {
                    handleBurger(false);
                }
            }}>
            <img src={img} className="h-4" />
            <p className="text-lg">{name}</p>
        </div>
    )
}
