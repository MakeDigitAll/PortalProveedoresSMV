import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Spacer, Image, Input, Button, Grid, Dropdown, Link, Text } from '@nextui-org/react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton } from "../../components/Home/IconButton";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdHomeFilled, MdSettings, MdSave, MdPerson } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import '../../App.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const NewDistributors = () => {
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const { auth } = useAuth();
    const reference = auth?.referenceCode;
    const [distributor, setDistributor] = useState({
        distributorName: '',
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

    const [variable, setVariable] = useState('Nuevo distribuidor');
    const [loading, setLoading] = useState(false);
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
        if (distributor.distributorName === '') {
            alert('El campo Nombre del distribuidor es obligatorio');
            return;
        }
        if (distributor.address === '') {
            alert('El campo Dirección es obligatorio');
            return;
        }
        if (distributor.col === '') {
            alert('El campo Colonia es obligatorio');
            return;
        }
        if (distributor.city === '') {
            alert('El campo Ciudad es obligatorio');
            return;
        }
        if (distributor.state === '') {
            alert('El campo Estado es obligatorio');
            return;
        }
        if (distributor.postalCode === '') {
            alert('El campo Código Postal es obligatorio');
            return;
        }
        if (distributor.country === '') {
            alert('El campo País es obligatorio');
            return;
        }
        if (distributor.contact === '') {
            alert('El campo Contacto es obligatorio');
            return;
        }
        if (distributor.phone === '') {
            alert('El campo Teléfono es obligatorio');
            return;
        }
        if (distributor.email === '') {
            alert('El campo Correo electrónico es obligatorio');
            return;
        }
        if (!validateEmail(distributor.email)) {
            alert('El correo electrónico no es válido');
            return;
        }
        if (!validatePhone(distributor.phone)) {
            alert('El teléfono no es válido');
            return;
        }
        if (!validatePostalCode(distributor.postalCode)) {
            alert('El código postal no es válido');
            return;
        }
        setLoading(true);

        if (editing) {
            await axios.put(`/distributors/edit/${params.id}/${reference}`, distributor, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    alert('Distribuidor actualizado');
                    setLoading(false);
                    navigate('/distributors', { replace: true });
                }
            })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                    if (error.response.status === 400) {
                        alert(error.response.data.message);
                    }
                    if (error.response.status === 500) {
                        alert(error.response.data.message);
                    }
                    if (error.response.status === 404) {
                        alert(error.response.data.message);
                    }
                });
        } else {
            await axios.post(`/distributors/new/${reference}`, distributor, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    alert('Distribuidor creado');
                    setLoading(false);
                    navigate('/distributors', { replace: true });
                }
            })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                    if (error.response.status === 400) {
                        alert(error.response.data.message);
                    }
                    if (error.response.status === 500) {
                        alert(error.response.data.message);
                    }
                    if (error.response.status === 404) {
                        alert(error.response.data.message);
                    }
                });
        }
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setDistributor({ ...distributor, [name]: value });
    };

    const CountryDropdown = ({ value }) => {
        const handleCountryChange = (value) => {
            let nameCountry = 'country';
            let valueCountry = value.currentKey;
            let nameState = 'state';
            let valueState = '';
            setDistributor({ ...distributor, [nameCountry]: valueCountry, [nameState]: valueState });
        };

        return (
            <Dropdown>
                <Dropdown.Button flat color="secundary" disabled={isInputDisabled} size='sm' width='100%' css={{ marginTop: '10%' }}>
                    {value || 'Selecciona un país'}
                </Dropdown.Button>
                <Dropdown.Menu
                    color='secundary'
                    selectionMode='single'
                    selectedKeys={value}
                    onSelectionChange={selected => handleCountryChange(selected)}
                >
                    {Object.keys(orderCountries).map((country) => (
                        <Dropdown.Item key={country} eventKey={country}>
                            {country}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    const StateDropdown = ({ country, value }) => {

        return (
            <Dropdown >
                <Dropdown.Button flat color="secundary" disabled={isInputDisabled} size='sm' width='100%' css={{ marginTop: '10%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {value || 'Selecciona un estado'}
                </Dropdown.Button>
                <Dropdown.Menu
                    aria-label="Dropdown menu countries"
                    color='secundary'
                    selectionMode='single'
                    selectedKeys={value}
                    onSelectionChange={selected => { name = 'state'; value = selected.currentKey; setDistributor({ ...distributor, [name]: value }); }}
                >
                    {countriesWithStates[country].map((state) => (
                        <Dropdown.Item key={state} eventKey={state}>
                            {state}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    const loadDistributor = async (id) => {
        const response = await axios.get(`/distributors/get/${id}/${reference}`);
        setDistributor({
            distributorName: response.data.distributorName,
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
            setVariable('Editar distribuidor');
            setIsInputDisabled(false);
        }
        if (arr[2] === 'View') {
            setVariable('Ver distribuidor');
            setIsInputDisabled(true);
        }
    };

    useEffect(() => {
        if (params.id) {
            loadDistributor(params.id);
        }
    }, [params.id]);

    return (
        <Container>
            <Header />
            <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '2%', marginLeft: '2%' }}>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    onClick={() => navigate("/Home")}
                >
                    <MdHomeFilled sx={{ fontSize: '10px' }} fontSize="12px" />
                    <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}> Inicio</span>
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    onClick={() => navigate("/Distributors", { replace: true })}
                >
                    <MdSettings sx={{ fontSize: '10px' }} fontSize="12px" />
                    <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}> Listado de distribuidores</span>
                </Link>
                <Typography
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                    <MdPerson sx={{ mr: 0.5, }} fontSize="12px" />
                    <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}>{variable}</Text>
                </Typography>
            </Breadcrumbs>
            <Row gap={1} style={{ width: '100%', margin: '10px' }}>
                <Grid xs={12} >
                    <Col style={{ width: '100%', height: '100%', marginTop: '5%' }}>
                        <Image
                            showSkeleton
                            width={'100%'}
                            height={'100%'}
                            maxDelay={500}
                            src="https://i.ibb.co/7zVWm6F/Logo-1.png"
                            alt="Default Image"
                        />
                    </Col>
                    {variable === 'Ver distribuidor' ? null : <input type="file" style={{ width: '100%', height: '100%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} />
                    }
                </Grid>
                <Spacer y={3} />
                <Container gap={3}>
                    <Grid xs={10} >
                        <Row gap={1}>
                            <Col>
                                <Text h3 align='center' style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}>Datos del Distribuidor</Text>
                                <Input id="distributorName"
                                    name="distributorName"
                                    value={distributor.distributorName}
                                    onChange={handleChange}
                                    label='Marca'
                                    placeholder='Nombre del distribuidor - Marca'
                                    disabled={isInputDisabled} size='sm'
                                    width='100%' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                <Input id="address"
                                    name="address"
                                    value={distributor.address}
                                    onChange={handleChange}
                                    label='Dirección'
                                    placeholder='Dirección'
                                    disabled={isInputDisabled} size='sm'
                                    width='100%' />
                            </Col>
                            <Col>
                                <Input id="col"
                                    name="col"
                                    value={distributor.col}
                                    onChange={handleChange}
                                    label='Colonia'
                                    placeholder='Colonia'
                                    disabled={isInputDisabled} size='sm'
                                    width='100%' />
                            </Col>
                            <Col>
                                <Input id="city"
                                    name="city"
                                    value={distributor.city}
                                    onChange={handleChange}
                                    label='Ciudad'
                                    placeholder='Ciudad'
                                    disabled={isInputDisabled} size='sm'
                                    width='100%' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                <CountryDropdown value={distributor.country} label='Pais'/>
                            </Col>
                            <Col>
                                <StateDropdown country={distributor.country} value={distributor.state} />
                            </Col>
                            <Col>
                                <Input id="postalCode"
                                    name="postalCode"
                                    value={distributor.postalCode}
                                    onChange={handleChange}
                                    label='Código Postal'
                                    placeholder='Código Postal'
                                    disabled={isInputDisabled} size='sm'
                                    width='100%' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                <Text h3 align='center' style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}>Datos de contacto</Text>
                            </Col>
                        </Row>
                        <Row gap={1}>
                            <Col>
                                <Input id="contact"
                                    name="contact"
                                    value={distributor.contact}
                                    onChange={handleChange}
                                    label='Contacto'
                                    placeholder='Contacto'
                                    disabled={isInputDisabled} size='sm'
                                    width='100%' />
                            </Col>
                            <Col>
                                <Input id="phone"
                                    name="phone"
                                    value={distributor.phone}
                                    onChange={handleChange}
                                    label='Teléfono'
                                    placeholder='Teléfono'
                                    disabled={isInputDisabled} size='sm'
                                    width='100%' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                <Input id="email"
                                    name="email"
                                    value={distributor.email}
                                    onChange={handleChange}
                                    label='Correo electrónico'
                                    placeholder='Correo electrónico'
                                    disabled={isInputDisabled} size='sm'
                                    width='100%' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                {variable === 'Ver distribuidor' ?
                                    <Button auto
                                        size={'sm'}
                                        onClick={() => navigate('/Distributors', { replace: true })}> Regresar </Button> : null}
                                {variable === 'Editar distribuidor' || variable === 'Nuevo distribuidor' ?
                                    <Button auto
                                        size={'sm'}
                                        iconRight={<MdSave fill="currentColor" />}
                                        onClick={handleSubmit}>
                                        Guardar
                                    </Button>
                                    : null}
                            </Col>
                        </Row>
                    </Grid>
                </Container>
            </Row>
            <Footer />
        </Container>
    );
};

export default NewDistributors;