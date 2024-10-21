import { Image } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({ image, title,id }) {
  return (
    <Box sx={{
      width: '25%', height: '300px', position: 'relative',
      overflow: 'hidden',
      borderRadius: '20px',
      boxShadow:'0 0 10px 2px rgba(0,0,0,.2)',
      '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition:'all .5s ease'
      },
      '&:hover > img': {
        filter: 'blur(5px) grayscale(80%)'
      },
      '& > a': {
        fontSize: '32px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        position: 'absolute',
        color:'white',
        transition:'all .5s ease-in-out',
        visibility:'hidden',
        opacity:0
      },
      '&:hover > a':{
        opacity:1,
        visibility:'visible'
      }
    }}>
      <img src={import.meta.env.VITE_BASE_URL + image[0]} />
      <Link to={`/products/${id}/${title.replaceAll(' ','-')}`}>{title}</Link>
    </Box>
  )
}
