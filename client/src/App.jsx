import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Auth from './Pages/Auth'
import Products from './Pages/Products'
import ProductDetails from './Pages/ProductDetails'
import Categories from './Pages/Categories'
import NotFound from './Pages/NotFound'
import Cart from './Pages/Cart'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Toaster } from 'react-hot-toast'
import { CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'



export default function App() {
  const {token}=useSelector(state=>state.auth)
  return (
    <>
    <CssBaseline/>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/auth' element={token?<Navigate to={'/'}/>:<Auth/>}/>
      <Route path='/products/:id/:name' element={<Products/>}/>
      <Route path='/product-details/:id/:name' element={<ProductDetails/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/cart' element={!token?<Navigate to={'/auth'}/>:<Cart/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}
