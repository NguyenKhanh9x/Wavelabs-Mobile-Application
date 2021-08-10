import { combineReducers } from '@reduxjs/toolkit';

import ServicesReducer from './services.reducer';
import MobileInfoReducer from './mobile.reducer';

const appReducer = combineReducers({
  services: ServicesReducer,
  mobileInfo: MobileInfoReducer,
});

export default appReducer;
