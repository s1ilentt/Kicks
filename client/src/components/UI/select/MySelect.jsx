import React from 'react';
import Select from 'react-select';
import styles from './MySelect.module.scss';
import chroma from 'chroma-js';

const MySelect = ({ selectedOption, setSelectedOption, optionsArray = [], notIdValue = false, color = false, className = '' }) => {
	const options = optionsArray.map(option => ({
		value: notIdValue ? option : option.id,
		label: notIdValue ? option : option.name,
	}));

	const formatString = function (str) {
		let formattedStr = str.replace(/[A-Z]/g, match => {
			return ' ' + match.toLowerCase();
		});
		return formattedStr.trim();
	}

	const coloOptions = color ?
		optionsArray.map(option => ({
			value: notIdValue ? option : option.id,
			label: notIdValue ? formatString(option) : option.name,
			color: option
		}))
		:
		null;

	// We find an object by Value for transmitting the Select component in `value` props
	const value = options.find(option => option.value === selectedOption);

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			border: state.isFocused ? '1px solid white' : '1px solid rgb(150, 150, 150)',
			borderRadius: '8px',
			padding: '5px 8px',
			':hover': {
				border: state.isFocused ? '1px solid white' : '1px solid black',
			},
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? 'rgb(180, 180, 180)' : 'white',
			color: 'black',
			':active': {
				backgroundColor: 'white',
			},
			':hover': {
				backgroundColor: state.isSelected ? 'rgb(180, 180, 180)' : 'rgb(225, 225, 225)',
			},
		}),
	};

	const dot = (color = value ? value.label : 'transperent') => ({
		alignItems: 'center',
		display: 'flex',

		':before': {
			backgroundColor: color,
			borderRadius: '50%',
			content: '" "',
			display: 'block',
			marginRight: 8,
			height: 10,
			width: 10,
		},
	});

	const colorStyles = {
		control: (styles, state) => ({
			...styles,
			backgroundColor: 'white',
			borderRadius: '8px',
			padding: '5px 8px',
			border: state.isFocused ? '1px solid white' : '1px solid rgb(150, 150, 150)',
			':hover': {
				border: state.isFocused ? '1px solid white' : '1px solid black',
			},
		}),
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			const color = chroma(data.color);
			return {
				...styles,
				backgroundColor: isDisabled
					? undefined
					: isSelected
						? data.color
						: isFocused
							? color.alpha(0.1).css()
							: undefined,
				color: isDisabled
					? '#ccc'
					: isSelected
						? chroma.contrast(color, 'white') > 2
							? 'white'
							: 'black'
						: data.color,
				cursor: isDisabled ? 'not-allowed' : 'default',

				':active': {
					...styles[':active'],
					backgroundColor: !isDisabled
						? isSelected
							? data.color
							: color.alpha(0.3).css()
						: undefined,
				},
			};
		},
		input: (styles) => ({ ...styles, ...dot() }),
		placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
		singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
	};

	const handleChange = (option) => {
		setSelectedOption(option.value);
	}

	return (
		<Select
			className={`${styles.select} ${className}`}
			value={value}
			onChange={handleChange}
			options={color ? coloOptions : options}
			styles={color ? colorStyles : customStyles}
		/>
	);
}

export default MySelect;