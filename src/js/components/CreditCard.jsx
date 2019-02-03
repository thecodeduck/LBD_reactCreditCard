import React from 'react';
import PropTypes from 'prop-types';
import { ControlledTextInput, ControlledTextInputLabeled } from './TextInput';
import Select from './SelectInput';
import Checkbox from './Checkbox';

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
		const { inputValue, disabled, validator } = this.props;
		const { cardNumber, expMonth, expYear, cvc, cardHolderName } = inputValue;
		const { onInputChange } = this;

		const isInputValid = validator(inputValue);

		function getYear() {
			const arr = [];
			arr.push(new Date().getFullYear());
			while (arr.length < 21) {
				arr.push(arr[arr.length - 1] + 1);
			}
			return arr;
		}

		return (
			<form>
				<div className="level">
					{ isInputValid ? 'VALID!' : '' }
					<ControlledTextInputLabeled
						name="cardNumber"
						label="Card Number"
						disabled={disabled}
						inputValue={cardNumber}
						onChange={onInputChange}
						required={true}
						/>
				</div>
				<div className="level">
					<ControlledTextInputLabeled
						name="cardHolderName"
						label="Name on Card"
						disabled={disabled}
						inputValue={cardHolderName}
						isInputValid={console.log(this.name)}
						onChange={onInputChange}
						required={true}
						/>
				</div>
				<div className="level is-mobile">
						<div className="field">
							<label htmlFor="expDate" className="label">Expiration Date</label>
							<div className="field is-grouped" id="expDate">
								<Select
									name="expMonth"
									disabled={disabled}
									inputValue={expMonth}
									isInputValid={isValidExpMonth(this.inputValue)}
									onChange={onInputChange}
									ariaLabel="Card Expiration Month"
									required={true}
									options={[ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ]}
									/>
									<Select
										name="expYear"
										disabled={disabled}
										inputValue={expYear}
										onChange={onInputChange}
										ariaLabel="Card Expiration Year"
										required={true}
										options={getYear()}
										/>
							</div>
						</div>
						<ControlledTextInputLabeled
							name="cvc"
							label="CVC"
							disabled={disabled}
							inputValue={cvc}
							onChange={onInputChange}
							size="3"
							maxLength="3"
							required={true}
							/>
				</div>
				<Checkbox />
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
	validator: PropTypes.func,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

StatelessCCForm.defaultProps = {
	inputValue: {
		cardNumber: undefined,
		expMonth: '01',
		expYear: '2019',
		cvc: undefined,
		cardHolderName: undefined,
	},
	disabled: false,
	onChange: (...args) => {
		console.log('StatelessCCForm.defaultProps.onChange ', args);
	},
	validator: isValidCard,
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
