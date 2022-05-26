const linkContry = document.querySelector('[data-link]');
const containerFlags = document.getElementById('flags');

const getDetailsCountry = async (url) => {
	try {
		const data = await fetch(url);

		if (!data.ok) throw {status: data.status, statusText: data.statusText};

		const countries = await data.json();

		showDetails(countries[0]);
	} catch (error) {
		let message = error.statusText || 'Ocurrio un error';
		console.log(`${error.status}: ${message}`);
	}
};

const showDetails = (data) => {
	console.log(data);
	// const fragment = document.createDocumentFragment();
	// if (!fragment || !template || !flagsContainer || !objContries) return;

	// if (flagsContainer.hasChildNodes()) flagsContainer.innerHTML = '';

	// console.log(data);

	// const countries = objContries;

	// countries.forEach((country) => {
	// template
	// 	.querySelector('[data-link]')
	// 	.setAttribute('data-link', country?.cca3.toLowerCase());
	// template.querySelector(
	// 	'[data-link]'
	// ).href = `${URL}/name/${country.name.common.toLowerCase()}`;
	// template.querySelector('[data-flag]').dataset.cca3 =
	// 	country?.cca3.toLowerCase();
	// template.querySelector('[data-picture]').src = country?.flags?.png;
	// template.querySelector('[data-picture]').alt = country?.name?.common;
	// template.querySelector('[data-country]').textContent =
	// 	country?.name?.common;
	// template.querySelector('[data-population]').textContent =
	// 	country?.population;
	// template.querySelector('[data-region]').textContent = country?.region;
	// template.querySelector('[data-capital]').textContent =
	// 	country?.capital?.[0];

	// const cloneTemplate = document.importNode(template, true);
	// fragment.appendChild(cloneTemplate);
	// });

	// flagsContainer.append(fragment);
};

export const detailsCountry = () => {
	containerFlags.addEventListener('click', (e) => {
		e.preventDefault();
		const cardCountry = document.querySelector(
			`[data-link=${e.target.dataset.link}]`
		);

		if (e.target !== cardCountry) return;

		// getDetailsCountry(e.target.href);
		console.log(e.target.href);
	});
};
