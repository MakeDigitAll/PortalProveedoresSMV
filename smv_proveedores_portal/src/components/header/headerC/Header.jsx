import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
  Button,
  Badge,
  Switch,
  Image,
  DropdownSection,
  User,
} from "@nextui-org/react";
//import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useLogout from "../../../hooks/useLogout";
import { RiMoonLine, RiNotification4Fill, RiSunLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const lngs = {
  En: { nativeName: "English" },
  Es: { nativeName: "Español" },
};
const Header = () => {
  const LogOut = useLogout();
  const axios = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const { i18n, t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = React.useState(i18n.language);
  const { theme, setTheme } = useTheme();
  const islight = theme === "light";
  const handleChange = () => {
    const nextTheme = islight ? "dark" : "light";
    window.localStorage.setItem("data-theme", nextTheme); // you can use any storage
    setTheme(nextTheme);
  };
  const imgLogo = theme === "dark";
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys]
  );


  //-------------------------------------------------------------------------------------
  //                   Obtener imagen de usuario                                         
  //-------------------------------------------------------------------------------------
  async function getImg() {
    try {
      const responseImg = await axios.get(`/users/image/${auth.userId}`, {
        responseType: 'blob',
      });
      const img = responseImg?.data;
      if (img.size > 0) {
        const imgURL = URL.createObjectURL(img);
        return setAuth({ ...auth, imgURL });
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getImg();
  }, []);
  //-------------------------------------------------------------------------------------


 //const navigate = useNavigate();

  return (
    <header className="bg-background shadow-md">
      <div
        className="flex flex-row items-center justify-between"
        style={{ marginLeft: "80px", marginRight: "80px"}}
      >
        <div className="items-start">
          {imgLogo ? (
            <Image
              isZoomed
              src="../../../public/make-logo-light.png"
              alt=""
              width={150}
              height={100}
            />
          ) : (
            <Image
              isZoomed
              src="../../../public/make-logo-dark.png"
              alt=""
              width={150}
              height={100}
            />
          )}
        </div>
        <div className="flex flex-wrap place-content-end space-1">
          <Dropdown
            showArrow
            radius="sm"
            classNames={{
              base: "p-0 border-small border-divider bg-background",
              arrow: "bg-default-200",
            }}
          >
            <DropdownTrigger style={{ marginLeft: "20px" }}>
              <Avatar
                isBordered 
                as="button"
                className="transition-transform"
                name={auth.username ? auth.username : "Usuario"}
                size="sm"
                src={auth.imgURL ? auth.imgURL : "../../../public/Blank-Avatar.png"}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Custom item styles"
              disabledKeys={["profile"]}
              className="p-3"
              itemClasses={{}}
            >
              <DropdownSection aria-label="Profile & Actions" showDivider>
                <DropdownItem isReadOnly className="h-14 gap-2">
                  <User
                    name={
                      auth.username ? auth.username : "Usuario"
                    }
                    description={
                      auth.ID ? auth.ID : "ID"
                    }
                    classNames={{
                      name: "text-default-600",
                      description: "text-default-500",
                    }}
                    avatarProps={{
                      size: "sm",
                      src: auth.imgURL ? auth.imgURL : "../../../public/Blank-Avatar.png",
                    }}
                  />
                </DropdownItem>
                {/* <DropdownItem key="settings" onPress={() => navigate(`/Profile`)}>
                  {t("Perfil")}
                </DropdownItem> */}
              </DropdownSection>

              <DropdownSection aria-label="Preferences" showDivider>
                <DropdownItem
                  isReadOnly
                  key="language"
                  className="cursor-default"
                  endContent={
                    <Dropdown>
                      <DropdownTrigger variant="light">
                        <Button
                          className="capitalize"
                          size="sm"
                          endContent={<TbWorld />}
                        >
                          {selectedValue}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection actions"
                        variant="light"
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                      >
                        {Object.keys(lngs).map((lng) => (
                          <DropdownItem
                            key={lng}
                            value={lng}
                            onPress={() => i18n.changeLanguage(lng)}
                          >
                            {lngs[lng].nativeName}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  }
                >
                  {t("Idioma")}
                </DropdownItem>
                <DropdownItem
                  isReadOnly
                  key="theme"
                  className="cursor-default"
                  endContent={
                    <Switch
                      onChange={handleChange}
                      defaultSelected
                      size="sm"
                      color="primary"
                      thumbIcon={({ isSelected, className }) =>
                        isSelected ? (
                          <RiMoonLine className={className} />
                        ) : (
                          <RiSunLine className={className} />
                        )
                      }
                    ></Switch>
                  }
                >
                  {t("Tema")}
                </DropdownItem>
              </DropdownSection>
              <DropdownSection aria-label="Logout">
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => LogOut()}
                >
                  {t("Cerrar sesión")}
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
