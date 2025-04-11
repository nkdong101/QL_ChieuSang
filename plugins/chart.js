import Vue from "vue";
import { Line, Bar, Pie } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  ChartDataLabels
);

Vue.component("line-chart", {
  extends: Line,
});
Vue.component("bar-chart", {
  extends: Bar,
});
Vue.component("pie-chart", {
  extends: Pie,
});
