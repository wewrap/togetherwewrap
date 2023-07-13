import {
  Button,
  Select,
  Flex,
  useToast,
  Spinner
} from '@chakra-ui/react'
import styles from './Purchase.module.css';
import React, { useState } from 'react';
import DeliveryAddressForm from './DeliveryAddressForm';
import axios from 'axios';
import { fetchPlanAndContactsData } from '../../../Plan/hook/fetchPlanAndContactsData';

interface PoolProps {
  planID: any // string | undefined
  isCurrentPlanStage: boolean
  isUserPlanLeader: boolean
}

enum GiftDeliveryChoice {
  UNDECIDED = 'UNDECIDED',
  HAND_IN_PERSON = 'HAND_IN_PERSON',
  SHIP = 'SHIP'
}

enum PurchaseStatus {
  PURCHASED = 'PURCHASED',
  NOT_PURCHASED = 'NOT_PURCHASED'
}

export const Purchase = ({ planID, isCurrentPlanStage, isUserPlanLeader }: PoolProps) => {
  const [lastUpdate] = useState(Date.now())
  const { planData, setPlanData } = fetchPlanAndContactsData(planID, lastUpdate)
  console.log('🚀 ~ file: Purchase.tsx:34 ~ Purchase ~ planData:', planData)

  const handleSetDeliveryAddress = async (deliveryAddress: string) => {
    try {
      const response = await axios.put(`/api/plan/${planID}`, {
        giftDeliveryAddress: deliveryAddress
      }, { withCredentials: true })
      setPlanData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdatePurchaseStatus = async (purchaseStatus: PurchaseStatus) => {
    try {
      const response = await axios.put(`/api/plan/${planID}`, {
        giftPurchaseStatus: purchaseStatus
      }, { withCredentials: true })
      console.log('setting plan data...')
      setPlanData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateDeliveryChoice = async (giftDeliveryChoice: GiftDeliveryChoice) => {
    try {
      const response = await axios.put(`/api/plan/${planID}`, {
        giftDeliveryChoice
      }, { withCredentials: true })
      setPlanData(response.data)
    } catch (error) {
      console.error(error)

    }
  }

  if (planData === undefined) return <div>loading...</div>

  // isUserPlanLeader = false; // testing purposes

  return (
    <div className={styles.stageBackground}>
      <div className={styles.purchaseContainer}>
        {isUserPlanLeader
          ? <LeaderView
            handleSetDeliveryAddress={handleSetDeliveryAddress}
            handleUpdatePurchaseStatus={handleUpdatePurchaseStatus}
            handleUpdateDeliveryChoice={handleUpdateDeliveryChoice}
            defaultPurchaseStatus={planData?.giftPurchaseStatus}
            defaultGiftDeliveryChoice={planData?.giftDeliveryChoice}
            planData={planData}
          />

          : <MemberView planData={planData} />
        }

      </div>
      {/* <MemberView /> */}
    </div>
  )
}

const LeaderView = ({
  handleSetDeliveryAddress,
  handleUpdatePurchaseStatus,
  handleUpdateDeliveryChoice,
  defaultPurchaseStatus,
  defaultGiftDeliveryChoice,
  planData
}: any) => {

  const [purchaseState, setPurchaseState] = useState<PurchaseStatus>(defaultPurchaseStatus);
  const [deliveryState, setDeliveryState] = useState<GiftDeliveryChoice>(defaultGiftDeliveryChoice);
  const [isDeliveryLoading, setIsDeliveryLoading] = useState(false);
  const [isPurchaseLoading, setPurchaseIsLoading] = useState(false);

  const toast = useToast();

  const setPurchaseStatus = async () => {
    setPurchaseIsLoading(true);

    await handleUpdatePurchaseStatus(purchaseState)

    toast({
      title: 'Successfully set purchase status',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'bottom',
      variant: 'solid',
      colorScheme: 'green'
    });

    setPurchaseIsLoading(false);

  };

  const setGiftDeliveryChoiceStatus = async () => {
    setIsDeliveryLoading(true);

    await handleUpdateDeliveryChoice(deliveryState)

    toast({
      title: 'Successfully gift delivery mode',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'bottom',
      variant: 'solid',
      colorScheme: 'green'
    });

    setIsDeliveryLoading(false);

  };

  return (
    <>
      <div className={styles.setPlanDataContainer}>
        <div>
          <h2>Please set the mode of delivery</h2>
          <div className={styles.line}></div>
          <Flex align="center">
            <Select
              onChange={(event) => { setDeliveryState(event.target.value as GiftDeliveryChoice); }}
              value={deliveryState}
              width="200px"
              marginRight="20px"
              backgroundColor={'var(--light-yellow)'}
            >
              <option value={GiftDeliveryChoice.HAND_IN_PERSON} >Hand In Person</option>
              <option value={GiftDeliveryChoice.SHIP}>Ship To Person</option>
            </Select>

            <Button
              onClick={setGiftDeliveryChoiceStatus}
              background={'var(--green)'}
              color={'var(--white)'}
              isLoading={isDeliveryLoading}
              width={160}
              height={50}
              fontSize={15}
              _hover={{ background: 'var(-green)' }}>
              {isDeliveryLoading ? <Spinner width={160} /> : 'Set Delivery Mode'}
            </Button>
          </Flex>
        </div>
        <div>
          <h2>After purchasing the gift, please set the purchase status</h2>
          <div className={styles.line}></div>

          <Flex align="center">
            <Select
              onChange={(event) => { setPurchaseState(event.target.value as PurchaseStatus); }}
              value={purchaseState}
              width="200px"
              backgroundColor={'var(--light-yellow)'}
              marginRight="20px"
            >
              <option value={PurchaseStatus.PURCHASED}>Purchased</option>
              <option value={PurchaseStatus.NOT_PURCHASED}>Not purchased</option>
            </Select>

            <Button onClick={setPurchaseStatus}
              background={'var(--green)'}
              color={'var(--white)'}
              isLoading={isPurchaseLoading}
              width={180}
              height={50}
              fontSize={15}
              _hover={{ background: 'var(-green)' }}>
              {isPurchaseLoading ? <Spinner width={180} /> : 'Set Purchase Status'}
            </Button>
          </Flex>
        </div>
        <div>
          <h2>
            Please set the delivery address
          </h2>
          <div className={styles.line}></div>
          <DeliveryAddressForm handleSetDeliveryAddress={handleSetDeliveryAddress} planData={planData} />
        </div>
      </div>

    </>
  )
}

const MemberView = ({ planData }: any) => {

  const delivery = planData?.giftDeliveryChoice === GiftDeliveryChoice.HAND_IN_PERSON ? 'Hand In Person' : 'Ship To Person'

  const purchaseStatus = planData?.purchaseStatus === PurchaseStatus.PURCHASED ? 'purchased' : 'not purchased'

  return (
    <div className={styles.setPlanDataContainer}>
      <div>
        <h2>
          Member's View
        </h2>
        <div className={styles.line}></div>
      </div>
      <div>
        <h2>
          Mode of delivery: {delivery}
        </h2>
      </div>
      <div>
        <h2>
          Address: 1234 Main St, San Francisco, CA 94122
        </h2>
      </div>
      <div>
        <h2>
          Your Plan leader has {purchaseStatus} the gift.
        </h2>
      </div>
      <h3>Please wait patiently for your Plan leader to update these statuses.</h3>
    </div>
  )
}
