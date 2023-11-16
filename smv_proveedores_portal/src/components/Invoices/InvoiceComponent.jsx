// FacturaComponent.js

import React from 'react';
import { useReactToPrint } from 'react-to-print';

const FacturaComponent = ({ facturaData }) => {
  const componentRef = React.useRef();
  const productsOrder = facturaData.products.map((product) => {
    return (
        <div key={product.id}>
            <p>Codigo de fabricante: {product.name}</p>
            <p>Cantidad: {product.quantity}</p>
            <p>Precio: ${product.price}</p>
            <br />
        </div>
    );
    });


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="factura">
      <h2>Factura #{facturaData.facture}</h2>
      <p>RFC: {facturaData.providerId}</p>
      <p>Razon social: {facturaData.socialReason}</p>
      <p>Fecha de Pedido: {facturaData.orderDate}</p>
      <p>Fecha de Entrega: {facturaData.deliveryDate}</p>
      <p>Informacion de envio: {facturaData.orderData}</p>
      <p>Importación de pedido: {facturaData.products}</p>
      <p>Comentarios de la orden: {facturaData.comments}</p>
      <p>Método de pago: {facturaData.paymentMethod}</p>
      <br />
      <br />
      <br />
      <p>Productos:</p>
        {productsOrder}
        <br />
        <br />
        <br />
        <p>Subtotal: ${facturaData.subtotal}</p>
      <p>Total: ${facturaData.total}</p>

      <button onClick={handlePrint}>Imprimir Factura</button>

      {/* Ref del componente para react-to-print */}
      <div style={{ display: 'none' }}>
        <FacturaComponent ref={componentRef} facturaData={facturaData} />
      </div>
    </div>
  );
};

export default FacturaComponent;
