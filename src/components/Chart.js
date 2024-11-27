// import React,{useState} from "react";
// import { mockHistoricalData } from "../Constants/mock";
// import {
//     Area,
//     XAxis,
//     YAxis,
//     ResponsiveContainer,
//     AreaChart,
//     Tooltip,
//   } from "recharts";
// import {convertUnixTimestampToDate} from "../helpers/date-helper"

// const Chart=()=>{
//     const [data, setData] = useState(mockHistoricalData);
//     const [filter, setFilter] = useState("1W");

// const formatData=()=>{
//     return data.c.map((item,index)=>{
//         return{
//             value: item.toFixed(2),
//             date: convertUnixTimestampToDate(data.t[index]),
//         }
//     })

// }
//   return (
//     <card>
//         <ResponsiveContainer>
//             <AreaChart data={formatData(data)}>
//             <defs>
//             <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor="rgb(170 200 245)" stopOpacity={0.8}/>
//             <stop offset="95%" stopColor="rgb(170 200 245)" stopOpacity={0}/>
//             </linearGradient>
//             </defs>       
//             <Area 
//             type="monotone"
//             datakey="value"
//             stroke="#312e81"
//             fillOpacity={1}
//             strokeWidth={0.5}
//             fill="url(#chartColor)"/>
//             <Tooltip/>
//             <XAxis datakey={"date"}/>
//             <YAxis domain={["dataMin", "dataMax"]} />
//             </AreaChart>
//         </ResponsiveContainer>
//     </card>
//   )
// }

// export default Chart;

// import React, { useState, useContext, useEffect,} from "react";
// import {
//   Area,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   AreaChart,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import { convertUnixTimestampToDate,convertDateToUnixTimestamp,createDate } from "../helpers/date-helper";
// import ChartFilter from "./ChartFilter";
// import Card from "./card";
// import { chartConfig } from "../Constants/config";
// import ThemeContext from "../context/ThemeContext";
// import { fetchHistoricalData } from "../api/stock-api";
// import StockContext from "../context/StockContext";

// const Chart = () => {
//   const [data, setData] = useState([]);
//   const [filter, setFilter] = useState("1W");
//   const { darkMode } = useContext(ThemeContext);
//   const {stockSymbol} = useContext(StockContext);

//   useEffect(() => {
//     const getDateRange = () => {
//       const {days, weeks, months, years}= chartConfig[filter];
      
//       const endDate = new Date();
//       const startDate = createDate(endDate, -days, -weeks, -months, -years);
//       const startTimestampUnix = convertDateToUnixTimestamp(startDate);
//       const endTimestampUnix = convertDateToUnixTimestamp(endDate);

//       return {startTimestampUnix,endTimestampUnix};
//     };
//     const updateChartData= async () => {
//       try{
//         const {startTimestampUnix,endTimestampUnix} = getDateRange();
//         const resolution = chartConfig[filter].resolution;
//         const result = await fetchHistoricalData(
//           stockSymbol,
//           resolution,
//           startTimestampUnix,
//           endTimestampUnix
//         );
//         setData(formatData(result));
//       }
//       catch(error){
//         setData([]);
//         console.log(error)
//       }
//     };
    
//     updateChartData();
//   },[stockSymbol, filter] )
//   const formatData = (data) => {
//     return data.c.map((item, index) => ({
//       value: parseFloat(item.toFixed(2)),
//       date: convertUnixTimestampToDate(data.t[index]),
//     }));
//   };

//   return (
//     <div style={{ height: "550px", marginTop: "20px", position: "relative" }}>
//       <div style={{ position: "absolute", top: "-10px", right: "20px", zIndex: 40 }}>
//         <ul className="flex space-x-2">
//           {Object.keys(chartConfig).map((item) => (
//             <li key={item}>
//               <ChartFilter
//                 text={item}
//                 active={filter === item}
//                 onClick={() => setFilter(item)}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart data={data}>
//           <defs>
//             <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor={darkMode ? "#312e81":"rgb(170 200 245)"} stopOpacity={0.8} />
//               <stop offset="95%" stopColor={darkMode ? "#312e81":"rgb(170 200 245)"} stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#312e81"
//             fillOpacity={1}
//             strokeWidth={0.5}
//             fill="url(#chartColor)"
//           />
//           <Tooltip 
//           contentStyle={darkMode ? { backgroundColor: "#111827" } : null }
//           itemStyle={darkMode ? { color: "#818cf8" } : null}/>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis 
//             dataKey="date" 
//             padding={{ bottom: 10 }} // Adds gap between X-axis and labels
//             tick={{ fontSize: 12 }} // Keeps the font size readable
//           />
//           <YAxis
//             domain={[200, 230]} // Custom domain for bell curve
//             tickFormatter={(value) => `${value}`} // Formatting ticks
//             tick={{ fontSize: 12 }} // Set tick font size
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Chart;


// import React, { useContext, useEffect, useState } from "react";
// import ChartFilter from "./ChartFilter";
// import Card from "./card";
// import {
//   Area,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   AreaChart,
//   Tooltip,
// } from "recharts";
// import ThemeContext from "../context/ThemeContext";
// import StockContext from "../context/StockContext";
// import { fetchHistoricalData } from "../api/stock-api";
// import {
//   createDate,
//   convertDateToUnixTimestamp,
//   convertUnixTimestampToDate,
// } from "../helpers/date-helper";
// import { chartConfig } from "../Constants/config";

// const Chart = () => {
//   const [filter, setFilter] = useState("1W");

//   const { darkMode } = useContext(ThemeContext);

//   const { stockSymbol } = useContext(StockContext);

//   const [data, setData] = useState([]);

//   const formatData = (data) => {
//     return data.c.map((item, index) => {
//       return {
//         value: item.toFixed(2),
//         date: convertUnixTimestampToDate(data.t[index]),
//       };
//     });
//   };

//   useEffect(() => {
//     const getDateRange = () => {
//       const { days, weeks, months, years } = chartConfig[filter];

//       const endDate = new Date();
//       const startDate = createDate(endDate, -days, -weeks, -months, -years);

//       const startTimestampUnix = convertDateToUnixTimestamp(startDate);
//       const endTimestampUnix = convertDateToUnixTimestamp(endDate);
//       return { startTimestampUnix, endTimestampUnix };
//     };

//     const updateChartData = async () => {
//       try {
//         const { startTimestampUnix, endTimestampUnix } = getDateRange();
//         const resolution = chartConfig[filter].resolution;
//         const result = await fetchHistoricalData(
//           stockSymbol,
//           resolution,
//           startTimestampUnix,
//           endTimestampUnix
//         );
//         setData(formatData(result));
//       } catch (error) {
//         setData([]);
//         console.log(error);
//       }
//     };

//     updateChartData();
//   }, [stockSymbol, filter]);

//   return (
//     <Card>
//       <ul className="flex absolute top-2 right-2 z-40">
//         {Object.keys(chartConfig).map((item) => (
//           <li key={item}>
//             <ChartFilter
//               text={item}
//               active={filter === item}
//               onClick={() => {
//                 setFilter(item);
//               }}
//             />
//           </li>
//         ))}
//       </ul>
//       <ResponsiveContainer>
//         <AreaChart data={data}>
//           <defs>
//             <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
//               <stop
//                 offset="5%"
//                 stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
//                 stopOpacity={0.8}
//               />
//               <stop
//                 offset="95%"
//                 stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
//                 stopOpacity={0}
//               />
//             </linearGradient>
//           </defs>
//           <Tooltip
//             contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
//             itemStyle={darkMode ? { color: "#818cf8" } : null}
//           />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#312e81"
//             fill="url(#chartColor)"
//             fillOpacity={1}
//             strokeWidth={0.5}
//           />
//           <XAxis dataKey="date" />
//           <YAxis domain={["dataMin", "dataMax"]} />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };

// export default Chart;


import React, { useContext, useEffect, useState } from "react";
import ChartFilter from "./ChartFilter";
import Card from "./card";
import { fetchHistoricalData } from "../api/stock-api";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from "../helpers/date-helper";
import {chartConfig} from "../Constants/config"

const Chart = () => {
  const [filter, setFilter] = useState("1W");

  const { darkMode } = useContext(ThemeContext);

  const { stockSymbol } = useContext(StockContext);

  const [data, setData] = useState([]);

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];

      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);

      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;