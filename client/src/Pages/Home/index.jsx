import { Box } from '@mui/material'
import React from 'react'
import Banner from './Banner'
import LastProducts from './LastProducts'

export default function Home() {
  return (
    <Box>
      <Banner/>
      <LastProducts/>
    </Box>
  )
}
