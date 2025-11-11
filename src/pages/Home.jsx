import React from "react";
import Baner from "../components/Baner";
import CategoryCards from "../components/CategoryCards";
import LatestBills from "../components/LatestBills";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Baner></Baner>
      <main>
              <CategoryCards></CategoryCards>
              <LatestBills></LatestBills>
      </main>
    </div>
  );
};

export default Home;
