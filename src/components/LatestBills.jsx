import React, { useEffect, useState } from "react";
import useAxios from "../hook/useAxios";
import BillCard from "./BillCard";

const LatestBills = () => {
  const instance = useAxios();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get("/bills/latest6"); // fetch latest 6 bills
        setBills(data);
      } catch (error) {
        console.error("Error fetching latest bills:", error);
      }
    };
    fetchData();
  }, [instance]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        Our Utility Categories
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bills.map((bill) => (
          <BillCard key={bill._id} bill={bill} />
        ))}
      </div>
    </div>
  );
};

export default LatestBills;
