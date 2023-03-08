import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import SaleModal from "../components/modals/SaleModal";
import SalesTable from "../components/tables/SalesTable";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { flexCenter } from "../styles/globalStyle";

const Sales = () => {
  const { sales, products, brands } = useSelector((state) => state.stock);
  const { getAllStockData } = useStockCalls();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  const filteredProducts = products?.filter((item) =>
    selectedBrands?.includes(item.brand)
  );

  const handleChange = (e, url) => {
    const { value } = e.target;
    if (url === "brands") {
      setSelectedBrands(typeof value === "string" ? value.split(",") : value);
    } else {
      setSelectedProducts(typeof value === "string" ? value.split(",") : value);
    }
  };

  useEffect(() => {
    getAllStockData();
  }, []);

  return (
    <>
      <Typography variant="h4" color="error" mt={4} mb={4}>
        Sales
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Sale
      </Button>

      <SaleModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={() => setOpen(false)}
      />

      {sales?.length > 0 && (
        <>
          <Box sx={flexCenter} mt={3}>
            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel id="demo-multiple-name-label">Brands</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedBrands || []}
                onChange={(e) => handleChange(e, "brands")}
                input={<OutlinedInput label="Brands" />}
              >
                {brands?.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel id="demo-multiple-name-label">Products</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedProducts || []}
                onChange={(e) => handleChange(e, "products")}
                input={<OutlinedInput label="Product" />}
              >
                {filteredProducts?.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <SalesTable
            setOpen={setOpen}
            setInfo={setInfo}
            selectedProducts={selectedProducts}
            selectedBrands={selectedBrands}
          />
        </>
      )}
    </>
  );
};

export default Sales;
