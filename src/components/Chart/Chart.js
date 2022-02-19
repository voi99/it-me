import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Chart = ({ data, by }) => {
   const chartData = {
      series: [...data.map((year) => year.attributes[by])],

      options: {
         dataLabels: { enabled: false },
         labels: [...data.map((year) => year.attributes.year)],
         theme: {
            palette: 'palette3',
         },
         responsive: [
            {
               breakpoint: 768,
               options: {
                  chart: {
                     width: '100%',
                  },
                  legend: {
                     position: 'bottom',
                  },
               },
            },
         ],
      },
   }
   return (
      <ReactApexChart
         options={chartData.options}
         series={chartData.series}
         type='pie'
         labels={chartData.labels}
      />
   )
}

export default Chart
