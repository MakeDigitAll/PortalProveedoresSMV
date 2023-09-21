import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        Cookies.remove("rT");
        Cookies.remove("aT");
        localStorage.removeItem("r");
        localStorage.removeItem("iV");
        localStorage.removeItem("ID");
        localStorage.removeItem("img");
        localStorage.removeItem("username");
        localStorage.removeItem("imgURL");

        setAuth({});
    };

    return logout;
};

export default useLogout;
