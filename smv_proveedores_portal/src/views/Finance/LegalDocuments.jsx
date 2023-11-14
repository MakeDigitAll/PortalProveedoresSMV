import React, { useState } from "react";
import {Breadcrumbs, BreadcrumbItem, Button} from "@nextui-org/react";

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
            <Breadcrumbs
                className="breadcrumbs"
                separator=">"
                aria-label="breadcrumb navigation example"
            >
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem href="/finance">Finance</BreadcrumbItem>
                <BreadcrumbItem href="/finance/LegalDocuments">
                    Legal Documents
                </BreadcrumbItem>
            </Breadcrumbs>
                {/* <Upload
                    action="/api/upload"
                    accept=".pdf"
                    onChange={(file) => handleDocumentUpload(file)}
                /> */}
            <Button onClick={handleDocumentPreview}>Preview Document</Button>
        </>
    )
}

export default LegalDocuments;