import React from "react";
import { mockCompanyDetails } from "../Constants/mock.js"; 
import Header from "./Header.js";
import Details from "./Details.js";
import Overview from "./Overview.js";
import Chart from "./Chart.js";

const Dashboard = () => {
// overall dashboard layout 
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand bg-neutral-150">
      <div className="col-span-1 md:col-span-2 xl:col-span-1 row-span-1 flex justify-start items-center">
        {/* here there is position details of main company which is creating issues */}
      </div>
      <Header name={mockCompanyDetails.name} />
      <div className="md:col-span-2 row-span-4">
        <Chart/>
        <card>Chart</card>
      </div>
      <div>
        <Overview 
        symbol={mockCompanyDetails.ticker} 
        price={300}
        change={30}
        changePercent={10.0}
        currency="USD"/>
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={mockCompanyDetails}/>
      </div>
    </div>
  );
};



export default Dashboard;
