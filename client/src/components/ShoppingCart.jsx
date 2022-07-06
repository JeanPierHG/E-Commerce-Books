import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../Styles/shoppingCart.module.css'
import { addToCart, updateAmount, addToCartPurchaseOrder, clearCart, removeAllFromCart, removeAllFromCartPurchaseOrder, removeOneFromCart, removeOneFromCartPurchaseOrder } from "../actions";
import axios from "axios";


export default function ShoopingCart(){

    const dispatch=useDispatch();
    const products=useSelector(state=>state.cart);
    const render=useSelector(state=>state.render);
    const isLogged = useSelector(state => state.userLogged);
    const order = useSelector(state => state.purchaseOrder);
    
    let price=0;
    let productsAmount=0;

    

    for (let i=0;i<products.length;i++){
        price=price+products[i].price*products[i].amount;
        productsAmount=productsAmount + products[i].amount;
    }

    useEffect(()=>{
        dispatch(updateAmount(productsAmount))
    },[productsAmount])

    function handleAdd(e){
        e.preventDefault();
        dispatch(addToCart(e.target.value))
        dispatch(addToCartPurchaseOrder(e.target.value));
    }
    function handleRemoveOne(e){
        e.preventDefault();
        dispatch(removeOneFromCartPurchaseOrder(e.target.value));
        dispatch(removeOneFromCart(e.target.value))
    }
    function handleRemoveAll(e){
        e.preventDefault();
        dispatch(removeAllFromCartPurchaseOrder(e.target.value));
        dispatch(removeAllFromCart(e.target.value))
    }
    function handleClear(){
        dispatch(clearCart())
    }

    const handleClick = async() => {
        
        const json = await axios.post('https://ecommercehenryx.herokuapp.com/mercadopago/orden', order);
        console.log('soycompras', json.data);
        location.assign(json.data.init_point);
    }

    useEffect(()=>{},
    [products])

    return(
        <div>
            <h1>Carrito de compras</h1>
            <h3>Productos :</h3>
            {
                products.map(e=>{
                    return(
                    <div className={styles.product}>
                    <button value={e._id} onClick={e=>handleRemoveOne(e)}>-</button>
                    <h4>{e.title} (${e.price})</h4>
                    <button value={e._id} onClick={e=>{handleAdd(e)}}>+</button>
                    <button value={e._id} onClick={e=>handleRemoveAll(e)}>X</button>
                    <h4>X{e.amount}</h4>
                    </div>
                    )
                })
            }
            <button onClick={handleClear}>Vaciar carrito</button>
            {
                (products.length>0)?<button type="submit" onClick={handleClick}>Realizar compra</button>:null
            }
            <p>Cantidad de productos : {productsAmount}</p>
            <p>Precio Total :{price}</p>
        </div>
    )
}