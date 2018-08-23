import React from 'react';
import PropTypes from 'prop-types';
import { addField } from 'react-admin';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/RemoveCircleOutline';
import Button from '@material-ui/core/Button';
import { isRequired, FieldTitle } from 'ra-core';

// @TODO:
//import { translate } from 'ra-core';

class TextArrayInput extends React.Component {
    getInitialValue(value) {
        if (value instanceof Array) {
            return value.slice();
        } else {
            return []
        }
    }

    onChangeElement(idx, event) {
        let newValue = event.target.value;
        const { input: { value, onChange } } = this.props

        if (value instanceof Array) {
            let newArr = value.slice()
            newArr[idx] = newValue
            onChange(newArr)
        } else {
            onChange([newValue])
        }
    }

    onAddElement() {
        const { input: { value, onChange } } = this.props
        let val = this.getInitialValue(value)
        val.push('')
        onChange(val)
    }

    onRemoveElement(idx) {
        const { input: { value, onChange } } = this.props
        let val = this.getInitialValue(value)
        val.splice(idx, 1);
        onChange(val)
    }

    render() {
        const { input: { value }, source, resource, validate, label, placeholder, classes = {} } = this.props

        let val = value;
        if (val === undefined || val === '') {
            val = [''];
        }

        return (
        <div>
            <InputLabel htmlFor={source} shrink>
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired(validate)}
                    />
             </InputLabel>
            <List>
            {val.map((x, idx) => (
                <ListItem key={idx.toString()}>

                    <Input
                        placeholder={placeholder}
                        value={x}
                        onChange={(x) => this.onChangeElement(idx, x)}
                    />
                    <span className={classes.action}>
                        <Button
                            size="small"
                            onClick={() => this.onRemoveElement(idx)}
                        >
                            <CloseIcon
                                className={classes.leftIcon}
                            />
                            {/* @TODO: add translate('ra.action.remove')*/}
                        </Button>
                    </span>
                </ListItem>)
            )}
            <Button size="small" onClick={() => this.onAddElement()}>
                <AddIcon className={classes.leftIcon} />
                {/* @TODO: add translate('ra.action.add')*/}
            </Button>
            </List>
        </div>
        )
    }
}

TextArrayInput.propTypes = {
    translate: PropTypes.func,
};

export default addField(TextArrayInput);
