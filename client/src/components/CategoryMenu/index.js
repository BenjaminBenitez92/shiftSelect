import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_HOSPITALS,
  UPDATE_CURRENT_HOSPITAL,
} from '../../utils/actions';
import { QUERY_HOSPITALS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { hospitals } = state;

  const { loading, data: hospitalData } = useQuery(QUERY_HOSPITALS);

  useEffect(() => {
    if (hospitalData) {
      dispatch({
        type: UPDATE_HOSPITALS,
        hospitals: hospitalData.hospitals,
      });
      hospitalData.hospitals.forEach((hospital) => {
        idbPromise('hospitals', 'put', hospital);
      });
    } else if (!loading) {
      idbPromise('hospitals', 'get').then((hospitals) => {
        dispatch({
          type: UPDATE_HOSPITALS,
          hospitals: hospitals,
        });
      });
    }
  }, [hospitalData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_HOSPITAL,
      currentHospital: id,
    });
  };

  return (
    <div>
      <h2>Choose a Hospital:</h2>
      {hospitals.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
