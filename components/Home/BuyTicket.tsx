"use client";
import React, { useEffect, useState } from "react";
import SectionLayout from "../layout/SectionLayout";
import BuyTicketSideTracker from "./BuyTicketSideTracker";
import BuyTicketCards from "./BuyTicketCards";
import BuyTicketSummery from "./BuyTicketSummery";
import BuyTicketDetails from "./BuyTicketDetails";
import { Button } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import { Order, Ticket } from "@/types/types";
import axiosInstance from "@/lib/Axios";
import Loader from "../Shared/Loader";

export default function BuyTicket() {
  const [tab, setTab] = useState(1);
  const [tickets, setTickets] = useState<Ticket[]>();
  const [selectedTickets, setSelectedTickets] = useState<Ticket>();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [orderDetails, setOrderDetails] = useState<Order>();
  const [total, setTotal] = useState<number>();

  const handleBack = () => {
    if (tab > 1) {
      setTab(tab - 1);
    } else {
      setTab(tab);
    }
  };

  useEffect(() => {
    // const subTotal = ticket
    // setTotal
  }, [ticketQuantity]);

  useEffect(() => {
    const getTicket = async () => {
      await axiosInstance
        .get("/tickets")
        .then((res) => setTickets(res.data.data))
        .catch((err) => console.log(err));
    };
    getTicket();
  }, []);
  // console.log("tickets", tickets);

  return (
    <div id="buy-ticket">
      <SectionLayout
        paddingBottom
        title={"Buy Tickets"}
        className="bg-gray-200"
      >
        {!tickets ? (
          <>
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          </>
        ) : (
          <div className="md:w-layout  mx-auto md:p-16 p-2 pt-8 rounded-lg bg-white flex flex-col gap-3">
            <div className="">
              <Button
                variant="text"
                className="hover:bg-transparent"
                onClick={handleBack}
              >
                <IoIosArrowBack
                  size={25}
                  className="text-accent font-bold mr-2"
                />

                <span className="text-xl text-accent capitalize font-normal">
                  Back
                </span>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="col-span-1 md:col-span-8 border-gray-400 border-2 rounded-lg grid grid-cols-1 md:grid-cols-12 ">
                <div className="md:col-span-3 ">
                  <BuyTicketSideTracker tab={tab} />
                </div>
                <div className="col-span-9 p-4 max-h-[524px] overflow-y-scroll">
                  {tab === 2 ? (
                    <BuyTicketDetails
                      selectedTickets={selectedTickets}
                      setOrderDetails={setOrderDetails}
                    />
                  ) : (
                    <BuyTicketCards
                      tickets={tickets}
                      setSelectedTickets={setSelectedTickets}
                      selectedTickets={selectedTickets}
                      setTicketQuantity={setTicketQuantity}
                      ticketQuantity={ticketQuantity}
                    />
                  )}
                </div>
              </div>
              <div className="col-span-1 md:col-span-4 border-gray-200 border-2 rounded-lg">
                <BuyTicketSummery
                  setTab={setTab}
                  tab={tab}
                  selectedTickets={selectedTickets}
                  ticketQuantity={ticketQuantity}
                />
              </div>
            </div>
          </div>
        )}
      </SectionLayout>
    </div>
  );
}
