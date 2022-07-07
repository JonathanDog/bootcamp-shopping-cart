import React from 'react';
import Head from '../components/head';
import Link from 'next/link';
import ShoppingItemList from '../components/ShopItemList'

import { Container, Typography, Button } from '@material-ui/core'

export const ShopPage = () => (
  <Container>
    <Head title='Home'/>
    <div>
      <Typography variant="h3">My Shop</Typography>   
    </div>
    <div>
   
      <Link href="/cart">
        <Button variant="contained" color="primary">Cart </Button>
      </Link>
      <ShoppingItemList></ShoppingItemList>
    </div>
  </Container>
);

export default ShopPage;