import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SHIFTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_SHIFTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_SHIFTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_SHIFTS,
        shifts: data.shifts,
      });
      data.shifts.forEach((shift) => {
        idbPromise('shifts', 'put', shift);
      });
    } else if (!loading) {
      idbPromise('shifts', 'get').then((shifts) => {
        dispatch({
          type: UPDATE_SHIFTS,
          shifts: shifts,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.shifts;
    }

    return state.shifts.filter(
      (shift) => shift.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Possible shifts:</h2>
      {state.shifts.length ? (
        <div className="flex-row">
          {filterProducts().map((shift) => (
            <ProductItem
              key={shift._id}
              _id={shift._id}
              name={shift.name}
              shiftDate={shift.shiftDate}
              hours={shift.hours}
              quantity={shift.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any shifts yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
