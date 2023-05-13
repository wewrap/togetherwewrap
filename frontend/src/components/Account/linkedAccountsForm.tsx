import * as React from 'react';
import { useState } from 'react'
import venmoIcon from '../../assets/venmoIcon.png'
import cashappIcon from '../../assets/cashappIcon.jpg'
import paypalIcon from '../../assets/payIcon.png'
import xIcon from '../../assets/xIcon.png'
import styles from './linkedAccount.module.css'
import {useRemoveAccount} from './useRemoveAccount'

export const LinkedAccounts = (): JSX.Element => {
  const [venmo, setVenmo] = useState<string>('');
  const [cashapp, setCashapp] = useState<string>('');
  const [paypal, setPaypal] = useState<string>('');
  const [hasVenmoAccount, setHasVenmoAccount] = useState<boolean>(false); 
  const [hasCashappAccount, setHasCashappAccount] = useState<boolean>(false); 
  const [hasPaypalAccount, setHasPaypalAccount] = useState<boolean>(false); 

  //TODO: retrieve venmo/cashapp/paypal URL from database 

  return (
        <form className = {styles.linkedAccountsForm}>
            <div className = {styles.profileFields}>
                <label className = {styles.labelFields}> </label>
                    <a className= {styles.venmoContainer} href='http://localhost:8000/auth/venmo'>
                    <img src={venmoIcon}  alt='venmoIcon' className = {styles.companyIcons} />
                    {venmo}
                    </a> 
                    <p> Log in with Venmo </p>
                <img src = {xIcon} onClick = {(venmo) => {useRemoveAccount}} alt = 'xIcon' className = {styles.xIcon}/>
            </div>
            <div className = {styles.profileFields}>
                <label className = {styles.labelFields}> 
                <a className= {styles.cashappContainer} href='http://localhost:8000/auth/cashapp'>
                    <img src={cashappIcon} alt='cashappIcon' className = {styles.companyIcons} />
                    {cashapp}
                </a>
                <p> Log in with Cashapp </p>
                    <img src = {xIcon} onClick = {(cashapp) => {useRemoveAccount}} alt = 'xIcon' className = {styles.xIcon} />
                </label>
            </div>
            <div className = {styles.profileFields}>
                <label className = {styles.labelFields}>
                <a className= {styles.paypalContainer} href='http://localhost:8000/auth/paypal'>
                        <img src={paypalIcon} alt='paypalIcon' className = {styles.companyIcons} />
                        {paypal}
                </a>
                <p> Log in with Paypal </p>
                    <img src = {xIcon} onClick = {(paypal) => {useRemoveAccount}} alt = 'xIcon' className = {styles.xIcon}/>
                </label> 
            </div>
        </form>
    )
}