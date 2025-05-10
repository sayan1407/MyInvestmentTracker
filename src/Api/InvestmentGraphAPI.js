import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 const chartConfig = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [62, 12, 51, 24, 68, 74, 41],
        fill: false,
      },
      {
        label: 'My Second dataset',
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: [50, 35, 82, 77, 5, 30, 45],
      },
    ],
  },
  options:{
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [62, 12, 51, 24, 68, 74, 41],
        fill: false,
      },
      {
        label: 'My Second dataset',
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: [50, 35, 82, 77, 5, 30, 45],
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
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
}
,
};
export const investmentGraphAPI = createApi({
  reducerPath: "apiInvestmentGraph",
  baseQuery: fetchBaseQuery({ baseUrl: "https://quickchart.io/" }),
  endpoints: (builder) => ({
    //QUERY -> GET
    //MUTATION -> POST/PUT/DELETE
   
    getGraph: builder.query({
      query: () => ({
        url : "chart",
        method : "GET",
        params : {
            width : 500,
            height : 300,
            chart : JSON.stringify(chartConfig)

        }
      }),
      //transformResponse : (res) => res.sort((a,b) => b.id - a.id),
    }),
    
  }),
});
export const { useGetGraphQuery
 } = investmentGraphAPI;