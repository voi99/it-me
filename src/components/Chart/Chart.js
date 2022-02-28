import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Chart = ({ data, by, sign }) => {
   const chartData = {
      series: [...data.map((year) => year.attributes[by])],

      options: {
         chart: {
            fontFamily: 'Poppins, sans-serif',
         },
         labels: [...data.map((year) => year.attributes.year)],
         theme: {
            palette: 'palette3',
         },
         dataLabels: {
            formatter: function (value, { seriesIndex, w }) {
               return `${w.config.series[seriesIndex].toLocaleString(
                  'en-US'
               )}${sign}`
            },
            textAnchor: 'middle',
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
