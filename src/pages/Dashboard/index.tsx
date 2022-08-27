import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SyncIcon from '@mui/icons-material/Sync';
import { Button, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { DragEvent, MouseEvent, useEffect, useState } from 'react';
import AddWidgetDialog from '../../components/AddWidgetDialog';
import LineChart from '../../components/LineChart';
import SimpleValue from '../../components/SimpleValue';
import { useStyles } from './useStyles';

const fakeData = [
	{
		sensorId: 1,
		sensor: 'Temperature',
		historicalData: [10, 20, 40, 30, 15],
		value: 15,
		unit: '°C',
	},
	{
		sensorId: 2,
		sensor: 'Intensity',
		data: 30,
		historicalData: [1, 3, 20, 40, 50],
		value: 50,
		unit: 'g',
	},
	{
		sensorId: 3,
		sensor: 'Feeding',
		historicalData: [49, 79, 39, 69, 64],
		value: 35,
		unit: '%',
	},
	{
		sensorId: 4,
		sensor: 'Oxygen',
		historicalData: [49, 79, 39, 69, 64],
		value: 35,
		unit: '%',
	},
];

const Dashboard = () => {
	const classes = useStyles();

	const [openDialogAddWidget, setOpenDialogAddWidget] = useState<boolean>(false);
	const [listWidget, setListWidget] = useState<ListWidgetState[]>();
	const [listSensor, setListSensor] = useState<ListSensorState[]>();
	const [currentMousePosition, setCurrentMousePosition] = useState<number[] | undefined>();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedWidget, setSelectedWidget] = useState<ListWidgetState | null>();
	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setSelectedWidget(null);
		setAnchorEl(null);
	};

	const handleOnCloseAddWidgetDialog: () => void = () => {
		setOpenDialogAddWidget(false);
	};

	const handleClickAddWidget = (data: ListWidgetState): void => {
		if (listWidget !== undefined) setListWidget([...listWidget, data]);
		else setListWidget([data]);
	};

	const handleRemoveWidgetById = (id: string | undefined): void => {
		setListWidget(
			listWidget?.filter((value: ListWidgetState) => value?.id !== id)
		);
	};

	const handleChangeWidget = (index: number): void => {
        if (listWidget instanceof Array) {
            let cloneListSensor: ListWidgetState[] = [...listWidget];
            cloneListSensor[index].widgetType = cloneListSensor[index].widgetType === 1 ? 2 : 1;
            setListWidget(cloneListSensor);
        };
	};

    const handleChangeSensor = (sensorId: number) => {
        if (listWidget instanceof Array) {
			const index = listWidget.findIndex(item => item?.id === selectedWidget?.id);
            let cloneListSensor: ListWidgetState[] = [...listWidget];
            cloneListSensor[index].sensor = sensorId;
            setListWidget(cloneListSensor);
            handleClose();
        };
    };

	const onDragging = (
		e: DragEvent<HTMLDivElement>,
		id: string | undefined
	): void => {
		e.stopPropagation();
		e.preventDefault();
		if (id) {
			const element: HTMLElement | null = document.getElementById(id);
			const listWidgetElement = document.getElementById('listWidget');
			if (
				element &&
				listWidgetElement &&
				currentMousePosition !== undefined
			) {
				const offsetTopElement = e.clientY - listWidgetElement.offsetTop - currentMousePosition[1];
				const offsetLeftElement = e.clientX - listWidgetElement.offsetLeft - currentMousePosition[0];
				if (
					offsetTopElement > 0 &&
					offsetTopElement < listWidgetElement.offsetHeight - element.offsetHeight &&
					offsetLeftElement > 0 &&
					offsetLeftElement < listWidgetElement.offsetWidth - element.offsetWidth
				) {
					element.style.top = `${offsetTopElement}px`;
					element.style.left = `${offsetLeftElement}px`;
				}
			}
		}
	};

	const onDragStart = (
		e: DragEvent<HTMLDivElement>,
		id: string | undefined
	): void => {
		if (id) {
			const element: HTMLElement | null = document.getElementById(id);
			const listWidgetElement = document.getElementById('listWidget'); 
			if (element && listWidgetElement) {
				setCurrentMousePosition([
					e.clientX - element.offsetLeft - listWidgetElement.offsetLeft,
					e.clientY - element.offsetTop - listWidgetElement.offsetTop,
				])
			};
		};
	};

	const getListSensor = () => {
		fetch(
			'https://exam-express.vercel.app/api/sensors'
		)
			.then(res => res.json())
			.then(data => {
				console.log(data)
			})
			.catch(err => console.log(err));
		setListSensor(fakeData);
	};

	useEffect(() => {
		getListSensor();
	}, []);

    document.addEventListener("dragstart", (event) => {
        const target = event.target as Element;
        event.dataTransfer?.setDragImage(target, window.outerWidth, window.outerHeight);
    }, false);

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
				<Grid
					item
					xs={10}
					className={classes.listWidget}
					id="listWidget"
				>
					{listWidget?.map((item: ListWidgetState, index: number) => {
						const widget = listSensor?.find(sensor => sensor?.sensorId === item?.sensor);
						return (
							widget !== undefined && (
								<Grid
									item
									xs={3}
									key={item?.id}
									id={item?.id}
									onDragStart={e => onDragStart(e, item.id)}
									onDragEnd={e => {
                                        setCurrentMousePosition(undefined)
                                    }}
                                    onDrag={(e) => onDragging(e, item.id)}
									className={classes.draggable}
								>
									<div
                                        className={classes.widgetItem}
                                    >
										<Grid
											item
											container
											xs={12}
											justifyContent="space-between"
											alignItems="center"
											className={classes.widgetName}
											draggable
											spacing={3}
										>
											<Grid item>
												<div>{item?.name}</div>
											</Grid>
											<Grid item>
												<IconButton
													onClick={(e) => {
														handleClick(e);
														setSelectedWidget(item)
													}}
												>
													<ImportExportIcon />
												</IconButton>
												<IconButton
													onClick={() => {
														handleChangeWidget(index);
													}}
												>
													<SyncIcon />
												</IconButton>
												<IconButton
													onClick={() => {
														handleRemoveWidgetById(item?.id);
													}}
												>
													<CloseIcon />
												</IconButton>
											</Grid>
										</Grid>
										<div className={classes.widgetContent}>
											{item?.widgetType === 1 ? (
												<LineChart data={widget} />
											) : (
												<SimpleValue data={widget} />
											)}
										</div>
									</div>
								</Grid>
							)
						);
					})}
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
					>
						{listSensor?.map((value) => (
							<MenuItem key={value?.sensorId} onClick={() => handleChangeSensor(value?.sensorId)}>
								{value?.sensor}
							</MenuItem>
						))}
					</Menu>
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
