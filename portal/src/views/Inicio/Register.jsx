import React, { useState } from 'react';
import { Card, Input, Text, Spacer, Container, Radio, Button, Image, useInput } from '@nextui-org/react';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../components/axios/axios';


const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [typeUser, setTypeUser] = useState('1');

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

    const {
        value: confirmPasswordValue,
        reset: resetConfirmPassword,
        bindings: bindConfirmPassword,
    } = useInput('');

    const {
        value: reference,
        reset: resetReference,
        bindings: bindReference,
    } = useInput('');

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const handleSubmit = async (e) => {

        const data = {
            username: emailValue,
            password: passwordValue,
            role: typeUser
        }

        const dataReference = {
            username: emailValue,
            password: passwordValue,
            role: typeUser,
            reference: reference
        }

        if (emailValue === '') {
            alert(t('El email es requerido'));
            return;
        }
        if (!validateEmail(emailValue)) {
            alert(t('El email no es valido'));
            return;
        }
        if (passwordValue === '') {
            alert(t('la contraseña es requerida'));
            return;
        }
        if (confirmPasswordValue === '') {
            alert(t('Confirmar contraseña es requerida'));
            return;
        }
        if (passwordValue !== confirmPasswordValue) {
            alert(t('Las contraseñas no coinciden'));
            return;
        }

        if (typeUser === '2') {
            if (reference === '') {
                alert(t('El codigo de referencia es requerido'));
                return;
            }
            try {
                setLoading(true);
                await axiosInstance.post('/register', dataReference,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                alert(t('Registro Exitoso'));
                setLoading(false);
                resetEmail();
                resetPassword();
                resetConfirmPassword();
                resetReference();
                navigate('/');
            }
            catch (err) {
                if (!err?.response) {
                    alert('Error de conexión');
                } else if (err.response?.status === 409) {
                    alert('Correo ya registrado');
                } else {
                    alert('Error al registrarse, vuelva a intentarlo')
                }
                return setLoading(false);
                
            }
        } 

            try {
                await axiosInstance.post('/register', data,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                alert(t('Registro Exitoso'));
                setLoading(false);
                resetEmail();
                resetPassword();
                resetConfirmPassword();
                navigate('/');
            } catch (err) {
                if (!err?.response) {
                    alert('Error de conexión');
                } else if (err.response?.status === 409) {
                    alert('Correo ya registrado');
                } else {
                    alert('Error al registrarse, vuelva a intentarlo')
                }
                setLoading(false);
            }
        }

        return (

            <Container gap={2} onSubmit={handleSubmit}
                css={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    marginTop: '60px'
                }}>
                {loading ? (<div>Loading...</div>) : (
                    <Card css={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        p: '$6', mw: '400px',
                        height: '560px'
                    }}>
                        <Card.Body css={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
                            <Text h4>
                                {t('login.Welcome')}
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
                                placeholder={t('login.Email')}
                                width='100%'
                                icon={<MdOutlineMailOutline />}
                                size='large'
                            />
                            <Spacer y={1} />
                            <Input.Password
                                {...bindPassword}
                                placeholder={t('login.Password')}
                                width='100%'
                                icon={<RiLockPasswordLine />}
                                size='large'
                            />
                            <Spacer y={1} />
                            <Input.Password
                                {...bindConfirmPassword}
                                placeholder={t('login.ConfirmPassword')}
                                width='100%'
                                icon={<RiLockPasswordLine />}
                                size='large'
                            />
                            <Spacer y={1} />
                            <Radio.Group
                                label={t('Tipo de usuario')} defaultValue="1"
                                size="sm"
                                value={typeUser}
                                onChange={setTypeUser}
                            >
                                <Radio value="1">{t('Proveedor')}</Radio>
                                <Radio value="2">{t('Distribuidor')}</Radio>
                            </Radio.Group>
                            {typeUser === '2' && <Spacer y={1} />}
                            {typeUser === '2' &&
                                <Input
                                    {...bindReference}
                                    placeholder={t('Codigo de referencia')}
                                    width='100%'
                                    size='large'
                                />}

                            <Spacer y={1} />
                        </Card.Body>
                        <Card.Footer css={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                        }}>
                            <Button flat auto size={'sm'} color="primary" onClick={handleSubmit}>
                                {t('Registrarse')}
                            </Button>
                        </Card.Footer>
                    </Card>
                )}
            </Container>
        );
    }

    export default Register;