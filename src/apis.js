import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const APIsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="upstream_url" />
        </Datagrid>
    </List>
);