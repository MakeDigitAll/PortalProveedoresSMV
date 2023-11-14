import React, { useState, useEffect } from 'react';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            const invoicesData = await getInvoices();
            setInvoices(invoicesData);
        }; 
        fetchInvoices();
    }, []);

    return (
        <div>
            <h1>List of Invoices</h1>
            <table>
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.amount}</td>
                            <td>{invoice.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Invoices;
