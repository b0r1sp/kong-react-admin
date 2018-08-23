import React from 'react';
import { Admin, Resource } from 'react-admin';
import logo from './logo.svg';
import './App.css';
import config from './config'

import AppsIcon from '@material-ui/icons/Apps';
import RoutesIcon from '@material-ui/icons/NearMe';
import ConsumersIcon from '@material-ui/icons/Face';
import PluginsIcon from '@material-ui/icons/Extension';
import AuthIcon from '@material-ui/icons/Security';

import { ServicesList, ServiceEdit, ServiceCreate } from './services';
import { RoutesList, RouteEdit, RouteCreate } from './routes';
import { ConsumersList, ConsumerEdit, ConsumerCreate } from './consumers';
import { APIsList } from './apis';
import { PluginsList, PluginsEdit, PluginCreate } from './plugins';
import { PluginsOldList, PluginOldEdit, PluginOldCreate } from './plugins_old';

import { kongReducer, pluginConfigSaga, kongDataProvider } from './kong'

import { KeyAuthList, KeyAuthCreate } from './api-extensions/key-auth'


const App = () => (
  <Admin dataProvider={kongDataProvider(config.APIEndpoint)} customReducers={{ kong: kongReducer }} customSagas={[ pluginConfigSaga ]}>
    
    <Resource name="services" list={ServicesList} edit={ServiceEdit} create={ServiceCreate} icon={AppsIcon} />
    <Resource name="routes" list={RoutesList} edit={RouteEdit} create={RouteCreate} icon={RoutesIcon} />
    <Resource name="consumers" list={ConsumersList} edit={ConsumerEdit} create={ConsumerCreate} icon={ConsumersIcon} />
    <Resource name="plugins" list={PluginsList} edit={PluginsEdit} create={PluginCreate} icon={PluginsIcon} />
    <Resource name="apis" list={APIsList} />
    <Resource name="pluginsOld" list={PluginsOldList} edit={PluginOldEdit} create={PluginOldCreate} />
    <Resource name="key-auths" list={KeyAuthList} create={KeyAuthCreate} icon={AuthIcon} />
    <Resource name="pluginsEnabled" />
    <Resource name="consumers/key-auth" />
  </Admin>
);

export default App;
