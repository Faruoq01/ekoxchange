import { createSlice } from "@reduxjs/toolkit";

type TicketStatus = "open" | "closed";
interface Ticket {
  _id: string;
  displayId: string;
  title: string;
  subtitle: string;
  status: TicketStatus;
  fullname: string;
  userId: string | undefined;
  avatar: null | string | undefined;
  time: string;
  ticketId: string;
}

interface IUser {
  _id: string | undefined;
  firstname: string;
  lastname: string;
  avatar: null | string;
}

interface ChatMessageType {
  id: string;
  from: string;
  to?: string;
  text: string;
  supportTicket: string | null;
  createdBy: IUser;
  createdAt: number;
  updatedAt: number;
}

interface ISupport {
  online: string[];
  loading: boolean;
  singleTicket: Ticket;
  messages: ChatMessageType[];
}

const initialState: ISupport = {
  online: [],
  loading: false,
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
    userId: undefined,
  },
  messages: [],
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
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setMessageLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setOnlineUsers,
  setSelectedTicket,
  setMessages,
  setMessageLoading,
} = supportReducer.actions;
export default supportReducer.reducer;
