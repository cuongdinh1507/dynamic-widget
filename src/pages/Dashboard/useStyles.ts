import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			background: 'linear-gradient(to right, #36d1dc, #5b86e5)',
			width: '100vw',
			height: '100vh',
			textAlign: 'center',
		},
		title: {
			color: '#fff',
			padding: '20px 0',
		},
		listWidget: {
			backgroundColor: '#fff',
			height: '80vh',
			marginTop: '20px !important',
            position: 'relative'
		},
		widgetItem: {
			backgroundColor: '#e7e9eb',
			border: '2px solid #e7e9eb',
			// width: "200px",
		},
		widgetName: {
			padding: '10px',
			cursor: 'move',
		},
		widgetContent: {
			backgroundColor: '#fff',
			padding: '30px',
		},
        draggable: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10
        }
	})
);
