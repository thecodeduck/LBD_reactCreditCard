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
		const { onChange } = this.props;
		onChange(evt.target.value, evt.target.name);
	}

	render() {
		const {
			name,
			label,
			inputValue,
			disabled,
			valid,
			onChange,
		} = this.props;

		return (
			<div>
				<input
					type="text"
					name={name}
					value={inputValue}
					disabled={disabled}
					id={this.state.htmlID}
					onChange={this.onChangeWrapper}
					/>
				<label htmlFor={this.state.htmlID}>{label}</label>
			</div>
		);
	}
}

ControlledTextInput.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	inputValue: PropTypes.string,
	disabled: PropTypes.bool,
	valid: PropTypes.bool,
	onChange: PropTypes.func,
};

ControlledTextInput.defaultProps = {
	label: '',
	inputValue: '',
	onChange: (...args) => {
		console.log('ControlledTextInput.defaultProps.onChange', args);
	},
};

export default ControlledTextInput;
