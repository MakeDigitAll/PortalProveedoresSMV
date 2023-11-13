import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { Input, Button, Link, Spinner } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RiDashboard2Fill, RiPencilLine } from "react-icons/ri";
import { MdArrowBack, MdSave } from "react-icons/md";
import Header from "../../components/header/headerC/Header";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import useAuth from '../../hooks/useAuth';
import '../../App.css';
import ba from '../../../public/Blank-Avatar.png';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';



const Profile = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const [dataChanged, setDataChanged] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(true);

    const [image, setImage] = useState(null);
    const [user, setUser] = useState({
        profileName: '',
        address: '',
        col: '',
        city: '',
        postalCode: '',
        country: '',
        state: '',
        contact: '',
        phone: '',
        email: '',
    });


    const [isInvalid, setIsInvalid] = useState({
        profileName: false,
        address: false,
        col: false,
        city: false,
        postalCode: false,
        country: false,
        state: false,
        contact: false,
        phone: false,
        email: false,
    });

    const [errorMessage, setErrorMessage] = useState({
        profileName: '',
        address: '',
        col: '',
        city: '',
        postalCode: '',
        country: '',
        state: '',
        contact: '',
        phone: '',
        email: '',
    })


    const countriesWithStates = {
        'México': ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo Leon', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
        'Estados Unidos': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Carolina del Norte', 'Carolina del Sur', 'Colorado', 'Connecticut', 'Dakota del Norte', 'Dakota del Sur', 'Delaware', 'Florida', 'Georgia', 'Hawái', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Luisiana', 'Maine', 'Maryland', 'Massachusetts', 'Míchigan', 'Minnesota', 'Misisipi', 'Misuri', 'Montana', 'Nebraska', 'Nevada', 'Nueva Jersey', 'Nueva York', 'Nuevo Hampshire', 'Nuevo México', 'Ohio', 'Oklahoma', 'Oregón', 'Pensilvania', 'Rhode Island', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Virginia Occidental', 'Washington', 'Wisconsin', 'Wyoming'],
        'Canadá': ['Alberta', 'Columbia Británica', 'Isla del Príncipe Eduardo', 'Manitoba', 'Nueva Escocia', 'Nuevo Brunswick', 'Ontario', 'Quebec', 'Saskatchewan', 'Terranova y Labrador', 'Territorios del Noroeste', 'Yukón', 'Nunavut'],
        'Alemania': ['Baden-Wurtemberg', 'Baviera', 'Berlín', 'Brandeburgo', 'Bremen', 'Hamburgo', 'Hesse', 'Mecklemburgo-Pomerania Occidental', 'Baja Sajonia', 'Renania del Norte-Westfalia', 'Renania-Palatinado', 'Sarre', 'Sajonia', 'Sajonia-Anhalt', 'Schleswig-Holstein', 'Turingia'],
        'Corea del Norte': ['Pyongyang', 'Hamgyong del Norte', 'Hamgyong del Sur', 'Ryanggang', 'Chagang', 'Jagang', 'Hwanghae del Norte', 'Hwanghae del Sur', 'Kangwon', 'Pyongan del Norte', 'Pyongan del Sur'],
        'Rusia': ['Adiguesia', 'Altái', 'Baskortostán', 'Buriatia', 'Chechenia', 'Chuvashia', 'Daguestán', 'Ingusetia', 'Kabardino-Balkaria', 'Kalmukia', 'Karachay-Cherkessia', 'Carelia', 'Komi', 'Mari El', 'Mordovia', 'Osetia del Norte', 'Sajá', 'Osetia del Sur', 'Tatarstán', 'Tuva', 'Udmurtia', 'Jakasia', 'Janti-Mansi', 'Chukotka', 'Jabárovsk', 'Kamchatka', 'Magadán', 'Primorie', 'Sajalín', 'Amur', 'Arjánguelsk', 'Arcángel', 'Kaliningrado', 'Leningrado', 'Múrmansk', 'Nóvgorod', 'Pskov', 'Rostov', 'Smolensk', 'Tver', 'Vólogda', 'Ivánovo', 'Kostromá', 'Moscú', 'Tula', 'Yaroslavl', 'Belgorod', 'Briansk', 'Vladimir', 'Vorónezh', 'Iaroslavl', 'Kaluga', 'Kursk', 'Lipetsk', 'Oryol', 'Riazán', 'Tambov', 'Astracán', 'Volgogrado', 'Rostov', 'Vladimir', 'Vorónezh', 'Iaroslavl', 'Moscú', 'San Petersburgo'],
        'Antartida': ['Antártida Argentina', 'Antártida Chilena', 'Antártida Británica', 'Antártida Noruega', 'Antártida Rusa'],
        'Japon': ['Aichi', 'Akita', 'Aomori', 'Chiba', 'Ehime', 'Fukui', 'Fukuoka', 'Fukushima', 'Gifu', 'Gunma', 'Hiroshima', 'Hokkaido', 'Hyougo', 'Ibaraki', 'Ishikawa', 'Iwate', 'Kagawa', 'Kagoshima', 'Kanagawa', 'Kochi', 'Kumamoto', 'Kioto', 'Mie', 'Miyagi', 'Miyazaki', 'Nagano', 'Nagasaki', 'Nara', 'Niigata', 'Oita', 'Okayama', 'Okinawa', 'Osaka', 'Saga', 'Saitama', 'Shiga', 'Shimane', 'Shizuoka', 'Tochigi', 'Tokushima', 'Tokio', 'Tottori', 'Toyama', 'Wakayama', 'Yamagata', 'Yamaguchi', 'Yamanashi'],
        'China': ['Anhui', 'Fujian', 'Gansu', 'Guangdong', 'Guizhou', 'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hubei', 'Hunan', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanxi', 'Sichuan', 'Taiwán', 'Yunnan', 'Zhejiang', 'Mongolia Interior', 'Ningxia', 'Pekín', 'Shanghai', 'Tianjin', 'Chongqing', 'Xinjiang', 'Tíbet', 'Hong Kong', 'Macao'],
        'India': ['Andaman y Nicobar', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra y Nagar Haveli', 'Daman y Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu y Cachemira', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Orissa', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura', 'Uttaranchal', 'Uttar Pradesh', 'Bengala Occidental'],
        'Reino Unido': ['Inglaterra', 'Irlanda del Norte', 'Escocia', 'Gales'],
        'Francia': ['Alsacia', 'Aquitania', 'Auvernia', 'Baja Normandía', 'Borgoña', 'Bretaña', 'Centro', 'Champaña-Ardenas', 'Córcega', 'Franco Condado', 'Alta Normandía', 'Isla de Francia', 'Languedoc-Rosellón', 'Limusín', 'Lorena', 'Mediodía-Pirineos', 'Norte-Paso de Calais', 'Países del Loira', 'Picardía', 'Poitou-Charentes', 'Provenza-Alpes-Costa Azul', 'Ródano-Alpes'],
        'Italia': ['Abruzos', 'Apulia', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romaña', 'Friuli-Venecia Julia', 'Lacio', 'Liguria', 'Lombardía', 'Marcas', 'Molise', 'Piamonte', 'Sardegna', 'Sicilia', 'Toscana', 'Trentino-Alto Adigio', 'Umbria', 'Valle de Aosta', 'Veneto'],
        'España': ['Andalucía', 'Aragón', 'Principado de Asturias', 'Baleares', 'Canarias', 'Cantabria', 'Castilla-La Mancha', 'Castilla y León', 'Cataluña', 'Extremadura', 'Galicia', 'La Rioja', 'Comunidad de Madrid', 'Región de Murcia', 'Comunidad Foral de Navarra', 'País Vasco', 'Comunidad Valenciana'],
        'Portugal': ['Aveiro', 'Beja', 'Braga', 'Braganza', 'Castelo Branco', 'Coímbra', 'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre', 'Oporto', 'Santarém', 'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu', 'Azores', 'Madeira'],
        'Suecia': ['Blekinge', 'Dalarna', 'Gävleborg', 'Gotland', 'Halland', 'Jämtland', 'Jönköping', 'Kalmar', 'Kronoberg', 'Norrbotten', 'Örebro', 'Östergötland', 'Skåne', 'Södermanland', 'Estocolmo', 'Uppsala', 'Värmland', 'Västerbotten', 'Västernorrland', 'Västmanland', 'Västra Götaland'],
        'Suiza': ['Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basilea-Campiña', 'Basilea-Ciudad', 'Berna', 'Friburgo', 'Ginebra', 'Glaris', 'Grisones', 'Jura', 'Lucerna', 'Neuchâtel', 'Nidwalden', 'Obwalden', 'San Galo', 'Schaffhausen', 'Schwyz', 'Solothurn', 'Tesino', 'Turgovia', 'Uri', 'Valais', 'Vaud', 'Zug', 'Zurich'],
        'Austria': ['Burgenland', 'Carintia', 'Baja Austria', 'Alta Austria', 'Salzburgo', 'Estiria', 'Tirol', 'Vorarlberg', 'Viena'],
        'Bélgica': ['Amberes', 'Brabante Flamenco', 'Brabante Valón', 'Flandes', 'Hainaut', 'Lieja', 'Limburgo', 'Luxemburgo', 'Namur', 'Región de Bruselas-Capital', 'Valonia'],
        'Colombia': ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'],
        'Ecuador': ['Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi', 'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas', 'Imbabura', 'Loja', 'Los Ríos', 'Manabí', 'Morona-Santiago', 'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena', 'Santo Domingo de los Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora-Chinchipe'],
        'Perú': ['Amazonas', 'Ancash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cuzco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'],
        '': ['']
    };

    const countriesWithoutEmpty = Object.fromEntries(
        Object.entries(countriesWithStates).filter(([country, states]) => country !== '')
    );

    const orderCountries = Object.fromEntries(
        Object.entries(countriesWithoutEmpty).sort((a, b) => a[0].localeCompare(b[0]))
    );

    const validatePhone = (value) => {
        return value.match(/^[0-9]{11}$/);
    }

    const validatepostalCode = (value) => {
        return value.match(/^[0-9]{6}$/);
    }


    const handleChange = (e) => {
            const changeInputs = dataChanged;

        if (changeInputs === false) {
            setDataChanged(true);
        }
        console.log(e.target.value)

        switch (e.target.name) {
            case 'postalCode':
                if (validatepostalCode(e.target.value)) {
                    return;
                }
                break;
            case 'phone':
                if(validatePhone(e.target.value)){
                    return;
                }
                break;
            default:
                break;
        }

        setUser({ ...user, [e.target.name]: e.target.value });
        setIsInvalid({ ...isInvalid, [e.target.name]: false });
        setErrorMessage({ ...errorMessage, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(user.profileName === ''){
            toast.error('El nombre del usuario es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, profileName: true});
            setErrorMessage({ ...errorMessage, profileName: 'valor obligatorio'});
            return;
        }
        if (user.profileName.length > 100) {
            toast.error('El nombre del usuario debe tener menos de 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, profileName: true});
            setErrorMessage({ ...errorMessage, profileName: 'valor demasiado extenso'});
            return;
        }

        if (user.address === '') {
            toast.error('El campo Dirección es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, address: true});
            setErrorMessage({ ...errorMessage, address: 'valor obligatorio'});
            return;
        }

        if (user.address.length > 100) {
            toast.error('La dirección debe tener menos de 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, address: true});
            setErrorMessage({ ...errorMessage, address: 'valor demasiado extenso'});
            return;
        }

        if (user.col === '') {
            toast.error('El campo Colonia es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, col: true});
            setErrorMessage({ ...errorMessage, col: 'campo obligatorio'});
            return;
        }

        if (user.col.length > 100) {
            toast.error('La colonia debe tener menos de 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, col: true});
            setErrorMessage({ ...errorMessage, col: 'valor demasiado extenso'});
            return;
        }

        if (user.city === '') {
            toast.error('El campo Ciudad es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, city: true});
            setErrorMessage({ ...errorMessage, city: 'campo obligatorio'});
            return;
        }

        if (user.city.length > 100) {
            toast.error('La ciudad debe tener menos de 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            })
            setIsInvalid({ ...isInvalid, city: true});
            setErrorMessage({ ...errorMessage, city: 'valor demasiado extenso'});
            return;
        }

        if (user.postalCode === '') {
            toast.error('El campo Código Postal es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, postalCode: true});
            setErrorMessage({ ...errorMessage, postalCode: 'campo obligatorio'});
            return;
        }

        if (user.postalCode.length !== 5) {
            console.log(user.postalCode)
            toast.error('El campo Código Postal no es valido', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            })
            setIsInvalid({ ...isInvalid, postalCode: true});
            setErrorMessage({ ...errorMessage, postalCode: 'valor no valido'});
        }

        if (user.country === '') {
            toast.error('El campo Pais es obligatorio', {
                position: "bottom-right", 
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, country: true});
            setErrorMessage({ ...errorMessage, country: 'campo obligatorio'});
            return;
        }

        if (user.state === '') {
            toast.error('El campo Estado es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, state: true});
            setErrorMessage({ ...errorMessage, state: 'campo obligatorio'});
            return;
        }

        if (user.contact === '') {
            toast.error('El campo Contacto es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, contact: true});
            setErrorMessage({ ...errorMessage, contact: 'campo obligatorio'});
            return;
        }

        if (user.phone === '') {
            toast.error('El campo Telefono es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, phone: true});
            setErrorMessage({ ...errorMessage, phone: 'campo obligatorio'});
            return;
        }

        if (user.phone.length > 10) {
            toast.error('El campo Telefono debe tener menos de 10 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, phone: true});
            setErrorMessage({ ...errorMessage, phone: 'numero telefonico no valido'});
            return;
        }

        if (user.email === '') {
            toast.error('El campo Email es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, email: true});
            setErrorMessage({ ...errorMessage, email: 'campo obligatorio'});
            return;
        }

        if (user.email.length > 100) {
            toast.error('El campo Email debe tener menos de 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, email: true});
            setErrorMessage({ ...errorMessage, email: 'valor demasiado extenso'});
            return;
        }

        if (!validateEmail(user.email)) {
            toast.error('El email proporcionado no es valido', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            setIsInvalid({ ...isInvalid, email: true});
            setErrorMessage({ ...errorMessage, email: 'email no valido'});
            return;
        }


        setIsInvalid({ ...isInvalid, profileName: false, address: false, postalCode: false, phone: false, country: false, state: false, city: false, col: false, email: false});
        setErrorMessage({ ...errorMessage, profileName: '', address: '', postalCode: '', phone: '', country: '', state: '', city: '', col: '', email: ''});

        if (dataChanged === true) {
            // axios
            //     .put(`/users/profile/${auth.userId}`, user, {
            //     .then((res) => {
            //         toast.success('Tu perfil ha sido actualizado', {
            //             position: "bottom-right",
            //             hideProgressBar: false,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //             autoClose: 5000,
            //             theme: "colored",
            //         });
            //         setDataChanged(false);
            //     })
        }
    };

    const imageUser = React.useRef(null);

    const CountryDropdown = ({ value }) => {

        const handleCountryChange = (value) => {
            let nameCountry = 'country';
            let valueCountry = value.currentKey;
            let nameState = 'state';
            let valueState = '';
            setUser({ ...user, [nameCountry]: valueCountry, [nameState]: valueState });
        };

        return (
            <Dropdown
                backdrop="blur"
            >
                <DropdownTrigger>
                    <Button
                        className="w-60 mr-4 mt-4"
                        placeholder='País'
                        name='country'
                        isDisabled={isInputDisabled}
                    >
                        {user.country || 'Selecciona un país'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={value}
                    onSelectionChange={handleCountryChange}
                >
                    <DropdownSection>
                        {Object.keys(orderCountries).map((country) => (
                            <DropdownItem key={country} value={country}>
                                {country}
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        );
    };

    const StateDropdown = ({ country, value }) => {
        const handleStateChange = (value) => {
            let nameState = 'state';
            let valueState = value.currentKey;
            setUser({ ...user, [nameState]: valueState });
        };

        return (
            <Dropdown
                backdrop="blur"
            >
                <DropdownTrigger>
                    <Button
                        className="w-60 mr-4 mt-4"
                        placeholder='Estado'
                        name='state'
                        isDisabled={isInputDisabled}
                    >
                        {user.state || 'Selecciona un estado'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={value}
                    onSelectionChange={handleStateChange}
                >
                    <DropdownSection>
                        {orderCountries[country].map((state) => (
                            <DropdownItem key={state} value={state}>
                                {state}
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        );
    };



    const imagePreview = image ? URL.createObjectURL(image) : null;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                await getImageUser();
                const response = await axios.get(`/users/profile/${auth.userId}`);
                console.log(response.data);
                setUser({
                    profileName: response.data.profileName || response.data.providerName,
                    address: response.data.address,
                    col: response.data.col,
                    city: response.data.city,
                    postalCode: response.data.postalCode,
                    country: response.data.country,
                    state: response.data.state,
                    contact: response.data.contact,
                    phone: response.data.phone,
                    email: response.data.email,
                });
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    const getImageUser = async () => {
        try {
            axios.get(`/users/image/${auth.userId}`, {
                responseType: 'blob',
            }).then(response => {
                if (response.data.size !== 0) {
                    setImage(response.data);
                }
            }
            );
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleImage = async (e) => {
        try {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            await axios.put(`/users/image/${auth.userId}`, formData);
            toast.success('Imagen actualizada');
            getImageUser();
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDeleteImage = async () => {
        try {
            await axios.delete(`/users/image/${auth.userId}`);
            toast.success('Imagen eliminada');
            getImageUser();
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleUpdateData = async () => {
        try {
            await axios.put(`/pv/${auth.userId}`, data);
            toast.success('Datos actualizados');
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDeleteData = async () => {
        try {
            await axios.delete(`/pv/${auth.userId}`);
            toast.success('Datos eliminados');
            navigate('/app');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <ToastContainer />
            <div className="flex justify-between items-center ml-20 mt-10 mb-10">
                <div className="flex items-center md:sm">
                    <Breadcrumbs aria-label="breadcrumb" color="foreground">
                        <Link
                            className="text-foreground"
                            underline="hover"
                            sx={{ display: "flex", alignItems: "center" }}
                            color="foreground"
                            href="#"
                            onClick={() => navigate(`/Home`)}
                        >
                            <RiDashboard2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
                            Inicio
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            className="text-foreground"
                        >
                            <RiPencilLine sx={{ mr: 0.5 }} fontSize="inherit" />
                            Perfil
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center w-11/12 ml-20 mt-20">
                    <Spinner label="Cargando" />
                </div>
            ) : (
                <div className="flex flex-col justify-center text-center items-center w-full h-full lg:flex-row">
                    <div class=" lg:mt-10 lg:mb-10 lg:mr-10 mb-10 mt-10 flex flex-col justify-center items-center w-2/4 h-full lg:ml-10">
                        <img
                            className="w-96 h-96 rounded-full object-cover"
                            src={imagePreview || image || ba}
                            alt="Imagen del usuario"
                            ref={imageUser}
                        />
                        <input
                            className="w-96 bg-transparent p-2 rounded"
                            type="file"
                            name="image"
                            ref={imageUser}
                            onChange={handleImage}
                        />
                    </div>
                    <div className='flex flex-col justify-center items-center w-2/4 h-full mr-10'>
                        <Card className="px-10">
                            <CardHeader className="flex justify-center">
                                <div className="flex text-center justify-center">
                                    <label className="text-foreground font-bold text-lg text-center mt-4">Datos Generales</label>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="flex items-center">
                                    <Input
                                        className="w-60 mr-4 my-2"
                                        label="Nombre del usuario"
                                        labelPlacement='outside'
                                        placeholder='Nombre del usuario'
                                        name='profileName'
                                        isRequired
                                        errorMessage={errorMessage.profileName}
                                        isInvalid={isInvalid.profileName}
                                        value={user.profileName}
                                        onChange={handleChange}
                                        disabled={isInputDisabled}
                                    />
                                    <Input
                                        className="w-60 my-2 mr-4"
                                        label="Dirección"
                                        labelPlacement='outside'
                                        placeholder='Dirección'
                                        name='address'
                                        errorMessage={errorMessage.address}
                                        isInvalid={isInvalid.address}
                                        value={user.address}
                                        onChange={handleChange}
                                        disabled={isInputDisabled}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Input
                                        className="w-60 mr-4 my-2"
                                        label="Colonia"
                                        labelPlacement='outside'
                                        placeholder='Colonia'
                                        name='col'
                                        value={user.col}
                                        isInvalid={isInvalid.col}
                                        errorMessage={errorMessage.col}
                                        onChange={handleChange}
                                        disabled={isInputDisabled}
                                    />
                                    <Input
                                        className="w-60 my-2 mr-4"
                                        label="Ciudad"
                                        labelPlacement='outside'
                                        placeholder='Ciudad'
                                        name='city'
                                        value={user.city}
                                        errorMessage={errorMessage.city}
                                        isInvalid={isInvalid.city}
                                        onChange={handleChange}
                                        disabled={isInputDisabled}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Input
                                        className="w-60 my-2 mr-4"
                                        type='number'
                                        label="Código Postal"
                                        labelPlacement='outside'
                                        placeholder='Código Postal'
                                        name='postalCode'
                                        errorMessage={errorMessage.postalCode}
                                        value={user.postalCode}
                                        isInvalid={isInvalid.postalCode}
                                        onChange={handleChange}
                                        disabled={isInputDisabled}
                                    />
                                </div>
                                <div className="flex align-middle justify-center">
                                    <label className="text-foreground font-bold text-lg text-center my-2">País y Estado</label>
                                </div>
                                <div className="flex items-center">
                                    <CountryDropdown value={user.country} />
                                    {user.country !== '' && (
                                        <div className='flex text-center'>
                                            <StateDropdown country={user.country} value={user.state} />
                                        </div>
                                    )}

                                </div>
                                <div className="flex align-middle justify-center">
                                    <label className="text-foreground font-bold text-lg text-center my-2">Datos de Contacto</label>
                                </div>
                                <div className="flex items-center">
                                    <Input
                                        className="w-60 mr-4 my-2"
                                        label="Contacto"
                                        labelPlacement='outside'
                                        placeholder='Contacto'
                                        name='contact'
                                        errorMessage={errorMessage.contact}
                                        value={user.contact}
                                        isInvalid={isInvalid.contact}
                                        onChange={handleChange}
                                        disabled={isInputDisabled}
                                    />
                                    <Input
                                        className="w-60 my-2 mr-4"
                                        label="Teléfono"
                                        type='number'
                                        labelPlacement='outside'
                                        placeholder='Teléfono'
                                        name='phone'
                                        errorMessage={errorMessage.phone}
                                        value={user.phone}
                                        isInvalid={isInvalid.phone}
                                        onChange={handleChange}
                                        disabled={isInputDisabled}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Input
                                        className="w-60 mr-4 my-2"
                                        label="Correo electrónico"
                                        labelPlacement='outside'
                                        placeholder='Correo electrónico'
                                        name='email'
                                        isRequired
                                        errorMessage={errorMessage.email}
                                        value={user.email}
                                        isInvalid={isInvalid.email}
                                        onChange={handleChange}
                                        disabled={isInputDisabled}
                                    />
                                </div>
                            </CardBody>
                            <CardFooter className="flex justify-center">
                                {dataChanged && (
                                    <div className="flex justify-center mt-4">
                                        <Button
                                            auto
                                            startContent={<MdSave />}
                                            variant="success"
                                            className="bg-success hover:bg-secondary text-inherit font-bold p-3 w-72 h-12 mt-10"
                                            size="sm"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                            Guardar
                                        </Button>
                                    </div>
                                )}
                                {!dataChanged && (
                                    <div className="flex justify-center mt-4">
                                        <Button
                                            auto
                                            startContent={<MdArrowBack />}
                                            variant="success"
                                            className="bg-primary hover:bg-secondary text-inherit font-bold p-3 w-72 h-12 mt-10"
                                            size="sm"
                                            onClick={() => navigate(`/Home`)}
                                            disabled={loading}
                                        >
                                            Volver
                                        </Button>

                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile;