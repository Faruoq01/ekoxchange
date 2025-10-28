import { createSlice } from "@reduxjs/toolkit";
import { BuyOrder, SellOrder } from "../interfaces/transaction";

interface TransactionType {
  buyOrders: BuyOrder[] | [];
  sellOrders: SellOrder[] | [];
  singleBuyOrder: BuyOrder | {};
  singleSellOrder: SellOrder | {};
}

const initialState: TransactionType = {
  buyOrders: [],
  sellOrders: [],
  singleBuyOrder: {},
  singleSellOrder: {},
};

const transactionReducer = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {
    setBuyOrder: (state, action) => {
      state.buyOrders = action.payload;
    },
    setSingleBuyOrder: (state, action) => {
      state.singleBuyOrder = action.payload;
    },
    setSellOrder: (state, action) => {
      state.sellOrders = action.payload;
    },
    setSingleSellOrder: (state, action) => {
      state.singleSellOrder = action.payload;
    },
  },
});

export const {
  setBuyOrder,
  setSingleBuyOrder,
  setSellOrder,
  setSingleSellOrder,
} = transactionReducer.actions;
export default transactionReducer.reducer;
