import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ControlledCheckbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			htmlID: _.uniqueId(),
		};
		this.onChangeWrapper = this.onChangeWrapper.bind(this);
	}

	onChangeWrapper(evt) {
		console.log('ControlledCheckbox.onChangeWrapper', evt.target.value, evt.target.name);
		const { onChange } = this.props;
		onChange(evt.target.value, evt.target.name);
	}

	render() {
		const {
			name,
			checkboxClass,
			htmlID,
			disabled,
			onChange,
			ariaLabel,
			checkboxValue,
			required,
			label,
		} = this.props;

		return (
			<label className={`checkbox ${checkboxClass}`}>
				<input
					type="checkbox"
					name={name}
					value={checkboxValue}
					disabled={disabled}
					id={htmlID || this.state.htmlID}
					onChange={this.onChangeWrapper}
					aria-label={ariaLabel}
					required={required}
					/>
				&nbsp;
				{label}
			</label>
		);
	}
}

ControlledCheckbox.propTypes = {
	name: PropTypes.string,
	checkboxClass: PropTypes.string,
	htmlID: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	ariaLabel: PropTypes.string,
	checkboxValue: PropTypes.string,
	required: PropTypes.bool,
	label: PropTypes.string,
};

ControlledCheckbox.defaultProps = {
	checkboxClass: '',
	checkboxValue: '',
	onChange: (...args) => {
		console.log('ControlledCheckbox.defaultProps.onChange', args);
	},
	label: 'default label',
};

export default ControlledCheckbox;
