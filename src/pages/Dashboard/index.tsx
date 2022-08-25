import { Button, Card, CardContent, CardHeader, Grid, IconButton, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import AddWidgetDialog from "../../components/AddWidgetDialog";
import CloseIcon from '@mui/icons-material/Close';
import SimpleValue from "../../components/SimpleValue";
import LineChart from "../../components/LineChart";

const fakeData = [
	{
		sensorId: 1,
		sensor: "Temperature",
		historicalData: [10, 20, 40, 30, 15],
		value: 15,
		unit: "°C",
	},
	{
		sensorId: 2,
		sensor: "Intensity",
		data: 30,
		historicalData: [1, 3, 20, 40, 50],
		value: 50,
		unit: "g",
	},
	{
		sensorId: 3,
		sensor: "Feeding",
		historicalData: [49, 79, 39, 69, 64],
		value: 35,
		unit: "%",
	},
	{
		sensorId: 4,
		sensor: "Oxygen",
		historicalData: [49, 79, 39, 69, 64],
		value: 35,
		unit: "%",
	},
];

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			background: "linear-gradient(to right, #36d1dc, #5b86e5)",
			width: "100vw",
			height: "100vh",
			textAlign: "center",
		},
		title: {
			color: "#fff",
			padding: "20px 0",
		},
		listWidget: {
			backgroundColor: "#fff",
			height: 300,
			marginTop: "20px !important",
		},
		widgetItem: {
			backgroundColor: "#e7e9eb",
			border: "2px solid #e7e9eb",
			// width: "200px",
		},
		widgetName: {
			padding: "10px",
			cursor: "move",
		},
		widgetContent: {
			backgroundColor: "#fff",
			padding: '30px'
		},
	})
);

const Dashboard = () => {
	const classes = useStyles();

	const [openDialogAddWidget, setOpenDialogAddWidget] =
		useState<boolean>(false);
	const [listWidget, setListWidget] = useState<ListWidgetState[]>();
	const [listSensor, setListSensor] = useState<ListSensorState[]>();
	const [listDataSensor, setListDataSensor] = useState<ListDataSensor>();

	const handleOnCloseAddWidgetDialog: () => void = () => {
		setOpenDialogAddWidget(false);
	};

	const handleClickAddWidget = (data: ListWidgetState): void => {
		if (listWidget !== undefined) setListWidget([...listWidget, data]);
		else setListWidget([data]);
	};

	const handleRemoveWidgetById = (id: string | undefined): void => {
		setListWidget(listWidget?.filter((value: ListWidgetState) => value?.id !== id));
	};

	const getDataSensor = (): void => {
		setListDataSensor(listSensor?.reduce((a, v) => ({ ...a, [v?.sensorId]: v}), {}) )
	};

	useEffect(() => {
		(async () => {
			// const response = await fetch('')
			setListSensor(fakeData);
		})();
	}, []);

	useEffect(() => {
		getDataSensor();
	}, [listSensor])

	return (
		<div className={classes.container}>
			<Grid container justifyContent="center">
				<Grid item xs={12}>
					<Typography className={classes.title} variant="h4">
						Dynamic Widget
					</Typography>
					<Button
						onClick={() => setOpenDialogAddWidget(true)}
						color="primary"
						variant="contained"
					>
						Add widget
					</Button>
				</Grid>
				<Grid item xs={10} className={classes.listWidget}>
					{listWidget?.map((item: ListWidgetState, index: number) => {
						//@ts-ignore
						const widget = listDataSensor?.[item?.sensor];
						return (
							<Grid item xs={3} key={item?.id}>
								<div className={classes.widgetItem}>
									<Grid item container xs={12} justifyContent='space-between' alignItems='center' className={classes.widgetName}>
										<Grid item >
											<Typography>{`${item?.name} 123123`}</Typography>
										</Grid>
										<Grid item >
											<IconButton onClick={() => {handleRemoveWidgetById(item?.id)}}>
												<CloseIcon />
											</IconButton>
										</Grid>
									</Grid>
									<div className={classes.widgetContent}>
										{item?.widgetType === 1 ? (
											<LineChart data={widget}/>
										) : (
											<SimpleValue data={widget} />
										)}
									</div>
								</div>
							</Grid>
						)
					})}
				</Grid>
				<AddWidgetDialog
					open={openDialogAddWidget}
					onClose={handleOnCloseAddWidgetDialog}
					listSensor={listSensor}
					handleClickAddWidget={handleClickAddWidget}
				/>
			</Grid>
		</div>
	);
};

export default Dashboard;
