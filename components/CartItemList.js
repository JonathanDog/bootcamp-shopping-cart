import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import ShopItem from './CartItem'
import CartItem from './CartItem';


function CartItemList() {

  // this is the state we will use to hold the response from the api
  const [items, setItems] = useState([]);
  const router = useRouter()

  const getProductUrl = "http://localhost:8000/v1/cartitems"

  useEffect(async () => {
    const response = await fetch(getProductUrl, {method: "GET"})
    const data = await response.json()
    
    const items = data
    setItems(items)
    console.log(items)
  }, [])

  const handleAddToCart = async (product) => {
    /* add product to cart via api */
    /* redirect to the cart page */
  }

  
  

  return (
    <Grid container direction="row" spacing={1}>
      {items.map((item) => (
        <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} id={item.id}></CartItem>
      ))}
    </Grid>
  )
}

export default CartItemList