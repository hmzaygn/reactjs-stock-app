import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import useStockCalls from "../hooks/useStockCalls";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/modals/BrandModal";

const Brands = () => {
  const { getBrands } = useStockCalls();
  const { brands } = useSelector((state) => state.stock);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error">
        Brands
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        New Brand
      </Button>

      <BrandModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />

      {brands?.length > 0 && (
        <Grid container justifyContent="center" gap={3} sx={{ mt: 4 }}>
          {brands?.map((brand) => (
            <Grid item key={brand.id}>
              <BrandCard brand={brand} setOpen={setOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Brands;
