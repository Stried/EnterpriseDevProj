import React, { useContext, useEffect, useState } from 'react'
import http from "../../http";
import UserContext from '../Users/UserContext';
import { useNavigate, useParams } from "react-router-dom";

function Cart() {
    let { id } = useParams();
    const { user } = useContext(UserContext);
    const [cartList, setCartList] = useState([]);
    const [cartItemList, setCartItemList] = useState([]);
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
                if (localStorage.getItem("accessToken")) {
                    // First GET request
                    http.get(`GetCartItem/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    })
                    .then((res) => {
                        console.log(res.data);
                        setCartItemList(res.data);
                    })
    
                    // Second GET request
                    const cartListResponse = await http.get(`GetCart/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    });
                    setCartList(cartListResponse.data);
                    console.log(cartListResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [id]); // Add dependencies as needed
    

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
                            {cartItemList.map((cartItem, i) => {
                                cartItem.event
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Cart