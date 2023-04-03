import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";

import { amber, indigo, pink } from "@mui/material/colors";
import { useSelector } from "react-redux";

const KpiCards = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const total = (data) => {
    return data
      ?.map((item) => Number(item.price_total))
      .reduce((acc, val) => acc + val, 0);
  };

  const totalProfit = total(sales) - total(purchases);

  const data = [
    {
      title: "Sales",
      metric: `$${total(sales) || "0"}`,
      icon: <MonetizationOnIcon sx={{ fontSize: "2.5rem" }} />,
      color: indigo[900],
      bgColor: indigo[100],
    },
    {
      title: "Profit",
      metric: `$${totalProfit || "0"}`,
      icon: <PaymentsIcon sx={{ fontSize: "2.5rem" }} />,
      color: pink[900],
      bgColor: pink[100],
    },
    {
      title: "Purchases",
      metric: `$${total(purchases) || "0"}`,
      icon: <ShoppingCartIcon sx={{ fontSize: "2.5rem" }} />,
      color: amber[900],
      bgColor: amber[100],
    },
  ];

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {data.map((item, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={10}
          md={6}
          lg={4}
          sx={{ minWidth: "300px" }}
        >
          <Paper sx={{ p: 2 }} elevation={10}>
            <Box sx={{ display: "flex" }}>
              <Avatar
                sx={{
                  width: "4rem",
                  height: "4rem",
                  color: item.color,
                  backgroundColor: item.bgColor,
                  my: "auto",
                  mx: 2,
                }}
              >
                {item.icon}
              </Avatar>
              <Box sx={{ mx: 3 }}>
                <Typography variant="button">{item.title}</Typography>
                <Typography variant="h5">{item.metric}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards;
