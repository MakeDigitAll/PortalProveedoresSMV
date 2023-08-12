import React from 'react'
import { Spacer, Text } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer style={{alignItems: 'end',
    justifyContent: 'center',
    display: 'flex',}}>
        <Spacer y={6} />
        <Text h6></Text>
    </footer>
  )
}

export default Footer