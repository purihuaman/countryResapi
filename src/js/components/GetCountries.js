import {searchCountry} from './Filter.js';

const URL = 'https://restcountries.com/v3.1';

const template = document.getElementById('template').content;
const flagsContainer = document.getElementById('flags');
const filterCountry = document.getElementById('filterCountry');
const inputSearchCountry = document.getElementById('searchCountry');

const getCountries = async () => {
	try {
		const data = await fetch(`${URL}/all`);

		if (!data.ok) throw {status: data.status, statusText: data.statusText};

		const countries = await data.json();
		showCountries(countries);
		searchCountry(countries);
	} catch (error) {
		let message = error.statusText || 'Ocurrio un error';
		console.log(`${error.status}: ${message}`);
	}
};

export const showCountries = (objContries) => {
	const fragment = document.createDocumentFragment();
	if (!fragment || !template || !flagsContainer || !objContries) return;

	if (flagsContainer.hasChildNodes()) flagsContainer.innerHTML = '';

	const countries = objContries;

	countries.forEach((country) => {
		// a(href="./details.html" target='_blank').flag__link Detalles
		// template;
		// .querySelector('[data-link]')
		// .setAttribute('data-link', country?.cca3.toLowerCase());
		// template.querySelector(
		// 	'[data-link]'
		// ).href = `${URL}/name/${country.name.common.toLowerCase()}`;
		template.querySelector('[data-flag]').dataset.cca3 =
			country?.cca3.toLowerCase();
		template.querySelector('[data-picture]').src = country?.flags?.png;
		template.querySelector('[data-picture]').alt = country?.name?.common;
		template.querySelector('[data-country]').textContent =
			country?.name?.common;
		template.querySelector('[data-population]').textContent =
			country?.population;
		template.querySelector('[data-region]').textContent = country?.region;
		template.querySelector('[data-capital]').textContent =
			country?.capital?.[0];

		const cloneTemplate = document.importNode(template, true);
		fragment.appendChild(cloneTemplate);
	});

	flagsContainer.append(fragment);
};

const listCountry = (url) => {
	if (!filterCountry) return;

	filterCountry.addEventListener('change', async (e) => {
		const value = e.target.value.toLowerCase();
		const region = value === '' ? '/all' : `/region/${value}`;
		const data = await fetch(`${url}${region}`);
		const countries = await data.json();

		showCountries(countries);
		inputSearchCountry.value = '';
	});
};

listCountry(URL);

export const getInfo = () => getCountries();
