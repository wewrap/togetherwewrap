/* eslint-disable @typescript-eslint/keyword-spacing */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-duplicates */
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { useContext, useState } from "react";
import axios from 'axios';
import { fchmod } from 'fs';
import styles from './account.module.css'
import { Link } from 'react-router-dom';
import { EditProfile } from './editProfileForm';
import { LinkedAccounts } from './linkedAccountsForm';
import { EditPassword } from './editPassword';
import { Routes, Route } from 'react-router-dom';
import { fetchAccountData } from './fetchAccountData';
import { UserContext } from '../UserContext';

export const Account = (): JSX.Element => {
  const user = useContext(UserContext)[0]

  // const { data } = fetchAccountData(user.id)
  return (
    <div className={styles.background}>
      <div>
        <div className={styles.accountFlex}>
          <div className={styles.leftSide}>
            <EditProfile />
          </div>
          <div className={styles.rightSide}>
            {/* <EditPassword /> */}
            {/* <LinkedAccounts /> */}
          </div>
        </div>
      </div>

    </div>
  )
};
