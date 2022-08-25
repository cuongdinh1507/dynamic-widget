interface ListSensorState {
	sensorId: number,
	sensor: string,
	historicalData: number[],
	value: number,
	unit: string
};

interface ListWidgetState {
    id?: string,
	name: string,
	widgetType?: number,
	sensor?: number
};

interface WIDGET_TYPE {
    name: string;
    value: 1 | 2;
};

interface SimpleValueProps {
    sensor: string;
	value: number;
	unit: string;
};

interface LineChartProps {
	value: number;
	unit: string;
	historical: number[];
};

interface ListDataSensor {
    [key: number]: ListSensorState
}