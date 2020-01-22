import React, { Fragment, useState, ChangeEvent, ReactNode } from 'react';
import { DialogActions, DialogContent, ListItemText, ListItemIcon, ListItem, List, Button, Checkbox } from '@material-ui/core';

import DialogTitle from 'components/DialogTitle';
import Dialog from 'components/Dialog';
import SearchBar from 'components/SearchBar';
import { toTitleCase } from 'meta/util';

export interface SelectManyProps {
	title: ReactNode;
	value: string | string[];
	name: ReactNode;
	values: {
		name: string;
		value: string;
	}[];

	onChange(...args: any[]): void;
}

export default function SelectMany({ title, value, onChange, values, name }: SelectManyProps) {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(value);
	const [search, setSearch] = useState('');

	const handleClose = () => setOpen(!open);

	const handleToggle = (value: string) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<Fragment>
			<Button variant="contained" color="primary" onClick={() => setOpen(true)}>
				{title}: {name}
			</Button>
			<Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
				<DialogTitle onClose={handleClose}>{toTitleCase(title)}</DialogTitle>
				{values.length > 10 && <SearchBar onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />}
				<DialogContent dividers>
					<List>
						{values
							.filter(({ name, value }) => {
								if (!search) return true;
								return `${name} ${value}`.toLowerCase().includes(search);
							})
							.map(({ value, name }) => (
								<ListItem key={value} button onClick={handleToggle(value)}>
									<ListItemIcon>
										<Checkbox edge="start" checked={checked.includes(value)} tabIndex={-1} color="primary" />
									</ListItemIcon>
									<ListItemText primary={name} />
								</ListItem>
							))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setChecked([])} color="primary">
						Reset
					</Button>
					<Button
						onClick={() => {
							onChange(checked);
							handleClose();
						}}
						color="primary"
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}