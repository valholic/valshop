import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function NavList({list, path}) {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <p className="flex items-center justify-center h-8 px-4 py-2 rounded-full cursor-pointer hover:border-[2px] hover:border-black w-fit bg-slate-100" onClick={location.pathname === `/${params.uid}/home/${path}` ? () => navigate('') : () => navigate( `/${params.uid}/home/${path}`)}>
            {list}
        </p>
    )
}
