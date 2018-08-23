import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchUtils } from 'react-admin';

const httpClient = fetchUtils.fetchJson;

const getPluginConfig = (endpoint, pluginName) => {
	return httpClient(`${endpoint}/plugins/schema/${pluginName}`, {
        		method: 'GET',
        	}
	    );
}

function* fetchPluginConfig(action) {
	try {
		const schema = yield call(getPluginConfig, action.endpoint, action.payload.name);
		yield put({type: "KONG_PLUGIN_SCHEMA_RECIEVED", payload: {pluginName: action.payload.name, schema: schema.json.fields}});
	} catch (e) {
		yield put({type: "USER_FETCH_FAILED", message: e.message});
	}
}

function* pluginConfigSaga() {
  yield takeLatest("KONG_ADMIN_CREATE_PLUGIN_FORM_CHANGED", fetchPluginConfig);
}

export { pluginConfigSaga };