import { setUser, setLoading, setError } from "../state/auth.slice";
import { registerApi } from "../../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();

    const register = async ({ email, contact, password, fullname, isSeller = false }) => {
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
    }

    return { register };

}