import * as React from 'react';
import { useState, useEffect } from 'react'

export interface accountType {
    venmo: string
    paypal: string
    cashapp: string
}

export const useRemoveAccount = (accountType: string): any => {
    const [venmo, setVenmo] = useState<boolean>(false); 
    const [paypal, setPaypal] = useState<boolean>(false); 
    const [cashapp, setCashapp] = useState<boolean>(false); 

    // useEffect(() =>{
        
    // }
}