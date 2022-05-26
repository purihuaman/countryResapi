const modal = document.getElementById('modal');
const flagsContainer = document.getElementById('flags');
const template = document.getElementById('template').content;

export const openModal = () => {
	if (!modal || !flagsContainer) return;

	flagsContainer.addEventListener('click', (e) => {
		e.preventDefault();

		modal.classList.remove('hidden');
		const linkFlag = e.target;

		if (linkFlag.matches('a')) {
			let url = linkFlag.href;
			const dataFlag = getFlag(url);

			dataFlag.then((flag) => showModal(flag));
		}
	});

	modal.addEventListener('click', (e) => {
		const linkFlag = e.target.parentNode;
		if (e.target === modal) {
			linkFlag.url = '';
			modal.classList.add('hidden');
		}
	});
};

const getFlag = async (url) => {
	const data = await fetch(url);
	const flags = await data.json();
	return await flags;
};

const showModal = (flags) => {
	const fragment = document.createDocumentFragment();

	if (!template || !fragment || !modal) return;

	if (modal.children[0].hasChildNodes()) modal.children[0].innerHTML = '';

	const {
		name,
		flags: flag,
		population,
		region,
		subregion,
		capital,
		tld,
		currencies,
		languages,
		borders,
	} = flags[0];

	// Clear template

	template.querySelector('[data-nativename]').textContent = '';
	template.querySelector('[data-subregion]').textContent = '';
	template.querySelector('[data-tld]').textContent = '';
	template.querySelector('[data-picture]').src = '';
	template.querySelector('[data-country]').textContent = '';
	template.querySelector('[data-population]').textContent = '';
	template.querySelector('[data-region]').textContent = '';
	template.querySelector('[data-capital]').textContent = '';

	// Insert content

	template.querySelector('[data-picture]').src = flag?.png;
	template.querySelector('[data-country]').textContent = name?.common;
	template.querySelector('[data-population]').textContent = population;
	template.querySelector('[data-region]').textContent = region;
	template.querySelector('[data-capital]').textContent = capital?.[0];

	template
		.querySelector('[data-nativename]')
		.append(detailText('Native Name', name?.official));

	template
		.querySelector('[data-subregion]')
		.append(detailText('Sub Region', subregion));

	template
		.querySelector('[data-tld]')
		.append(detailText('Top Level Domain', tld));

	const cloneTemplate = document.importNode(template, true);
	fragment.appendChild(cloneTemplate);
	modal.children[0].append(fragment);
};

const detailText = (attribute, value) => {
	const text = document.createElement('span');
	const subtitle = document.createElement('b');
	const span = document.createElement('span');

	subtitle.textContent = attribute ? `${attribute}: ` : '';
	span.textContent = value;

	subtitle.className = 'flag__subtitle';

	text.append(subtitle);
	text.append(span);

	return text;
};
