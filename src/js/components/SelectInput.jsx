import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ControlledSelectInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			htmlID: _.uniqueId(),
		};
		this.onChangeWrapper = this.onChangeWrapper.bind(this);
	}

	onChangeWrapper(evt) {
		console.log('ControlledSelectInput.onChangeWrapper', evt.target.value, evt.target.name);
		const { onChange } = this.props;
		onChange(evt.target.value, evt.target.name);
	}

	renderOptions(opt) {
		return (
			<React.Fragment>
				<option>opt</option>
			</React.Fragment>
		);
	}


	render() {
		const {
			name,
			selectClass,
			htmlID,
			disabled,
			onChange,
			ariaLabel,
			size,
			required,
			options,
		} = this.props;

		return (
			<div className={`select ${selectClass}`}>
				<select
					name={name}
					id={htmlID}
					disabled={disabled}
					onChange={this.onChangeWrapper}
					aria-label={ariaLabel}
					size={size}
					required={required}
					>
					{options.map((opt) => {
						return (<option>{opt}</option>);
					})}
				</select>
			</div>
		);
	}
}

ControlledSelectInput.propTypes = {
	name: PropTypes.string,
	selectClass: PropTypes.string,
	disabled: PropTypes.bool,
	htmlID: PropTypes.string,
	onChange: PropTypes.func,
	ariaLabel: PropTypes.string,
	size: PropTypes.string,
	required: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.string),
};

ControlledSelectInput.defaultProps = {
	selectClass: '',
	onChange: (...args) => {
		console.log('ControlledSelectInput.defaultProps.onChange', args);
	},
};

export default ControlledSelectInput;
