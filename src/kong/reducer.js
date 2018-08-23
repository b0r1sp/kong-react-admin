
const kongReducer = (state = { pluginSchema: null }, action) => {
	switch (action.type) {
		case 'KONG_PLUGIN_SCHEMA_RECIEVED':
			state.pluginSchema = action.payload;
			return state;
		
		default:
			return state;
  }
};

export { kongReducer };