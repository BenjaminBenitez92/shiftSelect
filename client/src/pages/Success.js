import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_SCHEDULE } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addSchedule] = useMutation(ADD_SCHEDULE);

  useEffect(() => {
    async function saveSchedule() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addSchedule({ variables: { products } });
        const productData = data.addSchedule.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveSchedule();
  }, [addSchedule]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
