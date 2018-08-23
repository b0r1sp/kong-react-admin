import debounce from 'lodash/debounce';
import React, { Component } from 'react'
import AceEditor from 'react-ace';
import * as yaml from 'js-yaml';
import { FormField } from 'react-admin';
import PropTypes from 'prop-types';

import 'brace/mode/yaml';
import 'brace/theme/monokai';


const ifEmpty = (val) => {
    return (val === undefined || val === {} || val === '')
}

const blaBlaInput = (props) => {
    const { input: { value, onChange }, forwardedRef, ...rest } = props

    return <AceEditor
                mode="yaml"
                theme="monokai"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{$blockScrolling: true}}
                value={ ifEmpty(value) ? props.exampleValue : value }
                onChange={debounce(onChange, 500)}
                ref={forwardedRef}
                {...rest}
            />
}


class WithFormField extends Component {
    yamlLoad = (val) => {
        try {
            let ret = yaml.load(val)
            ret = ret ? ret : '';
            return ret
        } catch (e) {
        }
    }

    yamlDump = (val) => {
        if (ifEmpty(val)) {
            return '';
        }

        return yaml.safeDump(val)
    }

    render() {
        const { parse, format, ...rest } = this.props
        return (
            <FormField parse={this.yamlLoad} format={this.yamlDump} component={blaBlaInput} {...rest} />
        )
    }
}

WithFormField.propTypes = {
    exampleValue: PropTypes.string,
};

export default WithFormField;

//export default addField(MyCustomInput);
