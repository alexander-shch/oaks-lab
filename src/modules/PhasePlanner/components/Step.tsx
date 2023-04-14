import React, { FC, useState } from 'react';
import { PhaseStep as PhaseStepStructure } from '../models';
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export const PhaseStep: FC<{
	step: PhaseStepStructure,
	onChange: (step: PhaseStepStructure) => void
}> = ({ step, onChange }) => {

	const [stepObj, setStep] = useState(step)

	const handleToggle = (index: number) => {
		setStep(prev => {
			prev.tasks[index].completed = !prev.tasks[index].completed
			onChange(prev)
			return { ...prev }
		})
	};

	return <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
		{stepObj.tasks.map((value, index) => {
			const labelId = `checkbox-list-label-${index}`;

			return (
				<ListItem
					key={index}
					disablePadding
				>
					<ListItemButton role={undefined} onClick={() => handleToggle(index)} dense>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={value.completed}
								tabIndex={-1}
								disableRipple
								inputProps={{ 'aria-labelledby': labelId }}
							/>
						</ListItemIcon>
						<ListItemText id={labelId} primary={`Line item ${index + 1}`} />
					</ListItemButton>
				</ListItem>
			);
		})}
	</List>
}