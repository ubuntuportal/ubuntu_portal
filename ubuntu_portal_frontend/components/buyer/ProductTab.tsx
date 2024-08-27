import React, { ReactNode, useState } from "react";
import {
  FaAward,
  FaCreditCard,
  FaHandshake,
  FaHeadphonesAlt,
} from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

interface TabButtonProps {
  index: number;
  activeTab: number;
  setActiveTab: (index: number) => void;
  children: ReactNode;
}
export default function ProductTab() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="border mb-10">
      <div className="flex gap-6 justify-center my-6 border-b-2">
        <TabButton index={0} activeTab={activeTab} setActiveTab={setActiveTab}>
          Additional information
        </TabButton>
        <TabButton index={1} activeTab={activeTab} setActiveTab={setActiveTab}>
          Specification
        </TabButton>
        <TabButton index={2} activeTab={activeTab} setActiveTab={setActiveTab}>
          Review
        </TabButton>
      </div>

      <div className=" inspiration-content">
        {activeTab === 0 && <AdditionalTab />}
        {/* {activeTab === 1 && <DestinationOutdoorAdventure />}
        {activeTab === 2 && <MountainCabins />}
        {activeTab === 3 && <BeachDestinations />}
        {activeTab === 4 && <PopularDestinations />}
        {activeTab === 5 && <UniqueStays />} */}
      </div>
    </div>
  );
}

function TabButton({
  index,
  activeTab,
  setActiveTab,
  children,
}: TabButtonProps) {
  return (
    <div>
      <div
        // href="#"
        className={`text-lg my-4 cursor-pointer  ${
          activeTab === index ? "border-b-2 border-[#2DB224] " : ""
        }`}
        onClick={() => setActiveTab(index)}
      >
        {children}
      </div>
    </div>
  );
}

function AdditionalTab() {
  return (
    <div className="flex gap-3 justify-center px-8 pb-9">
      <div className="basis-1/2">
        <h1 className="font-bold mb-2">Description</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sed
          tenetur aliquid earum, eligendi labore illo architecto? Fugiat
          explicabo alias beatae quas, laborum perferendis! Ab, placeat! Soluta
          iusto mollitia labore?
        </p>
      </div>
      <div className="flex-1">
        <h1 className="font-bold mb-2">Features</h1>
        <div className="text-sm flex flex-col gap-3 ">
          <p>
            <FaAward className="text-2xl mr-2 inline-block text-[#2DB224]" />{" "}
            Free 1 Year Warranty
          </p>

          <p>
            <FaTruckFast className="text-2xl mr-3 inline-block text-[#2DB224]" />
            Free Shipping & Fastest Delivery
          </p>

          <p>
            <FaHandshake className="text-2xl mr-3 inline-block  text-[#2DB224]" />
            100% Money-back Guarantee
          </p>

          <p>
            <FaHeadphonesAlt className="text-2xl mr-3 inline-block text-[#2DB224]" />
            24/7 Customer Support
          </p>

          <p>
            <FaCreditCard className="text-2xl mr-3 inline-block text-[#2DB224]" />
            Secure Payment Method
          </p>
        </div>
      </div>
      <div className="flex-1 mb-2">
        <h1 className="font-bold mb-2">Shipping Information</h1>
        <div className="text-sm flex flex-col gap-3">
          <p>
            <span className="font-bold">Courier:</span> 2-4 days, free shipping{" "}
          </p>

          <p>
            <span className="font-bold">Local Shipping:</span>Up to one week,
            $19.00
          </p>

          <p>
            <span className="font-bold">UPS Ground Shipping:</span>4-6 days,
            $29.00
          </p>

          <p>
            <span className="font-bold">Unishop Global Shipping:</span>3-4 days,
            $39.00
          </p>
        </div>
      </div>
    </div>
  );
}
