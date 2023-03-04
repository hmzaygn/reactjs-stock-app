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
// import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const Products = () => {
  const { getProducts, getCategories, getBrands, deleteProduct } =
    useStockCalls();
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
    getProducts();
    getBrands();
    getCategories();
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
          <InputLabel id="demo-multiple-name-label">Product</InputLabel>
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
        <TableContainer component={Paper} sx={{ mt: 4 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("brand", "text")}
                  >
                    <div>Brand</div>
                    {columns.brand === 1 && <UpgradeIcon />}
                    {columns.brand !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("name", "text")}
                  >
                    <div>Name</div>
                    {columns.name === 1 && <UpgradeIcon />}
                    {columns.name !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={arrowStyle}
                    onClick={() => handleSort("stock", "number")}
                  >
                    <div>Stock</div>
                    {columns.stock === 1 && <UpgradeIcon />}
                    {columns.stock !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                ?.filter((item) => isBrandSelected(item))
                ?.filter((item) => isProductSelected(item))
                .map((product, index) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.brand}</TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.stock}</TableCell>
                    <TableCell align="center">
                      <DeleteForeverIcon
                        sx={btnHoverStyle}
                        onClick={() => deleteProduct(product.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
