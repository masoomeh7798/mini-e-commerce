import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider';
import notify from '../../Utils/notify.js'
import ProductCard from './Card';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';

function valuetext(value) {
  return `$${value}`;
}
export default function Products() {
  const {id:categoryId}=useParams()
  const [price, setPrice] = useState([0, 1000]);
  const [products, setProducts] = useState();
  const [sort, setSort] = useState('');
  const handlePrice = (event, newValue) => {
    setPrice(newValue);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };
  useEffect(() => {
    (async()=>{
      try {
        const res=await fetch(import.meta.env.VITE_BASE_API+`product?filters[price][$gte]=${price[0]}&filters[price][$lte]=${price[1]}&sort=${sort}${categoryId=='all'?'':`&filters[categoryId][$eq]=${categoryId}`}`)
        const data=await res.json()
        setProducts(data.data)
        
      } catch (error) {
        console.log(error);
        notify('error','sth went wrong')
      }
    })()

  }, [price,sort,categoryId]);

  const items=products?.map((e,index)=><ProductCard key={index} id={e?._id} name={e?.name} images={e?.images}
  description={e?.description} price={e?.price}/>)

  return (
   <>
   <Stack alignItems={'center'} flexDirection={'row'} width={'80%'} mx={'auto'} justifyContent={'space-between'}>
   <Box sx={{ width: 300,my:'20px' }}>
    <Typography>Price:</Typography>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={price}
        onChange={handlePrice}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={1000}
      />
    </Box>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sort">Sort</InputLabel>
        <Select
          id="sort"
          value={sort}
          label="Sort"
          onChange={handleSort}
        >
          <MenuItem value={'-createdAt'}>Newest</MenuItem>
          <MenuItem value={'-price'}>Price from high to low</MenuItem>
          <MenuItem value={'price'}>Price from low to high </MenuItem>
        </Select>
      </FormControl>
    </Box>
   </Stack>
   
   <Stack my={'20px'} gap={'20px 5%'} mx={'auto'} width={'80%'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
    {items}
   </Stack>
   </>
  )
}
