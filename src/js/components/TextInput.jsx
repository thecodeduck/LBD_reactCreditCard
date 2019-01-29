import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ControlledTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			htmlID: _.uniqueId(),
		};
		this.onChangeWrapper = this.onChangeWrapper.bind(this);
	}

	onChangeWrapper(evt) {
		console.log('ControlledTextInput.onChangeWrapper', evt.target.value, evt.target.name);
		const { onChange } = this.props;
		onChange(evt.target.value, evt.target.name);
	}

	render() {
		const {
			name,
			controlClass,
			inputClass,
			inputValue,
			htmlID,
			disabled,
			valid,
			onChange,
			ariaLabel,
			size,
			minLength,
			maxLength,
			required,
		} = this.props;

		return (
			<div className={`control ${controlClass}`}>
				<input
					className={inputClass ? `input ${inputClass}` : 'input'}
					type="text"
					name={name}
					value={inputValue}
					disabled={disabled}
					id={htmlID || this.state.htmlID}
					valid={valid}
					onChange={this.onChangeWrapper}
					aria-label={ariaLabel}
					size={size}
					minLength={minLength}
					maxLength={maxLength}
					required={required}
					/>
			</div>
		);
	}
}

ControlledTextInput.propTypes = {
	name: PropTypes.string,
	controlClass: PropTypes.string,
	inputClass: PropTypes.string,
	inputValue: PropTypes.string,
	disabled: PropTypes.bool,
	htmlID: PropTypes.string,
	valid: PropTypes.bool,
	onChange: PropTypes.func,
	ariaLabel: PropTypes.string,
	size: PropTypes.string,
	minLength: PropTypes.string,
	maxLength: PropTypes.string,
	required: PropTypes.bool,
};

ControlledTextInput.defaultProps = {
	controlClass: '',
	inputClass: '',
	inputValue: '',
	onChange: (...args) => {
		console.log('ControlledTextInput.defaultProps.onChange', args);
	},
};

class ControlledTextInputLabeled extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			htmlID: _.uniqueId(),
		};
		this.onChangeWrapper = this.onChangeWrapper.bind(this);
	}

	onChangeWrapper(evt) {
		console.log('ControlledTextInput.onChangeWrapper', evt.target.value, evt.target.name);
		const { onChange } = this.props;
		onChange(evt.target.value, evt.target.name);
	}


	render() {
		const {
			label,
			fieldClass,
			labelClass,
			htmlID,
			...rest
		} = this.props;

		return (
			<div className={fieldClass ? `field ${fieldClass}` : 'field'}>
				<label className={labelClass ? `label ${labelClass}` : 'label'} htmlFor={htmlID || this.state.htmlID}>{label}</label>
				<ControlledTextInput
					htmlID={this.state.htmlID}
					{...rest}
					/>
			</div>
		);
	}
}

ControlledTextInputLabeled.propTypes = {
	fieldClass: PropTypes.string,
	labelClass: PropTypes.string,
	label: PropTypes.string,
	htmlID: PropTypes.string,
};

ControlledTextInputLabeled.defaultProps = {
	fieldClass: '',
	labelClass: '',
	label: '',
	inputValue: '',
	onChange: (...args) => {
		console.log('ControlledTextInput.defaultProps.onChange', args);
	},
};


export { ControlledTextInput, ControlledTextInputLabeled };
