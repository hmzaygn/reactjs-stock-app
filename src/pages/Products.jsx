import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import { useEffect, useState } from "react";
import useStockCalls from "../hooks/useStockCalls";
import useSortColumn from "../hooks/useSortColumn";
import { useSelector } from "react-redux";
import { arrowStyle, btnHoverStyle, flexCenter } from "../styles/globalStyle";
import ProductModal from "../components/modals/ProductModal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import ProductsTable from "../components/tables/ProductsTable";

const Products = () => {
  const { getProCatBrands, deleteProduct } = useStockCalls();
  const { products, brands } = useSelector((state) => state.stock);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");

  const columnObj = {
    brand: 1,
    name: 1,
    stock: 1,
  };

  const { handleSort, sortedData, columns } = useSortColumn(
    products,
    columnObj
  );

  const isBrandSelected = (item) =>
    selectedBrands?.includes(item.brand) || selectedBrands.length === 0;

  const isProductSelected = (item) =>
    selectedProducts?.includes(item.name) || selectedBrands.length === 0;

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
    getProCatBrands();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error">
        Products
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        New Product
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

      <ProductModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

      {sortedData?.length > 0 && (
        <ProductsTable
          selectedProducts={selectedProducts}
          selectedBrands={selectedBrands}
        />
      )}
    </Box>
  );
};

export default Products;
