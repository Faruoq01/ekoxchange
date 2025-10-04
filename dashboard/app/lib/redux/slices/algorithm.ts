import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  routes: [],
  states: [],
  reload: false,
  selectedStatePolygon: "",
  selectedRoutes: "",
  cabVariables: [],
  truckVariables: [],
  tricycleVariables: [],
  stateVariable: "All States",
  tripType: "All Filters",
  singleCabVariable: {},
  singleTruckVariable: {},
  singleTricycleVariable: {},
  cabPrice: {
    Comfort: "",
    discountApplies: "",
    driversCommission: "",
    lodaCommissionValue: "",
    tripPriceBeforeDiscount: "",
  },
  truckPrice: {
    miniTruck: "",
    discountApplies: "",
    driversCommission: "",
    lodaCommissionValue: "",
    tripPriceBeforeDiscount: "",
  },
  tricyclePrice: {
    oneSeater: "",
    discountApplies: "",
    driversCommission: "",
    lodaCommissionValue: "",
    tripPriceBeforeDiscount: "",
  },
  cabTypeName: "",
  truckCategoryList: [],
  truckTypeName: "",
  tricycleTypeName: "",
};

const algorithmReducer = createSlice({
  name: "algorithm",
  initialState: initialState,
  reducers: {
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
    setSelectedStatePolygon: (state, action) => {
      state.selectedStatePolygon = action.payload;
    },
    setSelectedRoutes: (state, action) => {
      state.selectedRoutes = action.payload;
    },
    setCabVariables: (state, action) => {
      state.cabVariables = action.payload;
    },
    setTruckVariables: (state, action) => {
      state.truckVariables = action.payload;
    },
    setTricycleVariables: (state, action) => {
      state.tricycleVariables = action.payload;
    },
    setStateVariable: (state, action) => {
      state.stateVariable = action.payload;
    },
    setSelectedFilter: (state, action) => {
      state.tripType = action.payload;
    },
    setSingleCabVariable: (state, action) => {
      state.singleCabVariable = action.payload;
    },
    setSingleTruckVariable: (state, action) => {
      state.singleTruckVariable = action.payload;
    },
    setSingleTricycleVariable: (state, action) => {
      state.singleTricycleVariable = action.payload;
    },
    setCabPrice: (state, action) => {
      state.cabPrice = action.payload;
    },
    setTricyclePrice: (state, action) => {
      state.tricyclePrice = action.payload;
    },
    setTruckPrice: (state, action) => {
      state.truckPrice = action.payload;
    },
    setCabTypeName: (state, action) => {
      state.cabTypeName = action.payload;
    },
    setTruckTypeName: (state, action) => {
      state.truckTypeName = action.payload;
    },
    setTricycleTypeName: (state, action) => {
      state.tricycleTypeName = action.payload;
    },
    setTruckCategoryList: (state, action) => {
      state.truckCategoryList = action.payload;
    },
  },
});

export const {
  setRoutes,
  setStates,
  setReload,
  setSelectedStatePolygon,
  setSelectedRoutes,
  setCabVariables,
  setTruckVariables,
  setTricycleVariables,
  setStateVariable,
  setSingleCabVariable,
  setSingleTruckVariable,
  setSingleTricycleVariable,
  setCabPrice,
  setSelectedFilter,
  setTruckPrice,
  setTricyclePrice,
  setCabTypeName,
  setTruckTypeName,
  setTricycleTypeName,
  setTruckCategoryList,
} = algorithmReducer.actions;
export default algorithmReducer.reducer;
