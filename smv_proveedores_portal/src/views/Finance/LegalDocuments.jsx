import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { GiCash } from "react-icons/gi";
import { RiDashboard2Fill } from "react-icons/ri";
import Header from "../../components/header/headerC/Header";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const LegalDocuments = () => {

    const { auth } = useAuth();
    const axios = useAxiosPrivate();

    const [document, setDocument] = useState(null)
    const [document2, setDocument2] = useState(null)
    const [document3, setDocument3] = useState(null)

    const [viewDocument, setViewDocument] = useState(false)
    const [viewDocument2, setViewDocument2] = useState(false)
    const [viewDocument3, setViewDocument3] = useState(false)

    const [documentPreview, setDocumentPreview] = useState(null)
    const [documentPreview2, setDocumentPreview2] = useState(null)
    const [documentPreview3, setDocumentPreview3] = useState(null)
    const navigate = useNavigate();

    const loadDocuments = async () => {
        try {
            const response = await axios.get(`/pv/${auth.ID}/documents/contrato_compra_venta`, {
                responseType: 'blob',
            });
            if (response.data) {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                setDocument(blob)
                setDocumentPreview(URL.createObjectURL(blob));
            }
        }
        catch (error) {
            console.log(error);
        }
        try {
            const response = await axios.get(`/pv/${auth.ID}/documents/politicas_compra_venta`, {
                responseType: 'blob',
            });
            if (response.data) {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                setDocument2(blob)
                setDocumentPreview2(URL.createObjectURL(blob));
            }
        }
        catch (error) {
            console.log(error);
        }

        try {
            const response = await axios.get(`/pv/${auth.ID}/documents/poliza_seguro`, {
                responseType: 'blob',
            });
            if (response.data) {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                setDocument3(blob)
                setDocumentPreview3(URL.createObjectURL(blob));
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadDocuments();
    }, [])


    const handleDocumentUpload = async (file, documentType) => {
        if (file) {
            if (file.size > 10000000) {
                toast.error("El tamaño del archivo no puede ser mayor a 10MB");
            } else {
                if (file.type === "application/pdf") {
                    switch (documentType) {
                        case 'contrato_compra_venta':
                            setDocument(file);
                            setDocumentPreview(URL.createObjectURL(file));
                            await uploadDocument(file, documentType);
                            toast.success("Documento cargado correctamente");
                            break;
                        case 'politicas_compra_venta':
                            setDocument2(file);
                            setDocumentPreview2(URL.createObjectURL(file));
                            await uploadDocument(file, documentType);
                            break;
                        case 'poliza_seguro':
                            setDocument3(file);
                            setDocumentPreview3(URL.createObjectURL(file));
                            await uploadDocument(file, documentType);
                            break;
                        default:
                            break;
                    }
                } else {
                    toast.error("El formato del archivo debe ser PDF");
                }
            }
        }
    }

    const uploadDocument = async (file, documentType) => {
        const formData = new FormData();
        console.log("updateDocument");
        formData.append("file", file);
        try {
            const response = await axios.post(`/pv/${auth.ID}/documents/${documentType}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
        }
        catch (error) {
        }
    }

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <Header />
                <ToastContainer />
                <div className="flex justify-between items-center ml-20 mt-10 mb-10">
                    <div className="flex items-center">
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
                                onClick={() => navigate(`/Finances`)}
                            >
                                <RiDashboard2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
                                Finanzas
                            </Link>
                            <Typography
                                sx={{ display: "flex", alignItems: "center" }}
                                className="text-foreground"
                            >
                                <GiCash sx={{ mr: 0.5 }} fontSize="inherit" />
                                Documentos legales
                            </Typography>
                        </Breadcrumbs>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="flex flex-row items-center justify-center w-1/2 h-1/2">
                        <div>
                            <input type="file" accept="application/pdf" onChange={(e) => handleDocumentUpload(e.target.files[0], 'contrato_compra_venta')} />
                            {viewDocument === true && documentPreview !== null ? (
                                <div className="flex flex-col items-center justify-center">
                                    <embed src={documentPreview} width="500" height="375" type="application/pdf" />
                                    <Button onClick={() => setViewDocument(false)}>Cerrar</Button>
                                </div>
                            ) : null}
                            {viewDocument === false && documentPreview !== null ? (
                                <Button onClick={() => setViewDocument(true)}>Ver documento</Button>
                            ) : null}
                        </div>
                        <div className="ml-10">
                            <label htmlFor="document">Contrato de compra - venta</label>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-10 w-1/2 h-1/2">
                        <div>
                            <input type="file" accept="application/pdf" onChange={(e) => handleDocumentUpload(e.target.files[0], 'politicas_compra_venta')} />

                            {viewDocument2 === true && documentPreview2 !== null ? (
                                <div className="flex flex-col items-center justify-center">
                                    <embed src={documentPreview2} width="500" height="375" type="application/pdf" />
                                    <Button onClick={() => setViewDocument2(false)}>Cerrar</Button>
                                </div>
                            ) : null}
                            {viewDocument2 === false && documentPreview2 !== null ? (
                                <Button onClick={() => setViewDocument2(true)}>Ver documento</Button>
                            ) : null}
                        </div>
                        <div className="ml-10">
                            <label htmlFor="document">Politicas de compra - venta</label>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-10 w-1/2 h-1/2">
                        <div>
                            <input type="file" accept="application/pdf" onChange={(e) => handleDocumentUpload(e.target.files[0], 'poliza_seguro')} />
                            {viewDocument3 === true && documentPreview3 !== null ? (
                                <div className="flex flex-col items-center justify-center">
                                    <embed src={documentPreview3} width="500" height="375" type="application/pdf" />
                                    <Button onClick={() => setViewDocument3(false)}>Cerrar</Button>
                                </div>
                            ) : null}
                            {viewDocument3 === false && documentPreview3 !== null ? (
                                <Button onClick={() => setViewDocument3(true)}>Ver documento</Button>
                            ) : null}
                        </div>
                        <div className="ml-28">
                            <label htmlFor="document">Póliza de seguro</label>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default LegalDocuments;