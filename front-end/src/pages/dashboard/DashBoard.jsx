import LeftMenu from "../../components/menu/LeftMenu.jsx";
import { useEffect, useState } from "react";
import { getUserData } from "../../service/userInfoService.js";
import { Outlet } from "react-router-dom";

function DashBoard() {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await getUserData();
                setUserData(data);
            } catch (err) {
                console.error(err);
                setError("Falha ao carregar os dados do usuário.");
            } finally {
                setLoading(false);
            }
        }; 
        loadUserData();
    }, []);

    if (loading) { 
        return <p className="text-center mt-10">Carregando...</p>; 
    }

    if (error) { 
        return <p className="text-center mt-10 text-red-500">{error}</p>; 
    }

    let displayName = '';
    if (userData) { 
        switch (userData.userRole) {
            case 'ONG':
                displayName = userData.organizationName;
                break;
            case 'USER':
                displayName = userData.name;
                break;
            case 'ADMIN':
                displayName = 'Admin';
                break;
            default:
                displayName = 'Visitante';
        }
    }

    return (
        <div className="flex bg-[#e8e6e8] min-h-screen">
            <LeftMenu role={userData.userRole} name={displayName} />
            <main className="flex-1 p-6 ml-72"> 
                <Outlet />
            </main>
        </div>
    );
}

export default DashBoard;