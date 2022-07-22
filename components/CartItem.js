import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography, Snackbar} from '@material-ui/core'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';



  

function CartItem({name, description, image_url, price, quantity, id, user, updateFunc}) {
    const cartItemURL = `http://localhost:8000/v1/cartitems`
    

    const removeFromCart = async () => {
        
        const response = await fetch(`${cartItemURL}/${user}/${id}`, {
            method: "DELETE"
        })
        updateFunc(name, quantity)
        
       
        
    }

  return (
    
    <div style={{marginTop: 10}}>
        
        <Card style={{ backgroundColor: "#ABECFB",}}>

            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography  color="textSecondary" gutterBottom>
                    Quantity: {quantity}
                </Typography>
                <Typography variant="h6">
                    ${price}
                </Typography>
                <Button  onClick={removeFromCart} variant="contained" color="secondary"><RemoveShoppingCartIcon/></Button>
            </CardContent>
        </Card>
    </div>
    
  );
}

export default CartItem;