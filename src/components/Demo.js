import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, minus, asyncAdd } from '@/model/actions/counter';

const Demo = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      <h1>
        demo
      </h1>
      <div>num:{counter.num}</div>
      <div>
        <button type="button" onClick={() => dispatch(add())}> add</button>
        <button type="button" onClick={() => dispatch(minus())}> decrease</button>
        <button type="button" onClick={() => dispatch(asyncAdd())}> async add</button>
      </div>
    </>
  );
};

export default Demo;
