import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { GiCash } from "react-icons/gi";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdChecklist } from "react-icons/md";
import Header from "../../components/header/headerC/Header";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LegalDocuments = () => {
    const [document, setDocument] = useState(null)

    const handleDocumentUpload = (file) => {
        setDocument(file)
    }

    const handleDocumentPreview = () => {
        // Code to display the uploaded document preview
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
                            <input type="file" onChange={(e) => handleDocumentUpload(e.target.files[0])} />
                            <Button onClick={() => handleDocumentPreview()}>Ver documento</Button>
                        </div>
                        <div className="ml-10">
                            <label htmlFor="document">Contrato de compra - venta</label>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-10 w-1/2 h-1/2">
                        <div>
                            <input type="file" onChange={(e) => handleDocumentUpload(e.target.files[0])} />
                            <Button onClick={() => handleDocumentPreview()}>Ver documento</Button>
                        </div>
                        <div className="ml-10">
                            <label htmlFor="document">Politicas de compra - venta</label>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-10 w-1/2 h-1/2">
                        <div>
                            <input type="file" onChange={(e) => handleDocumentUpload(e.target.files[0])} />
                            <Button onClick={() => handleDocumentPreview()}>Ver documento</Button>
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