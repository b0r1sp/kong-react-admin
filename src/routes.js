import React from 'react';

import {
	BooleanInput,
	Create,
	Datagrid,
	DisabledInput,
	Edit,
	EditButton,
	List,
	DateField,
	ReferenceField,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextField,
	NumberInput,
	ChipField,
	SelectArrayInput,
} from 'react-admin';

import TextArrayInput from './ui/TextInput'

export const RoutesList = (props) => (
    <List {...props}>
        <Datagrid>
        	<ReferenceField label="Service" source="service.id" reference="services">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="hosts" />
            <ChipField source="paths" />
            <EditButton />
        </Datagrid>
    </List>
);

export const RouteEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <SelectArrayInput label="Protocols" source="protocols" choices={[
				{ id: 'http', name: 'http' },
				{ id: 'https', name: 'https' },
			]} />
            <SelectArrayInput label="Methods" source="methods" choices={[
				{ id: 'GET', name: 'GET' },
				{ id: 'HEAD', name: 'HEAD' },
				{ id: 'POST', name: 'POST' },
				{ id: 'PUT', name: 'PUT' },
				{ id: 'DELETE', name: 'DELETE' },
				{ id: 'TRACE', name: 'TRACE' },
				{ id: 'OPTIONS', name: 'OPTIONS' },
				{ id: 'CONNECT', name: 'CONNECT' },
				{ id: 'PATCH', name: 'PATCH' },
			]} />
            <TextArrayInput source="hosts" placeholder="host" />
            <TextArrayInput source="paths" placeholder="path" />
            <NumberInput source="regex_priority" />
            <BooleanInput source="strip_path" />
            <BooleanInput source="preserve_host" />
        </SimpleForm>
    </Edit>
);

export const RouteCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
        	<ReferenceInput label="Service" source="service.id" reference="services">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <SelectArrayInput label="Protocols" source="protocols" choices={[
				{ id: 'http', name: 'http' },
				{ id: 'https', name: 'https' },
			]} />
            <SelectArrayInput label="Methods" source="methods" choices={[
				{ id: 'GET', name: 'GET' },
				{ id: 'HEAD', name: 'HEAD' },
				{ id: 'POST', name: 'POST' },
				{ id: 'PUT', name: 'PUT' },
				{ id: 'DELETE', name: 'DELETE' },
				{ id: 'TRACE', name: 'TRACE' },
				{ id: 'OPTIONS', name: 'OPTIONS' },
				{ id: 'CONNECT', name: 'CONNECT' },
				{ id: 'PATCH', name: 'PATCH' },
			]} />
        	<TextArrayInput source="hosts" placeholder="host" />
        	<TextArrayInput source="paths" placeholder="path" />
        </SimpleForm>
    </Create>
);