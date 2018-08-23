import React from 'react';
import {
	BooleanField,
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
    DateField,
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

export const PluginOldEdit = (props) => (
    <Edit title={<PluginTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DateField source="created_at" />
            <BooleanInput source="enabled" />
            <ReferenceField label="Apis" source="api_id" reference="apis">
                <TextField source="name" />
            </ReferenceField>
            <YamlInput source="config" />
        </SimpleForm>
    </Edit>
);

export const PluginOldCreate = (props) => (
    <Create {...props}>
        <SimpleForm onChange={onChangeMy}>
        	<ReferenceInput label="Plugin name" source="id" reference="pluginsEnabled">
                <SelectInput optionText="id" />
            </ReferenceInput>
            
            <ReferenceInput label="Api" source="api_id" reference="apis">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <PluginConfigInput source="config" />
        </SimpleForm>
    </Create>
);

export const PluginsOldList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <ReferenceField label="Apis" source="api_id" reference="apis">
                <TextField source="name" />
            </ReferenceField>
            <BooleanField source="enabled" />
            <EditButton />
        </Datagrid>
    </List>
);
