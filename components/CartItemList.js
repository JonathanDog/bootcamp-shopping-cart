import React, { useState, useEffect } from 'react';
import { Grid, Typography, Snackbar } from '@material-ui/core'
import { useRouter } from 'next/router'
import MuiAlert from '@material-ui/lab/Alert';

import CartItem from './CartItem';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function CartItemList({user}) {


  // this is the state we will use to hold the response from the api
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0)
  const [msgQ, setQ] = useState(0)
  const [msgN, setN] = useState("")
  const [successOpen, setSuccessOpen] = React.useState(false);
  let quantity = 0
    const handleClickSuccess = () => {
        setSuccessOpen(true);
      };
  
      const handleCloseSuccess = (event, reason) => {
          if (reason === 'clickaway') {
              return;
          }
  
          setSuccessOpen(false);
      };
  const router = useRouter()

  const getProductUrl = `http://localhost:8000/v1/cartitems/${user}`

  useEffect(async () => {
    const response = await fetch(getProductUrl, {method: "GET"})
    const data = await response.json()
    
    const items = data
    setItems(items)
    console.log(items)
    calculateTotal(items)
  }, [user, total])
 
  const calculateTotal = (items) => {
    let sum = 0
    items.forEach((item) => {
        sum += item.price * item.quantity
    })
    setTotal(sum)
  }

  const updateFunc = (name, quanitity) => {
    setQ(quanitity)
    setN(name)
    handleClickSuccess()
    setTotal(null)
  }

  
  

  return (
    <div>
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleCloseSuccess} anchorOrigin={{horizontal: "center", vertical: "top"}}>
            <Alert onClose={handleCloseSuccess} severity="success">
                Successfully removed {msgQ} {msgN} from cart!
            </Alert>
        </Snackbar>
        <Grid container direction="row" spacing={4}>
      {items.map((item) => (
        <Grid item xs={3}>
        <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} id={item.id} user={user} updateFunc={updateFunc}></CartItem>
        </Grid>
      ))}
    </Grid>
    <Typography  variant="h4" style={{marginTop: 20}}>Subtotal: ${total}</Typography>
    </div>
    
  )
}

export default CartItemList