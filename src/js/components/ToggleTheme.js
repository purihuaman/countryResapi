const rootStyle = document.documentElement.style;
const toggleTheme = document.getElementById('toggleTheme');
const toggleIcon = document.getElementById('toggleIcon');
const toggleText = document.getElementById('toggleText');

// Light
const lightTheme = {
	'--first-bg': 'var(--first-grey)',
	'--second-bg': 'var(--second-grey)',
	'--thrid-bg': 'var(--thrid-grey)',
	'--color-text': 'var(--text-color)',
};

// Dark
const darkTheme = {
	'--first-bg': 'var(--dark-first)',
	'--second-bg': 'var(--dark-second)',
	'--color-text': 'var(--second-grey)',
};

const changeTheme = (theme) => {
	const cssVars = Object.keys(theme);
	for (const cssVar of cssVars) {
		rootStyle.setProperty(cssVar, theme[cssVar]);
	}
};

export const toggleChangeTheme = () => {
	if (!toggleTheme || !toggleIcon || !toggleText) return;

	toggleTheme.addEventListener('click', (e) => {
		if (toggleIcon.classList.contains('ri-moon-fill')) {
			toggleIcon.classList.replace('ri-moon-fill', 'ri-sun-fill');
			toggleText.textContent = 'Ligth Mode';
			changeTheme(lightTheme);
		} else {
			toggleText.textContent = 'Dark Mode';
			toggleIcon.classList.replace('ri-sun-fill', 'ri-moon-fill');
			changeTheme(darkTheme);
		}
	});
};
