import  { useEffect } from 'react'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';
import { Navigation, Pagination } from 'swiper/modules';
import notify from '../../../Utils/notify';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export default function LastProducts() {
    const [product, setProduct] = useState();
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_BASE_API + 'product?sort=-createdAt&limit=9')
                const data = await res.json()
                setProduct(data.data)
            } catch (error) {
                notify('error', 'something went wrong')
            }
        })()
    }, []);
    const items = product?.map((e, index) =>
    
        <SwiperSlide style={{height:'500px'}}  key={index}> 
        <Card sx={{ maxWidth: 345 ,height:'90%',width:'100%'}}>
            <CardMedia
                component="img"
                alt={e?.title}
                sx={{height:'60%'}}
                image={import.meta.env.VITE_BASE_URL + e?.images[0]}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {e?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {e?.description?.split(' ').slice(0, 10).join(' ')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' sx={{ml:'auto'}} size="small"><Link style={{color:'white'}} to={`/product-details/${e?._id}/${e?.name.replaceAll(' ', '-')}`}>more information</Link></Button>
            </CardActions>
        </Card>
        </SwiperSlide>)
    return (
        <>
        <Box borderRadius={'25px'}  px={'20px'} sx={{backgroundColor:'#D7D8DC'}} my={'40px'} mx={'2%'}>
            <Box py={'20px'}>
                <Typography  bgcolor={'transparent'} variant='h3' component='body' >Last Products</Typography>
            </Box>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination,Navigation]}
                className="lastProducts"
            >
                {items}

            </Swiper>
            </Box>
        </>

    )
}





