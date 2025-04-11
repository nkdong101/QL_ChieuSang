<template>
  <bar-chart
    class="chart"
    v-if="loaded && type == 'bar' && chartData"
    :chartOptions="chartOptions"
    :chartData="chartData"
  />
  <line-chart
    class="chart"
    v-else-if="loaded && type == 'line' && chartData"
    :chartOptions="chartOptions"
    :chartData="chartData"
  />
  <pie-chart
    class="chart"
    v-else-if="loaded && type == 'pie' && chartData"
    :chartOptions="chartOptions"
    :chartData="chartData"
  />
</template>

<script>
import Chart from "chart.js/auto";
import { fontString } from "chart.js/helpers";

import ConvertStr from "~/assets/scripts/ConvertStr";
function barAnimationComplete() {
  var chartInstance = this,
    ctx = chartInstance.ctx;

  ctx.font = fontString(
    Chart.defaults.font.size,
    Chart.defaults.font.style,
    Chart.defaults.font.family
  );
  ctx.textAlign = "center";
  ctx.textBaseline = "center";
  ctx.fillStyle = "#000000";
  this.data.datasets.forEach(function (dataset, i) {
    var meta = chartInstance.getDatasetMeta(i);
    meta.data.forEach(function (bar, index) {
      var data = ConvertStr.ToMoneyStr(dataset.data[index]);
      ctx.fillText(data, bar.x, bar.y - 10);
    });
  });
}

// function colorize(opaque, hover, ctx) {
//   const v = ctx.parsed;
//   const c =
//     v < -15 ? "#D60000" : v < 0 ? "#F46300" : v < 15 ? "#0358B6" : "#44DE28";

//   // const opacity = hover ? 1 - Math.abs(v / 150) - 0.2 : 1 - Math.abs(v / 150);

//   return c ;
// }

function pieAnimationComplete() {
  var chartInstance = this,
    ctx = chartInstance.ctx;
  ctx.font = fontString(
    Chart.defaults.font.size,
    "normal",
    Chart.defaults.font.family
  );
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  console.log(this.data.datasets);
  this.data.datasets.forEach(function (dataset) {
    // console.log(dataset);

    for (var i = 0; i < dataset.data.length; i++) {
      var model = chartInstance.getDatasetMeta(0).data[i],
        total = chartInstance.getDatasetMeta(0).total,
        mid_radius =
          model.innerRadius + (model.outerRadius - model.innerRadius) / 1.5,
        start_angle = model.startAngle,
        end_angle = model.endAngle,
        mid_angle = start_angle + (end_angle - start_angle) / 2;

      var x = mid_radius * Math.cos(mid_angle);
      var y = mid_radius * Math.sin(mid_angle);
      ctx.fillStyle = "#444";

      var percent = String(((dataset.data[i] / total) * 100).toFixed(1)) + "%";
      //Don't Display If Legend is hide or value is 0
      if (
        dataset.data[i] != 0
        //  &&                    dataset._meta[0].data[i].hidden != true
      ) {
        // Display percent in another line, line break doesn't work for fillText
        if (Math.round((dataset.data[i] / total) * 100) < 5) {
          // ctx.fillText(
          //   ConvertStr.ToMoneyStr(dataset.data[i]),
          //   model.x + x,
          //   model.y + y - 30
          // );
          ctx.fillText(percent, model.x + x, model.y + y - 15);
        } else {
          // ctx.fillText(
          //   ConvertStr.ToMoneyStr(dataset.data[i]),
          //   model.x + x,
          //   model.y + y
          // );
          ctx.fillText(percent, model.x + x, model.y + y + 15);
        }
      }
    }
  });
}

function wc_hex_is_light(color) {
  if (!color) return true;
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substring(0, 0 + 2), 16);
  const c_g = parseInt(hex.substring(2, 2 + 2), 16);
  const c_b = parseInt(hex.substring(4, 4 + 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}

function totalValue(data) {
  return data.reduce((sum, val) => sum + val, 0);
}

function isLowValue(context) {
  const dataset = context.chart.data.datasets[0];
  const total = dataset.data.reduce((sum, val) => sum + val, 0);
  const value = dataset.data[context.dataIndex];

  const angle = (value / total) * 360;
  return angle;
}
export default {
  props: {
    type: {
      type: String,
    },
    chartData: {},
    scales: {},
    legend: {},
    chartTitle: String,
  },
  data() {
    return {
      loaded: true,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        // events: ['mousemove'],

        plugins: {
          datalabels:
            this.type == "pie"
              ? {
                  align: "end",
                  font: {
                    weight: "bold",
                    size: "14px",
                  },
                  offset: -3,
                  // rotation: function (context) {
                  //   return isLowValue(context) > 15 ? 0 : -91;
                  // },
                  color: (context) => {
                    let is_light = wc_hex_is_light(
                      context.dataset.backgroundColor[context.dataIndex]
                    );
                    let angle = isLowValue(context) > 15 ? true : false;
                    if (!angle) return "#444";
                    else return is_light ? "#444" : "white";
                  },
                  display: function (context) {
                    return isLowValue(context) > 10;
                  },
                  formatter: (value) => {
                    if (this.type == "pie") {
                      let total = this.chartData.datasets[0].data.reduce(
                        (a, b) => a + b
                      );
                      return Math.round((value / total) * 100) + "%";
                    }
                  },
                  anchor: (context) => {
                    return isLowValue(context) > 15 ? "center" : "end";
                  },
                }
              : null,
          title: {
            display: true,
            // align: "start",
            // position: "",
            text: this.chartTitle,
            padding: {
              top: 5,
              bottom: 25,
              right: 200,
            },
            font: {
              size: 18,
            },
          },

          tooltip: {
            enabled: true,
            callbacks: {
              label: function (tooltipItem) {
                console.log(tooltipItem);
                let percentage = (
                  (tooltipItem.raw / totalValue(tooltipItem.dataset.data)) *
                  100
                ).toFixed(2); // Tính tỷ lệ %
                if (percentage > 1) {
                  percentage = Math.round(percentage);
                }

                let label =
                  (tooltipItem.label || " ") +
                  ` (${tooltipItem.raw}): ${percentage}%`;
                // if (label) {
                //   label += ": ";
                // }
                // label += ; // Giá trị data hiện tại
                // label += " units"; // Thêm đơn vị tùy chỉnh
                return label;
              },
            },
          },
          legend: {
            position: "right",
            display: (this.chartData.labels || []).length <= 10,
            maxWidth: 500,
            labels: {
              boxWidth: 20,
              font: {
                size: 12,
              },

              // padding: 20,
              // generateLabels: function (chart) {
              //   console.log(chart);
              //   return ((chart.data || {}).labels || []).map((label, index) => {
              //     const maxLineLength = 30;
              //     const wrappedLabel = label.match(
              //       new RegExp(`.{1,${maxLineLength}}`, "g")
              //     );
              //     return {
              //       text: wrappedLabel,
              //       fillStyle: chart.data.datasets
              //         ? chart.data.datasets[0].backgroundColor[index]
              //         : null,
              //       hidden: false,
              //       // lineWidth: 2,
              //     };
              //   });
              // },
            },
          },
          // tooltip: true,
        },
        layout: {
          // padding: 50,
        },

        // animation: {
        //   duration: 500,
        //   easing: "easeOutQuart",
        //   active: { duration: 1 },
        //   onComplete:
        //     this.type == "bar"
        //       ? function () {
        //           barAnimationComplete.apply(this);
        //         }
        //       : this.type == "pie"
        //       ? pieAnimationComplete
        //       : null,
        // },
        elements: {
          arc: {
            // backgroundColor: colorize.bind(null, false, false),
            // hoverBackgroundColor: hoverColorize,
          },
        },
        scales: this.scales || null,
      },
    };
  },
  watch: {
    chartData(newValue, oldValue) {
      this.loaded = false;
      this.chartOptions.plugins.title.text = this.chartTitle;

      this.$nextTick(() => {
        this.loaded = true;
      this.chartOptions.plugins.legend.display = false

      });
    },
  },
  mounted() {
    console.log(this);

    // if (this.chartOptions.plugins.legend) {
    //   this.chartOptions.plugins.legend.labels.generateLabels = (chart) => {
    //     return (chart.data.labels || []).map((label, index) => {
    //       const maxLineLength = 30;
    //       const wrappedLabel = label
    //         .match(new RegExp(`.{1,${maxLineLength}}`, "g"))
    //         .join("\n"); // Join with newline to wrap text
    //       return {
    //         text: wrappedLabel,
    //         fillStyle: chart.data.datasets[0].backgroundColor[index],
    //         hidden: false,
    //         // Add padding to prevent overlap
    //         padding: 10,
    //       };
    //     });
    //   };
    // }
  },
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
}
</style>
