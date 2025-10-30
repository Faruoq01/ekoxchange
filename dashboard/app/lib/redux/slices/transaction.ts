import { createSlice } from "@reduxjs/toolkit";
import { BuyOrder, SellOrder, Transaction } from "../interfaces/transaction";

interface TransactionType {
  buyOrders: BuyOrder[] | [];
  sellOrders: SellOrder[] | [];
  send: Transaction[] | [];
  singleBuyOrder: BuyOrder | {};
  singleSellOrder: SellOrder | {};
}

const initialState: TransactionType = {
  buyOrders: [],
  sellOrders: [],
  send: [],
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
    setSendTransaction: (state, action) => {
      state.send = action.payload;
    },
  },
});

export const {
  setBuyOrder,
  setSingleBuyOrder,
  setSellOrder,
  setSingleSellOrder,
  setSendTransaction,
} = transactionReducer.actions;
export default transactionReducer.reducer;
