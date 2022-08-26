import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { WIDGET_TYPE_OPTION } from "../../constants";
import { generateGUID } from "../../helpers";

interface AddWidgetDialogProps {
	open: boolean;
	listSensor: ListSensorState[] | undefined;
	onClose: () => void;
	handleClickAddWidget: (data: ListWidgetState) => void;
}

const AddWidgetDialog = ({
	open = false,
	listSensor = [],
	onClose = () => {},
	handleClickAddWidget = () => {},
}: AddWidgetDialogProps) => {
	const [name, setName] = useState<string>('');
	const [widgetType, setWidgetType] = useState<number>();
	const [sensorId, setSensorId] = useState<number>();

    useEffect(() => () => {
        setName('');
        setWidgetType(0);
        setSensorId(0);
    }, []);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>Add widget</DialogTitle>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleClickAddWidget({
                        id: generateGUID(),
						name,
						widgetType,
						sensor: sensorId,
					});
                    onClose();
				}}
			>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} className={"mt-3"}>
							<TextField
								label="Name"
								onChange={(e) => setName(e.target.value)}
								size="small"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} className={"mt-3"}>
							<FormControl fullWidth size='small'>
								<InputLabel id="widgetType">
									Widget type
								</InputLabel>
								<Select
									labelId="widgetType"
									label="Widget type"
									value={widgetType}
									onChange={(e) => {
                                        if (typeof e?.target?.value === 'number')
                                            setWidgetType(e.target.value);
                                    }}
								>
									{WIDGET_TYPE_OPTION.map((item: WIDGET_TYPE, index: number) => (
                                        <MenuItem value={item.value} key={index}>{item?.name}</MenuItem>
                                    ))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} className={"mt-3"}>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="sensor">
									Widget type
								</InputLabel>
								<Select
									labelId="sensor"
									value={sensorId}
									label="Sensor type"
									onChange={(e) => {
                                        if (typeof e?.target?.value === 'number')
                                            setSensorId(e.target.value);
                                    }}
								>
									{listSensor.map((item: ListSensorState, index: number) => (
                                        <MenuItem value={item.sensorId} key={index}>{item?.sensor}</MenuItem>
                                    ))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => onClose()}>Close</Button>
					<Button variant="contained" type="submit" disabled={ (name === '') || (widgetType === undefined) || (sensorId === undefined)}>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddWidgetDialog;