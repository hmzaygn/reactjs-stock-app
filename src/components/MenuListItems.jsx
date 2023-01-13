// import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useNavigate } from "react-router-dom";

const icons = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/stock/",
  },
  {
    icon: <ShoppingCartIcon />,
    title: "Purchases",
    url: "/stock/purchases/",
  },
  {
    icon: <AttachMoneyIcon />,
    title: "Sales",
    url: "/stock/sales/",
  },
  {
    icon: <StoreIcon />,
    title: "Firms",
    url: "/stock/firms/",
  },
  {
    icon: <StarsIcon />,
    title: "Brands",
    url: "/stock/brands/",
  },
  {
    icon: <InventoryIcon />,
    title: "Products",
    url: "/stock/products/",
  },
  {
    icon: <SupervisorAccountIcon />,
    title: "Admin Panel",
    url: "https://13659.fullstack.clarusway.com/admin/",
  },
];

const iconStyle = {
  color: "#eee",
  transition: "all 0.5s",
  "& .MuiSvgIcon-root": { color: "#eee", transition: "all 0.5s" },
  "&:hover": { color: "red" },
  "&:hover .MuiSvgIcon-root": { color: "red" },
};

const MenuListItems = () => {
  const navigate = useNavigate();

  return (
    <List>
      {icons?.map((item, index) => (
        <ListItem key={index} disablePadding>
          {item.url.includes("http") ? (
            <ListItemButton
              to={"https://13659.fullstack.clarusway.com/admin/"}
              target="_blank"
              sx={iconStyle}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => navigate(item.url)} sx={iconStyle}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default MenuListItems;
