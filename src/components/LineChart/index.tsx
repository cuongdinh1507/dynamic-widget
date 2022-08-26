import {
	Chart as ChartJS, ChartOptions,
	registerables
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

interface LineChartProps {
	data: ListSensorState;
}

const LineChart = ({ data }: LineChartProps) => {
	const chartData = {
		labels: ["1", "2", "3", "4", "5"],
		datasets: [
			{
				label: data?.sensor,
				data: data?.historicalData,
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)",
			},
		],
	};

	const options: ChartOptions<"line"> = {
		responsive: true,
		scales: {
			y: {
				title: {
					text: `${data?.sensor} (${data?.unit})`,
					display: true,
				},
			},
			x: {
				title: {
					text: `Time (minutes)`,
					display: true,
				},
			},
		},
	};

	return <Line data={chartData} options={options} />;
};

export default LineChart;
