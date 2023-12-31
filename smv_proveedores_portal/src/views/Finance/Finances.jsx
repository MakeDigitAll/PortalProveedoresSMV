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

const Finances = () => {
  const navigate = useNavigate();
  return (
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
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              className="text-foreground"
            >
              <GiCash sx={{ mr: 0.5 }} fontSize="inherit" />
              Finanzas
            </Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="flex p-4 ml-20">
        <div className="flex w-full mr-20 p-4 flex-col items-center text-center justify-center full-w">
          <Button auto onPress={() => navigate("/Invoices")} className="w-1/2 py-10 my-5 text-2xl bg-yellow-600">
            Facturación
          </Button>
          <Button auto onPress={() => navigate("/LegalDocuments")} className="w-1/2 py-10 my-5 text-2xl bg-yellow-800">
            Legales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Finances;
