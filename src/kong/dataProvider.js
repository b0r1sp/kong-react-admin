import { stringify } from 'query-string';
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

const fixTimestamps = (resource, x) => {
    if (x['created_at'] && resource !== 'plugins') {
        x['created_at'] = x['created_at']*1000
    }
    if (x['updated_at']) {
        x['updated_at'] = x['updated_at']*1000
    }

    return x
}

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export const kongDataProvider = (apiUrl, httpClient = fetchUtils.fetchJson) => {
    const convertKeyAuthRequestToHTTP = (type, resource, params) => {
        console.log("convertConsumerKeyAuthRequestToHTTP", type, params)
        let url = '';
        const options = {};
        const responseConverter = convertHTTPResponse;

        switch (type) {
            case CREATE:
                url = `${apiUrl}/consumers/${params.data.consumer_id}/key-auth`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;

            case DELETE:
                url = `${apiUrl}/consumers/${params.previousData.consumer_id}/key-auth/${params.id}`;
                options.method = 'DELETE';
                break;
        }

        return { url, options, responseConverter}
    }

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        const responseConverter = convertHTTPResponse;

        if (resource === 'key-auths' && type != GET_LIST && type != GET_MANY && type != GET_MANY_REFERENCE)
        {
            return convertKeyAuthRequestToHTTP(type, resource, params)
        }

        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: JSON.stringify([field, order]),
                    range: JSON.stringify([
                        (page - 1) * perPage,
                        page * perPage - 1,
                    ]),
                    filter: JSON.stringify(params.filter),
                };
                url = `${apiUrl}/${resource}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                if (params.ids.length === 1) {
                    url = `${apiUrl}/${resource}/${params.ids[0]}`
                } else {
                    url = params.ids.map(x => `${apiUrl}/${resource}/${x}`)
                }
                // const query = {
                //     filter: JSON.stringify({ id: params.ids }),
                // };
                break;
            }
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: JSON.stringify([field, order]),
                    range: JSON.stringify([
                        (page - 1) * perPage,
                        page * perPage - 1,
                    ]),
                    filter: JSON.stringify({
                        ...params.filter,
                        [params.target]: params.id,
                    }),
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PATCH';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options, responseConverter };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        console.log("kong json convertHTTPResponse ", type, resource, json)

        let data = json.data
        let total = 0
        switch (resource) {
            case 'plugins/enabled':
                data = json.enabled_plugins.map(x => ({id: x}))
                total = data.length
                break
            default:
                if (json.data)
                {
                    data = json.data
                    total = json.total    
                } else {
                    data = json
                    total = 0
                }
                
        }

        if ( type === GET_LIST ) {
            const { field, order } = params.sort;

            const sordOrder = order == "DESC" ? -1 : 1;

            data.sort(function(a,b){
                if(a[field] == b[field])
                    return 0;
                if(a[field] < b[field])
                    return -sordOrder;
                if(a[field] > b[field])
                    return sordOrder;
            });
        }

        if (data instanceof Array) {
            data = data.map(x => fixTimestamps(resource, x))
        } else {
            data = fixTimestamps(resource, data)
        }

        console.log("kong json Fetched", data)

        switch (type) {
            case GET_LIST:
            case GET_MANY:
                console.log("kong json convertHTTPResponse GET_MANY", data)
                if (!(data instanceof Array)) {
                    return {
                        data: [data],
                        total: 1
                    }
                }
            case GET_MANY_REFERENCE:
                return {
                    data: data,
                    total: parseInt(
                        total
                    ),
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        if (resource === 'pluginsEnabled') {
            resource = 'plugins/enabled'
        } else if (resource === 'pluginsOld') {
            resource = 'plugins'
        }

        console.log("kong json", type, resource, params)
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }

        const { url, options, responseConverter } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );

        if (url instanceof Array) {
            return Promise.all(url.map(x => httpClient(x, options))).then(
                    responses => Promise.all(
                        responses.map(response => responseConverter(response, type, resource, params)))
                    ).then(datas => {
                        let ret = {data: datas.map(x => x.data[0]), total: datas.length};
                        return ret
                    
                    });
        } else {
            return httpClient(url, options).then(response =>
                responseConverter(response, type, resource, params)
            );
        }
    };
};