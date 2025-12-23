"use client";
import { useState, useRef, useEffect } from "react";
import TicketList from "./_comp/tickets";
import TicketChat from "./_comp/chats";

const Support = () => {
  const [activeTicket, setActiveTicket] = useState<string | null>("#TRX-9921");

  return (
    <main className="flex-1 flex h-[87vh] overflow-hidden">
      <TicketList
        activeTicket={activeTicket}
        setActiveTicket={setActiveTicket}
      />
      <TicketChat activeTicket={activeTicket} />
    </main>
  );
};

export default Support;
