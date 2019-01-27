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
			label,
			inputValue,
			disabled,
			valid,
			onChange,
			ariaLabel,
			size,
			maxlength,
		} = this.props;

		return (
			<div className="field">
				<label className="label" htmlFor={this.state.htmlID}>{label}</label>
				<div className="control">
					<input
						className="input"
						type="text"
						name={name}
						value={inputValue}
						disabled={disabled}
						id={this.state.htmlID}
						valid={valid}
						onChange={this.onChangeWrapper}
						aria-label={ariaLabel}
						size={size}
						maxLength={maxlength}
						/>
				</div>
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
	ariaLabel: PropTypes.string,
	size: PropTypes.string,
	maxlength: PropTypes.string,
};

ControlledTextInput.defaultProps = {
	label: '',
	inputValue: '',
	onChange: (...args) => {
		console.log('ControlledTextInput.defaultProps.onChange', args);
	},
};

export default ControlledTextInput;
