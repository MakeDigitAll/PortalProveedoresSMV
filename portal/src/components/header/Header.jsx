import { Navbar, Text, useTheme, Button, Grid, Switch, changeTheme } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { useTranslation } from 'react-i18next';
import React from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
const lngs = {
  en: { nativeName: 'English' },
  es: { nativeName: 'Español' }
};

const Header = () => {
  const { i18n } = useTranslation();
  const { isDark } = useTheme();

  const handleChange = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    window.localStorage.setItem('data-theme', nextTheme); // you can use any storage
    changeTheme(nextTheme);
  }
  return (
    <Layout>
      <Navbar shouldHideOnScroll isCompact disableShadow variant="sticky">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            MakeDigitAll
          </Text>
        </Navbar.Brand>
        <Grid>
          <Button.Group light size="sm">
            {Object.keys(lngs).map((lng) => (
              <Button size={"xss"} key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                {lngs[lng].nativeName}
              </Button>
            ))}
            <Switch
              css={{ marginTop: '5px' }}
              checked={isDark}
              size="md"
              iconOff={<RiSunLine filled />}
              iconOn={<RiMoonLine filled />}
              onChange={handleChange}
            />
          </Button.Group>
          <Grid>
          </Grid>
        </Grid>
      </Navbar>
    </Layout>
  )
}

export default Header