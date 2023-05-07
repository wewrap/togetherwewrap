import * as React from 'react';
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import venmoIcon from '../../assets/venmoIcon.png'
import cashappIcon from '../../assets/cashappIcon.png'
import paypalIcon from '../../assets/cashappIcon.jpg'
import xIcon from '../../assets/xIcon.jpg'

export const LinkedAccounts = (): JSX.Element => {
    const [venmo, setVenmo] = useState<string>('');
    const [cashapp, setCashapp] = useState<string>('');
    const [paypal, setPaypal] = useState<string>('');

    const handleVenmo = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault; 

        //add pop-up & route to reset venmo
    }

    const handleCashapp = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault; 

        //add pop-up & route to reset cashapp
    }

    const handlePaypal = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault; 

        //add pop-up & route to reset paypal
    }

    return (
        <div className = "linkedAccountsForm">
            <div> 
                <a className='venmoContainer' href='http://localhost:8000/auth/venmo'>
                    <img src={venmoIcon} alt='venmoIcon' />
                    {venmo}
                 </a>
                 <button onChange={(event) => {{handleVenmo}}}>
                    <img src = {xIcon} alt = 'xIcon' />
                 </button>
            </div>
            <div>
                <a className='cashappContainer' href='http://localhost:8000/auth/cashapp'>
                    <img src={cashappIcon} alt='cashappIcon' />
                    {cashapp}
                </a>
                <button onChange={(event) => {{handleCashapp}}}>
                    <img src = {xIcon} alt = 'xIcon' />
                 </button>
            </div>
            <div>
                <a className='paypalContainer' href='http://localhost:8000/auth/paypal'>
                        <img src={paypalIcon} alt='paypalIcon' />
                        {paypal}
                </a>
                <button onChange={(event) => {{handlePaypal}}}>
                    <img src = {xIcon} alt = 'xIcon' />
                </button>
            </div>
        </div>
    )
}