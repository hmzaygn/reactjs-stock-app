import { useEffect } from "react";
import useStockCalls from "../hooks/useStockCalls";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KpiCards from "../components/KpiCards";
import Charts from "../components/Charts";

const Home = () => {
  const { getAllStockData } = useStockCalls();

  useEffect(() => {
    getAllStockData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Dashboard
      </Typography>
      <KpiCards />
      <Charts />
    </Box>
  );
};

export default Home;
