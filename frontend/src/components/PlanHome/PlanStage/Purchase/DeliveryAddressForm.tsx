import * as React from 'react';
import { Button, Box, FormControl, FormLabel, Input, Flex, useToast, Spinner } from '@chakra-ui/react';
// import { useEffect } from 'react';

const DeliveryAddressForm = ({ handleSetDeliveryAddress, planData }: any) => {
  const [showForm, setShowForm] = React.useState(false);
  const [street, setStreet] = React.useState('');
  const [state, setState] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  // const [deliveryAddress, setDeliveryAddress] = React.useState(planData?.giftDeliveryAddress)
  const toast = useToast();

  const handleSetAddress = async () => {
    setIsLoading(true);
    // Here you can handle the delivery address data. Currently it just logs the form values.
    await handleSetDeliveryAddress(street + ' ' + city + ', ' + state + ' ' + zipCode + ' ' + country)

    console.log(street, state, zipCode, country);
    toast({
      title: 'Delivery Address Set',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom'
    });
    setIsLoading(false);
  };

  if (!showForm) {
    return (
      <div>
        {planData !== undefined
          ? <p style={{ marginBottom: 15, color: 'var(--light-yellow)', fontSize: 20 }}>Current Address: {planData?.giftDeliveryAddress}</p>
          : null
        }
        <Button
          onClick={() => { setShowForm(true); }}
          background={'var(--green)'}
          width={180}
          height={50}
          _hover={{ background: 'var(--green)' }}
          color={'var(--white)'}>Set Delivery Address</Button>
      </div>
    )
  }

  return (
    <Box p="4" borderWidth="1px" borderRadius="lg" backgroundColor={'white'}>
      <FormControl id="street" isRequired>
        <FormLabel>Street</FormLabel>
        <Input type="text" value={street} onChange={(e) => { setStreet(e.target.value); }} />
      </FormControl>
      <FormControl id="city" isRequired mt="2">
        <FormLabel>City</FormLabel>
        <Input type="text" value={city} onChange={(e) => { setCity(e.target.value); }} />
      </FormControl>
      <FormControl id="state" isRequired mt="2">
        <FormLabel>State</FormLabel>
        <Input type="text" value={state} onChange={(e) => { setState(e.target.value); }} />
      </FormControl>
      <FormControl id="zip" isRequired mt="2">
        <FormLabel>Zip Code</FormLabel>
        <Input type="text" value={zipCode} onChange={(e) => { setZipCode(e.target.value); }} />
      </FormControl>
      <FormControl id="country" isRequired mt="2">
        <FormLabel>Country</FormLabel>
        <Input type="text" value={country} onChange={(e) => { setCountry(e.target.value); }} />
      </FormControl>
      <Flex justify="space-between" mt="4">
        <Button variant="outline" onClick={() => { setShowForm(false); }}>Cancel</Button>
        <Button
          background={'var(--green)'}
          color={'var(--white)'}
          onClick={handleSetAddress}
          isLoading={isLoading}
          _hover={{ background: 'var(--green)' }}
          width={160}>
          {isLoading ? <Spinner width={160} /> : 'Set Delivery Address'}
        </Button>
      </Flex>
    </Box>
  );
};

export default DeliveryAddressForm;
