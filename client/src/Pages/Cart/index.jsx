import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Stack, TableFooter, Typography } from '@mui/material';
import { add, remove, clear } from "../../Store/Slices/CartSlice"


export default function Cart() {
  const { items, totalPrice } = useSelector(state => state.cart)
  console.log(totalPrice);
  const dispatch = useDispatch()
  const rowItems = items.map((item, index) => (
    <TableRow key={item._id}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">{item.name}</TableCell>
      <TableCell align="center">
        <img
          style={{ width: '100px', height: '100px', borderRadius: '20px' }}
          src={`${import.meta.env.VITE_BASE_URL}${item.images[0]}`}
          alt={item.name}
        />
      </TableCell>
      <TableCell align="center">{item.price}</TableCell>
      <TableCell align="center">{item.cartQuantity}</TableCell>
      <TableCell align="center">{item.price * item.cartQuantity}</TableCell>
      <TableCell align="center">
        <Stack flexDirection={'row'} justifyContent={'center'} gap={'10px'}>
          <Button variant="contained" color="error" onClick={() => dispatch(remove(item._id))}>
            -
          </Button>
          <Button variant="contained" color="success" onClick={() => dispatch(add(item))}>
            +
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      {items.length > 0 ? (
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">image</TableCell>
                  <TableCell align="center">price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">add/remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowItems}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">{totalPrice}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Button variant='contained' color='error' onClick={() => dispatch(clear())}>Clear Cart</Button>
        </Box>
      ) :
        <Typography variant="h2">Cart is empty... Buy something...</Typography>


      }

    </>
  );
}
