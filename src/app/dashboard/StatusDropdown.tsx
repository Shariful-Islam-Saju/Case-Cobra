import { OrderStatus } from "@prisma/client";
import React from "react";

const StatusDropdown = ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) => {
  const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    awaiting_shipment: "Awaiting Shipment",
    fulfilled: "Fulfilled",
    shipped: "Shipped",
  };
  return <div>{LABEL_MAP.fulfilled}</div>;
};

export default StatusDropdown;
