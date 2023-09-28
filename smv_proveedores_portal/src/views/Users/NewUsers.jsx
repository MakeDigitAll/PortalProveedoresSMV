import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdHomeFilled, MdSettings, MdSave, MdArrowBack } from 'react-icons/md';
import { RiDashboard2Fill } from 'react-icons/ri';
import { MdShoppingCart } from "react-icons/md";
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { Input, Button, Link } from "@nextui-org/react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import '../../App.css';
import ba from '../../../public/Blank-Avatar.png';

const NewUsers = () => {
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const { auth } = useAuth();
    const pvId = auth?.ID;
    const [user, setUser] = useState({
        profileName: '',
        address: '',
        col: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        contact: '',
        phone: '',
        email: ''
    });

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

    const [variable, setVariable] = useState('Nuevo usuario');
    const imageDistr = React.useRef(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const params = useParams();

    //----------------------------------------------------------------------------------------------------------
    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const validatePhone = (value) => {
        return value.match(/^[0-9]{10}$/i);
    };

    const validatePostalCode = (value) => {
        return value.match(/^[0-9]{5}$/i);
    };

    //-------------------------------------------------------------Validaciones de campos---------------------------------------------

    const handleSubmit = async (e) => {
        if (user.profileName === '') {
            toast.error('El nombre del usuario es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (user.profileName.length < 3 || user.profileName.length > 100) {
            toast.error('El nombre del usuario debe tener entre 3 y 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
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
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (user.address.length < 3 || user.address.length > 100) {
            toast.error('La dirección debe tener entre 3 y 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
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
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (user.col.length < 3 || user.col.length > 100) {
            toast.error('La colonia debe tener entre 3 y 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
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
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (user.city.length < 3 || user.city.length > 100) {
            toast.error('La ciudad debe tener entre 3 y 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
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
                autoClose: 10000,
                theme: "colored",
            });
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
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (user.postalCode.length < 5) {
            toast.error('El campo Código Postal debe tener 6 digitos', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (user.country === '') {
            toast.error('El campo País es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
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
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (user.phone === '') {
            toast.error('El campo Teléfono es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (user.phone.length < 10) {
            toast.error('El campo Teléfono debe tener 10 digitos', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (user.email === '') {
            toast.error('El campo Correo electrónico es obligatorio', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (!validateEmail(user.email)) {
            toast.error('El correo electrónico no es válido', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",

            });
            return;
        }

        setLoading(true);

        if (editing) {
            await submitImage();
            await axios.put(`/users/edit/${params.id}/${pvId}`, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    toast.success('usuario actualizado');
                    setLoading(false);
                    navigate('/users', { replace: true });
                }
            })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                    if (error.response.status === 400) {
                        toast.error(error.response.data.message);
                    }
                    if (error.response.status === 500) {
                        toast.error(error.response.data.message);
                    }
                    if (error.response.status === 404) {
                        toast.error(error.response.data.message);
                    }
                });

        } else {
            await axios.post(`/users/new/${pvId}`, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    toast.success('usuario creado');
                    submitImage(response.data.id); //Subir imagen
                    setLoading(false);
                    navigate('/users', { replace: true });
                }
            })
                .catch(error => {
                    setLoading(false);
                    if (error.response.status === 400) {
                        toast.error(error.response.data.error, {
                            position: "bottom-right",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            autoClose: 10000,
                            theme: "colored",
                        });
                    }
                    if (error.response.status === 500) {
                        toast.error(error.response.data.message, {
                            position: "bottom-right",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            autoClose: 10000,
                            theme: "colored",
                        });
                    }
                    if (error.response.status === 404) {
                        toast.error(error.response.data.message, {
                            position: "bottom-right",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            autoClose: 10000,
                            theme: "colored",
                        });
                    }
                });
        }
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        switch (name) {
            case 'postalCode':
                if (value.length > 5 || value.length < 0) {
                    return;
                }
                break;
            case 'phone':
                if (value.length > 10 || value.length < 0) {
                    return;
                }
                break;
            default:
                break;
        }

        setUser({ ...user, [name]: value });
    };

    const handleImage = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    };


    const submitImage = async (idU) => {
        const id = idU || params.id;
        const imgsubmit = image;
        if (imgsubmit) {
            try {
                const formData = new FormData();
                formData.append('image', image);
                await axios.put(`/usr/image/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    if (response.status === 200) {
                        console.log('Imagen actualizada', response);
                    }
                }).catch(error => {
                    console.log(error);
                    setLoading(false);
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('no se selecciono imagen');
        }
    }

    const getImage = async () => {
        await axios.get(`/users/image/${params.id}`, {
            responseType: 'blob',
        }).then(response => {
            console.log(response.data.size);
            if (response.data.size !== 0) {
                const imageBlob = response.data;
                const imageUrl = URL.createObjectURL(imageBlob);
                setImage(imageUrl);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    };



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


    const loadUser = async (id) => {
        await getImage();
        const response = await axios.get(`/users/get/${id}/${pvId}`);
        setUser({
            userName: response.data.profileName,
            address: response.data.address,
            col: response.data.col,
            city: response.data.city,
            state: response.data.state,
            postalCode: response.data.postalCode,
            country: response.data.country,
            contact: response.data.contact,
            phone: response.data.phone,
            email: response.data.email
        });
        setEditing(true);
        let url = window.location.pathname;
        let arr = url.split('/');
        if (arr[2] === 'Edit') {
            setVariable('Editar usuario');
            setIsInputDisabled(false);
        }
        if (arr[2] === 'View') {
            setVariable('Ver usuario');
            setIsInputDisabled(true);
        }
    };

    useEffect(() => {
        if (params.id) {
            loadUsers(params.id);
        } else {
            setLoading(false);
        }
    }, [params.id]);

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
                        <Link
                            className="text-foreground"
                            underline="hover"
                            sx={{ display: "flex", alignItems: "center" }}
                            color="foreground"
                            href="#"
                            onClick={() => navigate(`/users`)}
                        >
                            <MdSettings sx={{ mr: 0.5 }} fontSize="inherit" />
                            Usuarios
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            className="text-foreground"
                        >
                            <MdShoppingCart sx={{ mr: 0.5 }} fontSize="inherit" />
                            {variable}
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center w-full h-full">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <div className="flex flex-col justify-center text-center items-center w-full h-full lg:flex-row">
                    <div class=" lg:mt-10 lg:mb-10 lg:mr-10 mb-10 mt-10 flex flex-col justify-center items-center w-2/4 h-full lg:ml-10">
                        <img
                            className="w-96 h-96 rounded-full object-cover"
                            src={imagePreview || image || ba}
                            alt="Imagen del usuario"
                            ref={imageDistr}
                        />
                        {!isInputDisabled && (
                            <input
                                className="w-96 bg-transparent p-2 rounded"
                                type="file"
                                name="image"
                                ref={imageDistr}
                                onChange={handleImage}
                                disabled={isInputDisabled}
                            />
                        )}
                    </div>
                    <div className='flex flex-col justify-center items-center w-2/4 h-full mr-10'>
                        <div className="flex text-center justify-center">
                            <label className="text-foreground font-bold text-lg text-center mt-4">Datos Generales</label>
                        </div>
                        <div className="flex items-center">
                            <Input
                                className="w-60 mr-4 mt-4"
                                label="Nombre del usuario"
                                labelPlacement='outside'
                                placeholder='Nombre del usuario'
                                name='profileName'
                                value={user.profileName}
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                            <Input
                                className="w-60 mt-4 mr-4"
                                label="Dirección"
                                labelPlacement='outside'
                                placeholder='Dirección'
                                name='address'
                                value={user.address}
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                        </div>
                        <div className="flex items-center">
                            <Input
                                className="w-60 mr-4 mt-4"
                                label="Colonia"
                                labelPlacement='outside'
                                placeholder='Colonia'
                                name='col'
                                value={user.col}
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                            <Input
                                className="w-60 mt-4 mr-4"
                                label="Ciudad"
                                labelPlacement='outside'
                                placeholder='Ciudad'
                                name='city'
                                value={user.city}
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                        </div>
                        <div className="flex items-center">
                            <Input
                                className="w-60 mt-4 mr-4"
                                type='number'
                                label="Código Postal"
                                labelPlacement='outside'
                                placeholder='Código Postal'
                                name='postalCode'
                                value={user.postalCode}
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                        </div>
                        <div className="flex align-middle justify-center">
                            <label className="text-foreground font-bold text-lg text-center mt-4">País y Estado</label>
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
                            <label className="text-foreground font-bold text-lg text-center mt-4">Datos de Contacto</label>
                        </div>
                        <div className="flex items-center">
                            <Input
                                className="w-60 mr-4 mt-4"
                                label="Contacto"
                                labelPlacement='outside'
                                placeholder='Contacto'
                                name='contact'
                                value={user.contact}
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                            <Input
                                className="w-60 mt-4 mr-4"
                                label="Teléfono"
                                type='number'
                                labelPlacement='outside'
                                placeholder='Teléfono'
                                name='phone'
                                value={user.phone}
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                        </div>
                        <div className="flex items-center">
                            <Input
                                className="w-60 mr-4 mt-4"
                                label="Correo electrónico"
                                labelPlacement='outside'
                                placeholder='Correo electrónico'
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                                disabled={isInputDisabled}
                            />
                        </div>
                        {!isInputDisabled && (
                            <div className="flex justify-center mt-4">
                                <Button
                                    auto
                                    startContent={<MdSave />}
                                    variant="success"
                                    className="bg-primary hover:bg-red-700  text-white font-bold p-3 w-72 h-12 mt-10"
                                    size="sm"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    Guardar
                                </Button>
                            </div>
                        )}
                        {isInputDisabled && (
                            <div className="flex justify-center mt-4">
                                <Button
                                    auto
                                    startContent={<MdArrowBack />}
                                    variant="success"
                                    className="bg-primary hover:bg-red-700  text-white font-bold p-3 w-72 h-12 mt-10"
                                    size="sm"
                                    onClick={() => navigate(`/users`)}
                                    disabled={loading}
                                >
                                    Volver
                                </Button>

                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewUsers;

