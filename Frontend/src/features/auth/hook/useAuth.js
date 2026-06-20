import { setUser, setLoading, setError } from "../state/auth.slice";
import { registerApi, loginApi } from "../../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async ({ email, contact, password, fullname, isSeller = false }) => {
        dispatch(setLoading(true));
        try {
            const data = await registerApi({ email, contact, password, fullname, isSeller });
            dispatch(setUser(data.user));
            return { success: true, user: data.user };
        } catch (err) {
            const message = typeof err === "string" ? err : err?.message || "Registration failed";
            dispatch(setError(message));
            return { success: false, error: message };
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleLogin = async ({ email, password }) => {
        dispatch(setLoading(true));
        try {
            const data = await loginApi({ email, password });
            dispatch(setUser(data.user));
            return { success: true, user: data.user };
        } catch (err) {
            const message = typeof err === "string" ? err : err?.message || "Login failed";
            dispatch(setError(message));
            return { success: false, error: message };
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { handleRegister, handleLogin };
};