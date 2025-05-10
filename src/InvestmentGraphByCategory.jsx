import React from 'react'

function InvestmentGraphByCategory(props) {
  

     
     
    const investmentByCategory = props.investments.reduce((arr, item) => {
          
          const name = item.investmentName.toUpperCase().trim();
          const amount = item.amount;
          if (!arr[name]) arr[name] = Number(amount);
          else arr[name] += Number(amount);
          return arr;
        },{});
      console.log(investmentByCategory)
      const chartConfig = {
       type: "bar",
       data: {
         labels: Object.keys(investmentByCategory),
         datasets: [
           {
             label: "My Investment Tracker",
             backgroundColor: "rgb(255, 99, 132)",
             borderColor: "rgb(255, 99, 132)",
             data: Object.values(investmentByCategory),
             fill: false,
           },
           
         ],
       },
       options: {
         type: "bar",
         data: {
           labels: Object.keys(investmentByCategory),
           datasets: [
             {
               label: "My Investment Tracker",
               backgroundColor: "rgb(255, 99, 132)",
               borderColor: "rgb(255, 99, 132)",
               data: Object.values(investmentByCategory),
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

export default InvestmentGraphByCategory