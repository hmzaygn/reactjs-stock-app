import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import useStockCalls from "../../hooks/useStockCalls";

export default function BrandModal({ open, setOpen, info, setInfo }) {
  const { postBrand, putBrand } = useStockCalls();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putBrand(info);
    } else {
      postBrand(info);
    }
    setOpen(false);
    setInfo({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box component="form" onSubmit={handleSubmit} sx={flexColumn}>
            <TextField
              label="Brand Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              required
              value={info?.name || ""}
              onChange={handleChange}
            />

            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              required
              variant="outlined"
              value={info?.image || ""}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" size="large">
              Submit Firm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
