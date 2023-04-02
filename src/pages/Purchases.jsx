import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import PurchaseModal from "../components/modals/PurchaseModal";
import PurchaseTable from "../components/tables/PurchasesTable";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { flexCenter } from "../styles/globalStyle";

const Purchases = () => {
  const { purchases, products, brands } = useSelector((state) => state.stock);
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
      <PurchaseModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={setOpen}
      />

      <Typography variant="h4" color="error" mt={4} mb={4}>
        Purchases
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Purchase
      </Button>

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

      {purchases?.length > 0 && (
        <>
          <PurchaseTable
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

export default Purchases;
