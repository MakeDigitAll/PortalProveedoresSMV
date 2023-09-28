import AxiosInstance from '../components/axios/axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const rt = Cookies?.get('rT');
    const aT = Cookies?.get('aT');

    const cr = {
        aT: aT,
        rT: rt,
    }

    const refresh = async () => {
        try {
            const response = await AxiosInstance.post('/refreshToken', cr, 
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            setAuth(prev => {
       //         console.log(JSON.stringify(prev));
       //         console.log(response.data.accessToken);
                return {
                    ...prev,
                    accessToken: response.data.accessToken
                }
            });

            Cookies.set('aT', response.data.accessToken, { expires: 1 });

            return response.data.accessToken;
            
        } catch (error) {
            console.log('RT:', error);
            localStorage.removeItem('r');
            localStorage.removeItem('ID');
            localStorage.removeItem('userId');
            localStorage.removeItem('iV');
            localStorage.removeItem('username');
            Cookies.remove('aT');
            Cookies.remove('rT');
            navigate('/', { replace: true });
            alert('Su sesión ha expirado, por favor vuelva a iniciar sesión');
        }

    }
    return refresh;
};

export default useRefreshToken;