import {showCountries} from './GetCountries.js';

const formFilter = document.getElementById('formFilter');

export const searchCountry = (countries) => {
	if (!formFilter) return;

	formFilter.addEventListener('keyup', (e) => {
		e.preventDefault();
		let textContent = e.target.value.toLowerCase();

		const countrys = countries.filter((country) => {
			const countryApi = country?.name?.common.toLowerCase();
			if (countryApi.indexOf(textContent) !== -1) {
				return country;
			}
		});

		showCountries(countrys);
	});
};
