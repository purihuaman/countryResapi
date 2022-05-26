import {detailsCountry} from './components/DetailsCountry';
import {getInfo} from './components/GetCountries';
import {toggleChangeTheme} from './components/ToggleTheme';

export const loadCountries = () => {
	addEventListener('DOMContentLoaded', (e) => {
		getInfo();
		toggleChangeTheme();
		detailsCountry();
	});
};
