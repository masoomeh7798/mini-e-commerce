import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <>
    <Stack bgcolor={'darkblue'} height={'100px'}  flexDirection={'row'} justifyContent={'center'} alignItems={'center'} component={'footer'}>
      <Typography variant='h3' component={'p'} sx={{color:"white"}}>Footer</Typography>
    </Stack>
    </>
  )
}
