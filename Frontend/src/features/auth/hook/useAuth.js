import { setUser, setLoading, setError } from "../state/auth.slice";
import { registerApi, loginApi, getMe } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async ({ email, contact, password, fullname, isSeller = false }) => {
        dispatch(setLoading(true));
        try {
            const data = await registerApi({ email, contact, password, fullname, isSeller });
            const user = data?.user;
            if (user) dispatch(setUser(user));
            return { success: true, user };
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
            const user = data?.user;
            if (user) dispatch(setUser(user));
            dispatch(setUser(data.user));
            return { success: true, user };
        } catch (err) {
            const message = typeof err === "string" ? err : err?.message || "Login failed";
            dispatch(setError(message));
            return { success: false, error: message };
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGetMe = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getMe()
            const user = data?.user;
            if (user) dispatch(setUser(user));
            return { success: true, user };
        } catch (err) {
            const message = typeof err === "string" ? err : err?.message || " failed";
            dispatch(setError(message));
            return { success: false, error: message };
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin, handleGetMe };
};