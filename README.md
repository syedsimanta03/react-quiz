import {  useReducer } from 'react'

When to use: useReducer = immutable, always return a new type of data as per switch case

1-When components have a lot of state variables and state updates,
  spread across many event handles all over the component

2-When multiple state updates need to happen et the same time

3-When updating one piece of state depends on one or other multipe pieces of state