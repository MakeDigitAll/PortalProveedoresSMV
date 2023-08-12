import React, { useState} from 'react';
import { Card, Input, Text, Spacer, Container, Row, Checkbox, Button, Image, useInput, Link } from '@nextui-org/react';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import useToggle from '../../hooks/useToggle';
import useAuth from '../../hooks/useAuth';

import axiosInstance from '../../components/axios/axios';
const LOGIN_URL = 'login';

const Login = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const {setAuth} = useAuth();
    const [toggle, setToggle] = useToggle('persist', false);

    const {
        value: emailValue,
        reset: resetEmail, 
        bindings: bindEmail,
    } = useInput('');
    const {
        value: passwordValue,
        reset: resetPassword,
        bindings: bindPassword,
    } = useInput('');


    const handleSubmit = async (e) => {

        const data = {
            username: emailValue,
            password: passwordValue
        }

        if (emailValue === '') {
            alert(t('login.emailRequired'));
            return;
        }
        if (passwordValue === '') {
            alert(t('login.passwordRequired'));
            return;
        }
        try {
            const response = await axiosInstance.post(LOGIN_URL, data,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            
            const accessToken = response?.data?.accessToken;
            const respRoles = response?.data?.roles;
            const referenceCode = response?.data?.referenceCode;
            const isVerified = response?.data?.isVerified;
            const cleanedString = respRoles.replace(/[{}"]/g, '');
            const rolesArrayWithStrings = cleanedString.split(',');
            const roles = rolesArrayWithStrings.map(role => parseInt(role));
            const userData = {
                emailValue,
                passwordValue,
                roles,
                accessToken,
                referenceCode,
                isVerified
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            setAuth({ emailValue, passwordValue, roles, accessToken, referenceCode, isVerified });
            navigate('/Home');
        } catch (err) {
            if (!err?.response) {
                alert(err.message);
            } else if (err.response?.status === 400) {
                alert(err.response.data.error);
            } else if (err.response?.status === 401) {
                alert(err.response.data.error);
            } else {
                alert('Error en el servidor');
            }
        }
    }

    return (
        <><Header />
            <Container gap={2} onSubmit={handleSubmit}
                css={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    marginTop: '60px'
                }}>
                <Card css={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    p: '$6', mw: '400px',
                    height: '560px'
                }}>
                    <Card.Body css={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
                        <Text h4>
                            {t('Bienvenido a SMV Proveedores')}
                        </Text>
                        <Image
                            src="https://i.ibb.co/F6cKJSD/make.png"
                            alt=''
                            width={100}
                            height={100}
                            showSkeleton
                        />
                        <Spacer y={2} />
                        <Input
                            {...bindEmail}
                            onClearClick={resetEmail}
                            status={errEmail ? 'error' : "default"}
                            color={errEmail ? 'error' : "default"}
                            helperColor={errEmail ? 'error' : "default"}
                            helperText={errEmail ? errEmail : ''}
                            type='email'
                            label={t('Email')}
                            width='300px'
                            size='sm'
                            placeholder={t('Correo electrónico o usuario')}
                            contentLeft={<MdOutlineMailOutline fill="currentColor" />} />
                        <Spacer y={2} />
                        <Input.Password
                            {...bindPassword}
                            onClearClick={resetPassword}
                            status={errPassword ? 'error' : "default"}
                            color={errPassword ? 'error' : "default"}
                            helperColor={errPassword ? 'error' : "default"}
                            helperText={errPassword ? errPassword : ''}
                            type='password'
                            label={t('Contraseña')}
                            width='300px'
                            size='sm'
                            placeholder={t('constraseña')}
                            contentLeft={<RiLockPasswordLine fill="currentColor" />} />
                        <br />
                        <Row justify="flex-start">
                            <Checkbox size='xs' css={{ marginLeft: '25px' }} checked={toggle} onChange={setToggle}>
                                <Text size={12}> {t('Recordarme')}</Text>
                            </Checkbox>
                            {/* <Link size={14}>Olvide mi contraseña</Link> */}
                        </Row>
                    </Card.Body>
                    <Card.Footer css={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                    }}>
                        <Button flat auto size={'sm'} color="primary" onClick={handleSubmit}>
                            {t('login.Login')}
                        </Button>
                        <Spacer x={1} />
                        <Text size={12} flat auto> {t('No tienes cuenta?')}</Text>
                        <Spacer x={1} />
                        <Link size={14} href="/Register">{t('Registrate')}</Link>

                    </Card.Footer>
                    <Spacer y={2} />
                </Card>
            </Container>
        </>
    )
}

export default Login
