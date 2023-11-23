import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        Cookies.remove("rT");
        Cookies.remove("aT");
        setAuth({});
        
    };

    return logout;
};

export default useLogout;
