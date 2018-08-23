import React from 'react';

import {
	Create,
	Datagrid,
    DateField,
	DisabledInput,
	Edit,
	EditButton,
	List,
	SimpleForm,
	TextField,
	TextInput,
	NumberInput,
} from 'react-admin';


const ServiceUrlField = ({ source, record = {} }) => <span>{record['protocol']}://{record['host']}:{record['port']}{record['path']}</span>;

export const ServicesList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <ServiceUrlField source="" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ServiceEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <TextInput source="name" />
            <TextInput source="protocol" />
            <TextInput source="host" />
            <NumberInput source="port" />
            <TextInput source="path" />
            <NumberInput source="retries" />
            <NumberInput source="read_timeout" />
            <NumberInput source="write_timeout" />
        </SimpleForm>
    </Edit>
);

export const ServiceCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="url" label="upstream url" />
            <NumberInput source="retries" />
            <NumberInput source="read_timeout" />
            <NumberInput source="write_timeout" />
        </SimpleForm>
    </Create>
);