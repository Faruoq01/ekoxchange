import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ----------------------
// Types
// ----------------------
export interface DateRange {
  startDate: string; // format: YYYY-MM-DD
  endDate: string;
}

export interface CardStats {
  tradeVolume: number;
  cryptoFlow: number;
  userCounts: number;
  giftcardTransactions: number;
}

export interface StatEntry {
  date?: string;
  dayCount?: number;
  userCount?: number;
  transactionCount?: number;
  [key: string]: any;
}

export interface AnalyticsState {
  dateRange: DateRange;
  cardStats: CardStats;
  dailyStats: {
    user: StatEntry[];
    transactions: StatEntry[];
  };
  weeklyStats: {
    user: StatEntry[];
    transactions: StatEntry[];
  };
  monthlyStats: {
    user: StatEntry[];
    transactions: StatEntry[];
  };
}

// ----------------------
// Initial State
// ----------------------
const initialState: AnalyticsState = {
  dateRange: {
    startDate: "",
    endDate: "",
  },
  cardStats: {
    tradeVolume: 0,
    cryptoFlow: 0,
    userCounts: 0,
    giftcardTransactions: 0,
  },
  dailyStats: {
    user: [],
    transactions: [],
  },
  weeklyStats: {
    user: [],
    transactions: [],
  },
  monthlyStats: {
    user: [],
    transactions: [],
  },
};

// ----------------------
// Slice
// ----------------------
const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    setCardStats: (state, action: PayloadAction<CardStats>) => {
      state.cardStats = action.payload;
    },
    setDailyStats: (
      state,
      action: PayloadAction<{
        user: StatEntry[];
        transactions: StatEntry[];
      }>
    ) => {
      state.dailyStats = action.payload;
    },
    setWeeklyStats: (
      state,
      action: PayloadAction<{
        user: StatEntry[];
        transactions: StatEntry[];
      }>
    ) => {
      state.weeklyStats = action.payload;
    },
    setMonthlyStats: (
      state,
      action: PayloadAction<{
        user: StatEntry[];
        transactions: StatEntry[];
      }>
    ) => {
      state.monthlyStats = action.payload;
    },
  },
});

// ----------------------
// Exports
// ----------------------
export const {
  setCardStats,
  setDailyStats,
  setWeeklyStats,
  setMonthlyStats,
  setDateRange,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
