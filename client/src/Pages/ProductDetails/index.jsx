import { Box, Button, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import notify from '../../Utils/notify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {add,remove } from '../../Store/Slices/CartSlice'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState();
  const dispatch=useDispatch()
  const quantity=useSelector(state=>state.cart.items)?.filter(e=>e?._id==id)[0]?.cartQuantity
  console.log(quantity);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + `product/${id}`)
        const data = await res.json()
        setProduct(data.data)
      } catch (error) {
        notify('error', 'Something went wrong')
      }
    })()
  }, [id]);
  return (
    <>
      {product? <Stack flexDirection={{xs:'column',md:'row'}} height={'80vh'} width={'80%'} gap={'2%'} mx={'auto'} my={'20px'} borderRadius={'20px'} overflow={'hidden'} boxShadow={'0 0 10px 5px rgba(0,0,0,.2)'}>
        <Box width={{xs:'100%', md:'49%'}} height={{xs:'64%',md:'100%'}}>
          <img src={import.meta.env.VITE_BASE_URL+product?.images[0]} style={{ width:'100%',height:'100%',objectFit:'cover',borderRadius:'20px'}} alt={product?.name} />
        </Box>
        <Stack flexDirection={'column'} alignItems={'center'} justifyContent={'start'} gap={{xs:'2%',md:'30%'}} width={{xs:'100%', md:'49%'}} height={{xs:'44%',md:'100%'}} >
        <Stack padding={{xs:'0 2%',md:'5% 2%'}} alignItems={'center'}>
        <Typography sx={{typography:{xs:'h4',md:'h2'}}}>{product?.name}</Typography>
        <Typography variant='body1'>{product?.description}</Typography>
        <Typography variant='body2'>{product?.price}</Typography>
        </Stack>
        <Box>
          {quantity?<Box display={'flex'}><Button onClick={()=>dispatch(remove(id))} variant='contained' color='error'>-</Button>
          <Typography mx={'20px'}>{quantity}</Typography>
          <Button onClick={()=>dispatch(add(product))} variant='contained' color='success'>+</Button></Box>:<Button onClick={()=>dispatch(add(product))} variant='contained'>Add to cart</Button>}
        </Box>
        </Stack>
      </Stack>:    <Stack flexDirection={{ xs: 'column', md: 'row' }} height={'80vh'} width={'80%'} gap={'2%'} mx={'auto'} my={'20px'} borderRadius={'20px'} overflow={'hidden'} boxShadow={'0 0 10px 5px rgba(0,0,0,.2)'}>
      <Box width={{ xs: '100%', md: '49%' }} height={{ xs: '64%', md: '100%' }}>
        <Skeleton variant="rectangular" height="100%" />
      </Box>
      <Stack flexDirection={'column'} alignItems={'center'} justifyContent={'start'} gap={{ xs: '2%', md: '30%' }} width={{ xs: '100%', md: '49%' }} height={{ xs: '44%', md: '100%' }}>
        <Stack width={'100%'} padding={{ xs: '0 2%', md: '5% 2%' }} alignItems={'center'}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="80%" height={30} />
          <Skeleton variant="text" width="40%" height={30} />
        </Stack>
        <Box>
          <Skeleton variant="rectangular" width="100px" height="40px" />
        </Box>
      </Stack>
    </Stack>}
     
    </>
  )
}

