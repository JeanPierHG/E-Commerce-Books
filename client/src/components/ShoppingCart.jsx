import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../Styles/shoppingCart.module.css'
import stylesbutton from '../Styles/button.module.css'
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
        location.assign(json.data.init_point);
    }

    useEffect(()=>{},
    [products])

    return(
        (products.length===0)?<h1 className={styles.empity}>El carrito esta vacio!</h1>:
        <div>
            <h3>Productos :</h3>
            {
                products.map(e=>{
                    return(
                    <div className={styles.product}>
                    <h4>{e.title} ({e.price}$)</h4>
                    <div className={styles.amount}>
                        <button value={e._id} onClick={e=>handleRemoveOne(e)} className={styles.button}>  -  </button>
                        <h4 className={styles.number}>{e.amount}</h4>
                        <button value={e._id} onClick={e=>{handleAdd(e)}} className={styles.button}> + </button>
                    </div>
                    <div className={styles.remove}>
                        <button value={e._id} onClick={e=>handleRemoveAll(e)}className={styles.buttonX}>Quitar</button>
                        <h4>total : {e.price*e.amount}$</h4>
                    </div>
                    </div>
                    )
                })
            }
            <p className={styles.datos} >Cantidad de productos : {productsAmount}</p>
            <p className={styles.datos} >precio Total :{price}$</p>
            <div className={styles.foot}>
                <button onClick={handleClear} className={styles.buttonX}>Vaciar carrito</button>
                {
                    (products.length>0)?<button type="submit" className={stylesbutton.button} onClick={handleClick}>Realizar compra</button>:null
                }
            </div>
        </div>
    )
}