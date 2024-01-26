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
        quantityMessage = <p>{cartItemList.length} item</p>
    }
    else {
        quantityMessage = <p>{cartItemList.length} items</p>
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem("accessToken")) {

                    http.get(`GetCart/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    })
                    .then((res) => {
                        console.log(res.data);
                        setCartList(res.data);
                    })
    

                    const cartListResponse = await http.get(`GetCartItem/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    });
                    setCartItemList(cartListResponse.data);
                    console.log(cartListResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [id]); 
    

    return (
        <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
            <div className='relative'>
                <img src="../src/assets/u-sports-banner.jpg" className='w-full' />
                <div class="absolute inset-0 flex items-center justify-center">
                    <h1 className='text-white font-bold text-8xl'>Your Cart</h1>
                </div>
            </div>

<div className="flex h-screen justify-center items-center">

  <div className=" bg-gray-200 p-4 flex drop-shadow-2xl"style={{ width: '97%', height:'80%' }} >

  <div className="bg-blue-500 p-4" style={{ width: '80%', marginRight: '1%' }}>
  <div className="text-4xl font-semibold flex items" style={{marginBottom: '2.4%'}} >
    <div style={{  marginLeft: '0.5%' }}>
    Cart Items
    </div>
    <span className="text-4xl " style={{ marginLeft: '65%' }}>
    {quantityMessage}
  </span>
  </div>


  <hr className="mx-auto text-center border-t-2"style={{ width: '98.3%', marginBottom:'5%'}}/>
</div>


    <div className=" bg-gray-500 p-4" style={{ width: '40%'}}>
<div className="text-4xl font-semibold "style={{ marginTop: '2%', marginBottom: '3%', marginLeft: '3%'}}>Order Summary</div>
<hr className="mx-auto text-center border-t-2"style={{ width: '92%'}}/>
<div style={{ marginTop: '5%', marginLeft: '4%'}}>
    <div className="text-2xl " style={{ marginBottom: '5%'}}>
    {quantityMessage}
    </div>
    <form style={{ marginBottom: '5%'}}>
        <div className="text-2xl font-semibold">
            Promo Code:
        </div>
        <input 
        placeholder="Enter Promo Code"
        className="bg-white border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400" style={{ marginRight:'5%'}}
        />
        <button
        className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
        >
        Apply
        </button>
    </form>
    <hr className="mx-auto text-center border-t-2"style={{ width: '96.3%', marginRight:'5%', marginBottom:'5%'}}/>
    <div className="text-2xl font-semibold" style={{ marginBottom: '5%'}}>
    Total Price:
    <span style={{ marginLeft: '15%', marginBottom: '5%'}}>
    Some Number
    </span>
    </div>
    <button
        className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
        style={{ width: '96.3%'}}
        >
        Checkout
        </button>
</div>

    </div>
  </div>
</div>
            <div className='px-5'>
            <div>
                    {cartItemList && cartItemList.map((cartItem, i) => (
                        <div key={i}>
                            ID:
                            {cartItem.eventId}
                            <br></br>
                            Name:
                            {cartItem.event.eventName}
                            <br></br>
                            Price:
                            {cartItem.event.eventPrice}
                            <br></br>
<hr/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Cart