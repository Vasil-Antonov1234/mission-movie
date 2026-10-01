import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { onLogin } = useContext(UserContext);
    const { BASE_URL } = useFetch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
            navigate("/login");
            return;
        };

        (async () => {

            try {
                const response = await fetch(`${BASE_URL}/auth/me`, {
                    headers: {
                        authorization: token
                    }
                });

                if (!response.ok) {
                    navigate("/login");
                    return;
                }

                const user = await response.json();

                onLogin(user);

            } catch (error) {
                toast.error(`Auth callback error: ${error}`);
                navigate("/login");
            }
        })()

    }, [navigate, onLogin, BASE_URL]);

    return (
        <p>Signing you in…</p>
    );
}