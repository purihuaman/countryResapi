import {getInfo} from './components/GetCountries';
import {openModal} from './components/Modal';
import {toggleChangeTheme} from './components/ToggleTheme';

export const loadCountries = () => {
	addEventListener('DOMContentLoaded', (e) => {
		getInfo();
		toggleChangeTheme();
		openModal();
	});
};
