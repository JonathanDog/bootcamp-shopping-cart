import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import ShopItem from './ShopItem'


function ShoppingItemList() {

  // this is the state we will use to hold the response from the api
  const [products, setProducts] = useState([]);
  const router = useRouter()

  const getProductUrl = "http://localhost:8000/v1/products"

  useEffect(async () => {
    const response = await fetch(getProductUrl, {method: "GET"})
    const data = await response.json()
    
    const products = data
    setProducts(products)
    console.log(products)
  }, [])

  const handleAddToCart = async (product) => {
    /* add product to cart via api */
    /* redirect to the cart page */
  }

  
  

  return (
    <Grid container direction="row" spacing={1}>
      {products.map((product) => (
        <ShopItem key={product.id} name={product.name} description={product.description} price={product.price}></ShopItem>
      ))}
    </Grid>
  )
}

export default ShoppingItemList