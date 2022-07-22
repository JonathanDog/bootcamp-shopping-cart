import React from 'react';
import Head from '../components/head';
import Link from 'next/link';
import ShoppingItemList from '../components/ShopItemList'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {InputLabel, MenuItem, FormControl, Select} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const ShopPage = () => {
  const classes = useStyles();
  const [user, setUser] = React.useState(1);

  const handleChange = (event) => {
    setUser(event.target.value);
  };
  
  return(
  <Grid container
    direction="row"
    justifyContent="center"
    alignItems="center">
    <Head title='Home'/>
    <Grid item  container style={{display: "flex"}} sm={8}>
      <Typography variant="h3">Domain Shop</Typography>
      <FormControl variant="outlined" className={classes.formControl} style={{marginLeft: 'auto'}}>
        <InputLabel style={{color: "white"}}color="secondary"  id="demo-simple-select-outlined-label">User</InputLabel>
        <Select
          
          value={user}
          onChange={handleChange}
          label="User"
          color="secondary"
          style={{color: "white"}}  
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </Select>
      </FormControl>   
      <Link style={{}}href="/cart">
        <Button style={{marginLeft: 'auto'}} variant="contained" color="primary">Cart <ShoppingCartIcon style={{marginLeft: 8}}></ShoppingCartIcon> </Button>
      </Link>
    </Grid>
    <div>
   
      
      <ShoppingItemList user={user}></ShoppingItemList>
    </div>
  </Grid>
)};

export default ShopPage;