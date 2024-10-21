import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ProductCard({id,
    name,
    images,
    description,
    price}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 240 }}
        image={import.meta.env.VITE_BASE_URL+images[0]}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description?.split(' ').slice(0,10).join(' ')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Price: ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><Link to={`/product-details/${id}/${name.replaceAll(' ','-')}`}>more information</Link></Button>
      </CardActions>
    </Card>
  );
}
