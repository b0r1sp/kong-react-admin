import React from 'react';
import {
	BooleanField,
	BooleanInput,
	Create,
	Datagrid,
	DisabledInput,
    DateField,
	Edit,
	EditButton,
	List,
	ReferenceField,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextField,
} from 'react-admin';

import { connect } from 'react-redux';

import YamlInput from './yamlInput'
import config from './config'

import * as yaml from 'js-yaml';

const PluginConfigInput = connect((state) => {
	let value = ''
	if (state.kong.pluginSchema !== null) {
		value = yaml.dump(state.kong.pluginSchema.schema)
	}

	return {exampleValue: value};
})(YamlInput)

const onChangeMy = (values, dispatch, props, previousValues) => {
	if (values.name !== previousValues.name) {
		dispatch({type: 'KONG_ADMIN_CREATE_PLUGIN_FORM_CHANGED', endpoint: config.APIEndpoint, payload: values});
	}
}

const PluginTitle = ({ record }) => {
    return <span>Plugin {record ? `"${record.name}"` : ''}</span>;
};

export const PluginsEdit = (props) => (
    <Edit title={<PluginTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DateField source="created_at" />
            <BooleanInput source="enabled" />
            <ReferenceField label="Route" source="route_id" reference="routes" allowEmpty={true}>
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Service" source="service_id" reference="services" allowEmpty={true}>
                <TextField source="name" />
            </ReferenceField>
            <YamlInput source="config" />
        </SimpleForm>
    </Edit>
);

export const PluginCreate = (props) => (
    <Create {...props}>
        <SimpleForm onChange={onChangeMy}>
        	<ReferenceInput label="Plugin name" source="name" reference="pluginsEnabled">
                <SelectInput optionText="id" />
            </ReferenceInput>
            
            <ReferenceInput label="Route" source="route_id" reference="routes">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput label="Service" source="service_id" reference="services">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <PluginConfigInput source="config" />
        </SimpleForm>
    </Create>
);

export const PluginsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <ReferenceField label="Route" source="route_id" reference="routes" allowEmpty={true}>
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Service" source="service_id" reference="services" allowEmpty={true}>
                <TextField source="name" />
            </ReferenceField>
            <BooleanField source="enabled" />
            <EditButton />
        </Datagrid>
    </List>
);
