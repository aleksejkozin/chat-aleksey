import React, {useState} from 'react';

export const useStateWithMerge = (initialState: any) => {
  const [state, setState] = useState(initialState);
  return [
    state,
    setState,
    (x: object) => setState((old: any) => ({...old, ...x})),
  ];
};
