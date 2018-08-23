import React from 'react';

import {
	BooleanInput,
	Create,
	Datagrid,
	DisabledInput,
	Edit,
	EditButton,
	List,
	ReferenceField,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
	NumberInput,
	ChipField,
	SelectArrayInput,
	DateField,
} from 'react-admin';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { TextArrayInput } from './ui'

export const ConsumersList = (props) => (
	<List {...props}>
		<Datagrid>
			<TextField source="username" />
			<TextField source="custom_id" />
			<DateField source="created_at" />
			<EditButton />
		</Datagrid>
	</List>
);


/*
<SelectArrayInput label="Plugin" source="protocols" choices={[
					{ id: 'jwt', name: 'jwt' },
					{ id: 'key-auth', name: 'key-auth' },
					{ id: 'hmac-auth', name: 'hmac-auth' },
					{ id: 'oauth2', name: 'oauth2' },
					{ id: 'basic-auth', name: 'basic-auth' },
					{ id: 'acls', name: 'acls' },
				]} />
				*/

export const ConsumerEdit = (props) => (
	<div>
		<Edit {...props}>
			<SimpleForm>
				<DisabledInput source="id" />
				<DateField source="created_at" />
				<TextInput source="username" />
				<TextInput source="custom_id" />

				
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>Auth key</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<ReferenceInput label="Auth key" source="id" reference="consumers/key-auth">
							<TextInput optionText="key" />
						</ReferenceInput> 
					</ExpansionPanelDetails>
				</ExpansionPanel>

				
			</SimpleForm>
		</Edit>
	</div>
);

export const ConsumerCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="username" />
			<TextInput source="custom_id" />
		</SimpleForm>
	</Create>
);