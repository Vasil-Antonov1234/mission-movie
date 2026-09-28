import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { onLogin } = useContext(UserContext);
    const [isPending, setIsPending] = useState(false);
    
    useEffect(() => {    
        setIsPending(true)
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
            navigate("/login");
            return;
        };

        (async () => {
            
            try {
                const response = await fetch("http://localhost:5000/auth/me", {
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
            } finally {
                setIsPending(false);
            }
        })()

    }, [navigate, onLogin]);

    return (
        // <p>Signing you in…</p>
        <Loading isPending={isPending}/>
    );
}