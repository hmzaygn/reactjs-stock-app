import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { amber, indigo } from "@mui/material/colors";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const saleChartData = {
    labels: sales?.map((sale) => sale.createds_date_time),
    datasets: [
      {
        label: "Sales",
        data: sales?.map((sale) => sale.price_total),
        backgroundColor: "white",
        borderColor: indigo[900],
        pointBorderColor: "black",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const purchaseChartData = {
    labels: purchases?.map((purchase) => purchase.createds_date_time),
    datasets: [
      {
        label: "Purchases",
        data: purchases?.map((purchase) => purchase.price_total),
        backgroundColor: "white",
        borderColor: amber[900],
        pointBorderColor: "black",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
  };

  console.log(saleChartData?.datasets[0].data);
  console.log(saleChartData?.labels);

  return (
    <Grid container justifyContent="center" spacing={2} mt={3}>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <Card sx={{ p: 2 }}>
          <Typography>Sales (USD)</Typography>
          <Line data={saleChartData} options={options} />
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6}>
        <Card sx={{ p: 2 }}>
          <Typography>Purchases (USD)</Typography>
          <Line data={purchaseChartData} options={options} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
