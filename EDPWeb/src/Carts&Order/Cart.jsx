import React, { useContext, useEffect, useState } from 'react'
import http from "../../http";
import Dropdown from 'react-bootstrap/Dropdown'
import UserContext from '../Users/UserContext';
import { DropdownToggle } from 'react-bootstrap';

function Cart() {
    const { user } = useContext(UserContext);
    const [cartList, setCartList] = useState([]);
    const [cartItemList, setCartItemList] = useState([])
    localStorage.setItem('user', JSON.stringify(user));
    const storedUser = localStorage.getItem('user');
    let quantityMessage;
    if (cartItemList.length <= 1) {
        quantityMessage = <p>{cartList.length} item</p>
    }
    else {
        quantityMessage = <p>{cartList.length} items</p>
    }
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            http.get("/GetCart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
                .then((res) => {
                    setCartList(res.data);
                    console.log(cartList);
                })
                .catch(function (err) {
                    console.log(err);
                    console.log(cartList);
                });
        }});
    return (
        <div className='bg-gray-300 px-10'>
            <div className='relative'>
                <img src="../src/assets/u-sports-banner.jpg" className='w-full' />
                <div class="absolute inset-0 flex items-center justify-center">
                    <h1 className='text-white font-bold text-8xl'>Your Cart</h1>
                </div>
            </div>
            <div className='relative text-2xl font-bold '>
                <p className='bg-gray-400 w-24 text-center'>{quantityMessage}</p>
                {/* <Dropdown className='w-60 bg-gray-400 text-center absolute right-0 top-0'>
                    <Dropdown.Toggle>
                        Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item id=''>Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
            </div>
            <div className='px-5'>
                {cartList.map((cart, i) => {
                    return (
                        <div>                            
                            {cart.eventId}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Cart