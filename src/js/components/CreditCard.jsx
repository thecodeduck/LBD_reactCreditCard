import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

class StatelessCCForm extends React.Component {
	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(newInput, name) {
		const { inputValue, onChange } = this.props;
		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;

		let newInputValue = {
			cardNumber,
			expMonth,
			expYear,
			cvc,
			cardHolderName,
		};
		// eslint-disable-next-line
		switch (name) {
			case 'cardNumber':
				newInputValue = Object.assign({ cardNumber: newInput }, newInputValue);
				break;
			case 'expMonth':
				newInputValue = Object.assign({ expMonth: newInput }, newInputValue);
				break;
			case 'expYear':
				newInputValue = Object.assign({ expYear: newInput }, newInputValue);
				break;
			case 'cvc':
				newInputValue = Object.assign({ cvc: newInput }, newInputValue);
				break;
			case 'cardHolderName':
				newInputValue = Object.assign({ cardHolderName: newInput }, newInputValue);
				break;
		}

		onChange(newInputValue);
		console.log(newInputValue);
	}

	render() {
		const { inputValue, disabled } = this.props;
		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;
		const { onInputChange } = this;

		return (
			<div>
				<TextInput
					name="cardNumber"
					label="Card Number"
					disabled={disabled}
					inputValue={cardNumber}
					onChange={onInputChange}
					/>
			</div>
		);
	}
}

StatelessCCForm.propTypes = {
	inputValue: PropTypes.shape({
		cardNumber: PropTypes.string,
		expMonth: PropTypes.string,
		expYear: PropTypes.string,
		cvc: PropTypes.string,
		cardHolderName: PropTypes.string,
	}),
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

StatelessCCForm.defaultProps = {
	inputValue: {},
	disabled: false,
	onChange: (...args) => {
		console.log('StatelessCCForm.defaultProps.onChange ', args);
	},
};

export default StatelessCCForm;
