import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { useState} from "react"; 
import axios from 'axios';
import { fchmod } from 'fs';
import styles from './account.module.css'
import { Link } from 'react-router-dom';
import { EditProfile } from './Account/editProfileForm';
import { LinkedAccounts } from './Account/linkedAccountsForm';
import { EditPassword } from './Account/editPassword';
import { Routes, Route } from 'react-router-dom';
import {fetchAccountData} from './Account/fetchAccountData';

export const Account = (): JSX.Element => {
    return(
        <div className = {styles.accountFlex}>
            <div className = {styles.leftSide}>
              <EditProfile />
            </div>
            <div className = {styles.rightSide}> 
            <EditPassword />
            <LinkedAccounts />
            </div>
        </div>
    )
};