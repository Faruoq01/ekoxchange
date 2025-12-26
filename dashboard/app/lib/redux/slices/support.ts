import { createSlice } from "@reduxjs/toolkit";

type TicketStatus = "open" | "closed";
interface Ticket {
  _id: string;
  displayId: string;
  title: string;
  subtitle: string;
  status: TicketStatus;
  fullname: string;
  avatar: null | string | undefined;
  time: string;
  ticketId: string;
}

interface ISupport {
  online: string[];
  singleTicket: Ticket;
}

const initialState: ISupport = {
  online: [],
  singleTicket: {
    _id: "-",
    displayId: "-",
    title: "-",
    subtitle: "-",
    status: "open",
    fullname: "-",
    avatar: undefined,
    time: "-",
    ticketId: "-",
  },
};

const supportReducer = createSlice({
  name: "support",
  initialState: initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.online = action.payload;
    },
    setSelectedTicket: (state, action) => {
      state.singleTicket = action.payload;
    },
  },
});

export const { setOnlineUsers, setSelectedTicket } = supportReducer.actions;
export default supportReducer.reducer;
