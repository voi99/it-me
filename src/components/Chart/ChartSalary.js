import React from 'react'
import ReactApexChart from 'react-apexcharts'

const ChartSalary = ({ data, title, avgSalary }) => {
   const chartData = {
      series: data,

      options: {
         legend: {
            show: false,
         },
         chart: {
            height: 350,
            type: 'donut',
            fontFamily: 'Poppins, sans-serif',
         },
         labels: data,
         title: {
            text: title,
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
               fontWeight: 'bold',
               fontFamily: 'Poppins, sans-serif',
               color: '#e0e0e0',
            },
         },
         plotOptions: {
            pie: {
               donut: {
                  labels: {
                     show: true,
                     total: {
                        show: true,
                        showAlways: true,
                        label: avgSalary.title,
                        fontSize: '12px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        color: '#e0e0e0',
                        formatter: function () {
                           return `${avgSalary.value}€`
                        },
                     },
                  },
               },
            },
         },
         theme: {
            palette: 'palette3',
         },
         dataLabels: {
            formatter: function (value, { seriesIndex, w }) {
               return `${w.config.series[seriesIndex]}€`
            },
            textAnchor: 'middle',
         },
      },
   }
   return (
      <ReactApexChart
         options={chartData.options}
         series={chartData.series}
         type='donut'
         labels={chartData.labels}
      />
   )
}

export default ChartSalary
