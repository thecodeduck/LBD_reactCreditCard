import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const isValidCardNumber = (number) => /^\d{4}\s*\d{4}\s*\d{4}\s*\d{4}$/.test(number);

const isValidExpMonth = (number) => /^\d{1,2}$/.test(number);

const isValidExpYear = (number) => /^\d{4}$/.test(number);

const isValidCVC = (number) => /^\d{3}$/.test(number);

const isValidCardHolderName = (number) => /^\w+\s+\w+$/.test(number);

const isValidCard = (card) =>
	isValidCardNumber(card.cardNumber) &&
	isValidExpMonth(card.expMonth) &&
	isValidExpYear(card.expYear) &&
	isValidCVC(card.cvc) &&
	isValidCardHolderName(card.cardHolderName);


class StatelessCCForm extends React.Component {
	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(newInput, name) {
		console.log('StatelessCCForm.onInputChange', newInput, name);
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
				newInputValue = Object.assign(newInputValue, { cardNumber: newInput }
				);
				break;
			case 'expMonth':
				newInputValue = Object.assign(newInputValue, { expMonth: newInput });
				break;
			case 'expYear':
				newInputValue = Object.assign(newInputValue, { expYear: newInput });
				break;
			case 'cvc':
				newInputValue = Object.assign(newInputValue, { cvc: newInput });
				break;
			case 'cardHolderName':
				newInputValue = Object.assign(newInputValue, { cardHolderName: newInput });
				break;
		}

		console.log('StatelessCCForm', newInputValue);
		onChange(newInputValue);
	}

	render() {
		const { inputValue, disabled } = this.props;
		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;
		const { onInputChange } = this;

		return (
			<form>
				<TextInput
					name="cardHolderName"
					label="Card Holder Name"
					disabled={disabled}
					inputValue={cardHolderName}
					onChange={onInputChange}
					/>
				<TextInput
					name="cardNumber"
					label="Card Number"
					disabled={disabled}
					inputValue={cardNumber}
					onChange={onInputChange}
					/>
				<TextInput
					name="expMonth"
					label="Exp. Month"
					disabled={disabled}
					inputValue={expMonth}
					isInputValid={isValidExpMonth(expMonth)}
					inputValidatorFunc={isValidExpMonth}
					onChange={onInputChange}
					size="2"
					maxlength="2"
					/>
				<TextInput
					name="expYear"
					label="Exp. Year"
					disabled={disabled}
					inputValue={expYear}
					onChange={onInputChange}
					size="4"
					maxlength="4"
					/>
				<TextInput
					name="cvc"
					label="CVC"
					disabled={disabled}
					inputValue={cvc}
					onChange={onInputChange}
					size="3"
					maxlength="3"
					/>
			</form>
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

class StatefulCCForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: props.defaultInputValue,
		};
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(newInputValue) {
		console.log('StatefulCCForm.onInputChange', newInputValue);
		this.setState({ inputValue: newInputValue });
	}

	render() {
		const { inputValue } = this.state;
		const { disabled } = this.props;
		const { onInputChange } = this;

		return (
			<div>
				<h2>Stateful!</h2>
				<StatelessCCForm
					inputValue={inputValue}
					disable={disabled}
					onChange={onInputChange}
					/>
			</div>
		);
	}
}

StatefulCCForm.propTypes = {
	defaultInputValue: PropTypes.shape({
		cardNumber: PropTypes.string,
		expMonth: PropTypes.string,
		expYear: PropTypes.string,
		cvc: PropTypes.string,
		cardHolderName: PropTypes.string,
	}),
	disabled: PropTypes.bool,
};

export default StatefulCCForm;
