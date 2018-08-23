import React from 'react';

import {
	Resource,
	BooleanInput,
	Create,
	Datagrid,
	DisabledInput,
	Edit,
	DeleteButton,
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

import Icon from '@material-ui/icons/Security';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const KeyAuthList = (props) => (
	<List {...props}>
		<Datagrid>
			<ReferenceField label="Consumer" source="consumer_id" reference="consumers" allowEmpty={false}>
                <TextField source="username" />
            </ReferenceField>
            <ReferenceField label="Consumer custom id" source="consumer_id" reference="consumers" allowEmpty={false}>
				<TextField source="custom_id" />
            </ReferenceField>

			<TextField source="key" />
			<DateField source="created_at" />
			<DeleteButton />
		</Datagrid>
	</List>
);

export const KeyAuthCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
		    <ReferenceInput label="Consumer" source="consumer_id" reference="consumers">
                <SelectInput optionText="username" />
            </ReferenceInput>
			<TextInput source="key" />
		</SimpleForm>
	</Create>
);

export const KeyAuthResource = (props) => (
	<Resource name="key-auths" list={KeyAuthList} icon={Icon} />
);