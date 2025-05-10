import React, { useEffect } from 'react'
import { useGetGraphQuery } from './Api/InvestmentGraphAPI'

function InvestmentGraph(props) {
    const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

      const inv = props.investments.filter((i) => {
        const date = new Date(i.date);
        const year = date.getFullYear();
        if(props.year == year)
            return i;
    })
     
    const investmentByMonth = inv.reduce((arr, item) => {
          const date = new Date(item.date);
          const month = date.getMonth();
          const amount = item.amount;
          if (!arr[month]) arr[month] = Number(amount);
          else arr[month] += Number(amount);
          return arr;
        },{});
      let totalAmounts = Array(12).fill(0);
      totalAmounts = totalAmounts.map((item,index) => {
        if(investmentByMonth[index])
          item = investmentByMonth[index]
        return item
      })
      console.log(totalAmounts)
      const chartConfig = {
       type: "bar",
       data: {
         labels: months,
         datasets: [
           {
             label: "My Investment Tracker",
             backgroundColor: "rgb(255, 99, 132)",
             borderColor: "rgb(255, 99, 132)",
             data: totalAmounts,
             fill: false,
           },
           
         ],
       },
       options: {
         type: "bar",
         data: {
           labels: months,
           datasets: [
             {
               label: "My Investment Tracker",
               backgroundColor: "rgb(255, 99, 132)",
               borderColor: "rgb(255, 99, 132)",
               data: totalAmounts,
               fill: false,
             },
             
           ],
         },
         options: {
           responsive: true,
           title: {
             display: true,
             text: "Chart.js Line Chart",
           },
           tooltips: {
             mode: "index",
             intersect: false,
           },
           hover: {
             mode: "nearest",
             intersect: true,
           },
           scales: {
             xAxes: [
               {
                 display: true,
                 scaleLabel: {
                   display: true,
                   labelString: "Month",
                 },
               },
             ],
             yAxes: [
               {
                 display: true,
                 scaleLabel: {
                   display: true,
                   labelString: "Value",
                 },
                 min: 0,
                 max: 100,
                 ticks: {
                   stepSize: 5,
                 },
               },
             ],
           },
         },
       },
     };
     const chartUrl = `https://quickchart.io/chart?width=500&height=300&chart=${encodeURIComponent(
       JSON.stringify(chartConfig)
     )}`;
  return (
    <div>
        <img src={chartUrl} alt="Investment Graph" />
    </div>
  )
}

export default InvestmentGraph