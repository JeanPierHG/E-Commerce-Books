import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../Styles/shoppingCart.module.css'
import { addToCart, clearCart, removeAllFromCart, removeOneFromCart } from "../actions";


export default function ShoopingCart(){

    const dispatch=useDispatch();
    const products=useSelector(state=>state.cart);
    const render=useSelector(state=>state.render);
    console.log('products :',products)
    let price=0;

    for (let i=0;i<products.length;i++){
        price=price+products[i].price*products[i].amount;
    }

    function handleAdd(e){
        e.preventDefault();
        dispatch(addToCart(e.target.value))
    }
    function handleRemoveOne(e){
        e.preventDefault();
        dispatch(removeOneFromCart(e.target.value))
    }
    function handleRemoveAll(e){
        e.preventDefault();
        dispatch(removeAllFromCart(e.target.value))
    }
    function handleClear(){
        dispatch(clearCart())
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
                    <h4>{e.title} ({e.price}$)</h4>
                    <button value={e._id} onClick={e=>{handleAdd(e)}}>+</button>
                    <button value={e._id} onClick={e=>handleRemoveAll(e)}>X</button>
                    <h4>X{e.amount}</h4>
                    </div>
                    )
                })
            }
            <button onClick={handleClear}>Vaciar carrito</button>
            {
                (products.length>0)?<button>Realizar compra</button>:null
            }
            <span>Precio Total :{price}</span>
        </div>
    )
}