
import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button } from '@material-ui/core'
import Head from '../components/head';
import CartItemList from '../components/CartItemList'


export const IndexPage = () => (
  <Container>
    <Head title='Cart'/>
    <div>
      <Typography variant="h3">Cart</Typography>   
    </div>
    <Link href="/shop">
        <Button variant="contained" color="primary">Shop </Button>
    </Link>
    <CartItemList></CartItemList>
  </Container>
);

export default IndexPage;
