import React, { useEffect, useState } from 'react'
import {Stack} from '@mui/material'
import notify from '../../Utils/notify';
import Card from './Card';


export default function Categories() {
  const [categories, setCategories] = useState();
  useEffect(() => {
    (async()=>{
      try {
        const res=await fetch(import.meta.env.VITE_BASE_API+'category')
        const data=await res.json()
        if(data.success){
          setCategories(data.data)
        }else{
          notify('error','something went wrong')
        }
      } catch (error) {
        notify('error','something went wrong')
      }
    })()
  
  }, []);
  const items=categories?.map((e,index)=><Card key={index} id={e?._id} title={e?.title} image={e?.image}/>)
  return (
    <Stack width={'80%'} mx={'auto'} flexDirection={'row'} my={'20px'} justifyContent={'space-between'}>
      {items}
    </Stack>
  )
}
