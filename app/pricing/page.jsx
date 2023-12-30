// components/Pricing.js
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Pricing() {
    const [prices, setPrices] = useState([]);
    useEffect(() => {
        fetchPrices()
    }, [])
    const fetchPrices = async () => {
        const { data } = await axios.get("/api/getproducts");
        setPrices(data);
    };

    console.log(prices);

    const nameChange = (item) => {
        if (item.nickname === "basic") {
            return "Basic"
        }
        if (item.nickname === "pro") {
            return "Pro"
        }
        if (item.nickname === "Premium") {
            return "Premium"
        }
    }

    const handleSubScription = async (e, item) => {
        e.preventDefault();
        console.log(item.id)
        const { data } = await axios.post("/api/payment", { priceId: item.id }, { headers: { "Content-Type": "application/json" } })
        window.location.assign(data)
    }
    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Pricing</h2>
                    <p className="mt-1 text-4xl font-extrabold text-gray-900">Choose a plan that works for you</p>
                    <p className="mt-4 text-lg text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec justo vel augue blandit eleifend.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

                    {
                        prices.map((items, index) => (
                            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm" key={items.id}>
                                <h3 className="text-xl leading-6 font-medium text-gray-900">{nameChange(items)}</h3>
                                <div className="mt-4 flex items-center justify-center">
                                    <span className="mr-1 text-5xl font-extrabold text-gray-900">{`₹${(items.unit_amount) / 100}`}</span>
                                    <span className="text-base font-medium text-gray-500">/month</span>
                                </div>
                                <p className="mt-6 text-sm text-gray-500">
                                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, quis at cupiditate cum velit dignissimos itaque deleniti repellendus consectetur nam enim consequatur. Harum iste fugiat quod porro excepturi. Assumenda, cupiditate!
                                </p>
                                <div className="mt-6">
                                    <button
                                        onClick={(e) => handleSubScription(e,items)}
                                        className="block text-center py-2 px-4 border border-transparent bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    );
}

export default Pricing;
