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
                setError("Falha ao carregar os dados do usuário.");
            } finally {
                setLoading(false);
            }
        }; loadUserData();
    }, []);

    if (loading) { return <p>Carregando...</p>; }

    if (error) { return <p style={{ color: "red" }}>{error}</p>; }

    return (
        <div className="flex bg-[#e8e6e8] min-h-screen">
            <LeftMenu role={userData.userRole} name={userData.name} />
            <main className="flex-1 p-6 ml-72 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
}

export default DashBoard;