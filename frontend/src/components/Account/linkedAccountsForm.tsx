import * as React from 'react';
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import venmoIcon from '../../assets/venmoIcon.png'
import cashappIcon from '../../assets/cashappIcon.jpg'
import paypalIcon from '../../assets/payIcon.png'
import xIcon from '../../assets/xIcon.png'
import styles from './linkedAccount.module.css';

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
        <form className = {styles.linkedAccountsForm}>
            <div> 
                <label> 
                    <a className= {styles.venmoContainer} href='http://localhost:8000/auth/venmo'>
                    <img src={venmoIcon} alt='venmoIcon' className = {styles.companyIcons} />
                    {venmo}
                    </a>
                </label>
                 <button className = {styles.iconButton} onChange={(event) => {{handleVenmo}}}>
                    <img src = {xIcon} alt = 'xIcon' className = {styles.xIcon}/>
                 </button>
            </div>
            <div>
                <a className= {styles.cashappContainer} href='http://localhost:8000/auth/cashapp'>
                    <img src={cashappIcon} alt='cashappIcon' className = {styles.companyIcons} />
                    {cashapp}
                </a>
                <button className = {styles.iconButton} onChange={(event) => {{handleCashapp}}}>
                    <img src = {xIcon} alt = 'xIcon' className = {styles.xIcon} />
                 </button>
            </div>
            <div>
                <a className= {styles.paypalContainer} href='http://localhost:8000/auth/paypal'>
                        <img src={paypalIcon} alt='paypalIcon' className = {styles.companyIcons} />
                        {paypal}
                </a>
                <button className = {styles.iconButton} onChange={(event) => {{handlePaypal}}}>
                    <img src = {xIcon} alt = 'xIcon' className = {styles.xIcon}/>
                </button>
            </div>
        </form>
    )
}