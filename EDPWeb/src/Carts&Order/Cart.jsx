import React, { useContext, useEffect, useState } from 'react'
import http from "../../http";
import UserContext from '../Users/UserContext';

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
        const fetchData = async () => {
          try {
            useEffect(() => {
                if (localStorage.getItem("accessToken")) {
                    http.get(`/cart/GetCartItem/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    })
                        .then((res) => {
                            setCartItemList(res.data);
                            console.log(cartList);
                        })
                        .catch(function (err) {
                            console.log(err);
                            console.log(cartList);
                        });
                }});
    
            // Second GET request
            useEffect(() => {
                if (localStorage.getItem("accessToken")) {
                    http.get(`/cart/GetCart${id}`, {
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


          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

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