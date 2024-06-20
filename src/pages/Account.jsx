import React, { useEffect } from 'react'
import { Footer } from "../components";
import { useState } from 'react';
import AccountInfo from '../models/account';
import { useNavigate } from 'react-router-dom';
import AccountInfoService from '../services/accountInfo.service';
import store from '../redux/store';
import { toast } from 'react-toastify';
import { addCart } from "../redux/action";
import { useDispatch } from 'react-redux';


export default function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [account, setAccount] = useState(new AccountInfo('', '', '', ''));
    const currentUser = store.getState().user;
    const [errorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    }

    const handleAddress = (e) => {
        e.preventDefault();
        // toast.success("Thank you, Order placed👍", { autoClose: 1500 });
        // navigate("/product")
        // dispatch(addCart({}))

console.log(account)
AccountInfoService.savePayment(currentUser.id, account).then((resp) => {
            toast.success("Order Placed", { autoClose: 1500 });
            navigate("/product")
        }).catch((error) => {
            console.log(error)
        });
    };
    return (
        <>
            <div className="container my-3 py-3">
                <h1 className="text-center">Billing Info</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">

                        {errorMessage &&
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        }
                        <form onSubmit={(e) => handleAddress(e)}>
                            <div class="form my-3">
                                <label for="cName">Card Number</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="cName"
                                    name="cardNumber"
                                    value={account.cardNumber}
                                    placeholder="Card Number"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="form my-3">
                                <label for="eDate">Expiry Date</label>
                                <input
                                    type="date"
                                    class="form-control"
                                    id="eDate"
                                    name="expiryDate"
                                    value={account.expiryDate}
                                    placeholder="Expiry Date"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">CCV</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    name="ccv"
                                    value={account.ccv}
                                    placeholder="CCV"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div class="form my-3">
                                <label for="hName">Holder Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="hName"
                                    name="holderName"
                                    value={account.holderName}
                                    placeholder="Holder Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>






                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit" >
                                    Checkout
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}


/*
card numbere
expiry date
cvc
holder name
*/