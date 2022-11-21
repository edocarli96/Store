import { Languages, SchoolToPCs } from './types';

export function parseLanguage(language: string): Languages {
	if (language.toLowerCase() === 'it') {
		return Languages.IT;
	} else {
		return Languages.EN;
	}
}

export function parseFrontmatter<T extends Record<string, any>>(frontmatter: T, language: Languages): T {
	const a = copyRecord({}, frontmatter, language);
	//console.log("obj:", JSON.stringify(a), "\n\nrecord:", JSON.stringify(frontmatter))
	return a;
}

export function copyRecord<T extends Record<string, any>>(obj: any, record: T, language: Languages): T {
	const props = Object.keys(record);
	for (let i = 0; i < props.length; i++) {
		const field = props[i];
		if (typeof record[field] === 'object' && !Array.isArray(record[field])) {
			//console.log(1, " ", field, ": ", record[field]);
			obj[field] = copyRecord({}, record[field], language);
		} else if (Array.isArray(record[field])) {
			//console.log(2, " ", field, ": ", record[field]);
			if (record[field].length > 0) {
				const propsL2 = Object.keys(record[field][0]);
				if (propsL2.includes('lang')) {
					record[field].map((el: any) => {
						if (el.lang === language) {
							obj[field] = {};
							for (let e = 0; e < propsL2.length; e++) {
								obj[field][propsL2[e]] = el[propsL2[e]];
							}
						}
					});
				} else {
					obj[field] = record[field].map((element: any) => {
						return copyRecord({}, element, language);
					});
				}
			}
		} else {
			//console.log(3, " ", field, ": ", record[field]);
			obj[field] = record[field];
		}
	}
	return obj;
}

export async function getPCmap(): Promise<SchoolToPCs> {
	return {
		schools: [
			{
				school: 'ieee',
				courses: [
					{
						slug: 'info',
						course: ['Informatica 🖥', 'Computer Science 🖥'],
						desc: ['Ingegneria Informatica', 'Computer Science Engineering'],
						extra: ['Ad informatica il software più pesante, prestazionalmente, è Vivado'],
						pcs: [
							{
								name: 'MSI GF63 Thin',
								specs: [
									['Intel I7-11800H', 'Intel I7-11800H'],
									['RAM 16GB DDR4 3200MHz', 'RAM 16GB DDR4 3200MHz'],
									['Nvidia RTX 3050, 4GB GDDR6', 'Nvidia RTX 3050, 4GB GDDR6'],
									['512GB SSD M.2', '512GB SSD M.2'],
									['15.6" FHD', '15.6" FHD'],
								],
								stars: 4,
								url: 'https://www.amazon.it/MSI-11UC-1014IT-Notebook-I7-11800H-Garanzia/dp/B0B21QFNLK/',
								image: 'https://m.media-amazon.com/images/I/714ZF1iOqmL._AC_SL1500_.jpg',
								price: { value: 899.0, time: '2022-11-20T21:00:01' },
							},
						],
					},
				],
			},
			{
				school: 'design',
				courses: [
					{
						slug: 'fashion',
						course: ['Design della moda 👗', 'Fashion design 👗'],
						desc: ['Design della moda', 'Fashion design'],
						extra: [],
						pcs: [
							{
								name: '2021 Apple MacBook Pro',
								specs: [
									['14"', '14"'],
									['512GB SSD', '512GB SSD'],
									['16GB RAM', '16GB RAM'],
								],
								stars: 4,
								url: 'https://www.amazon.it/Apple-MacBook-8-core-GPU-14%E2%80%91core-512GB/dp/B09JQSRWV5/',
								image: 'https://m.media-amazon.com/images/I/61cCf94xIEL._AC_SL1500_.jpg',
								price: { value: 2069, time: '2022-11-20T21:00:00' },
							},
						],
					},
					{
						slug: 'communication',
						course: ['Design della comunicazione 📣', 'Communication design 📣'],
						desc: ['Design della comunicazione', 'Communication design'],
						extra: [],
						pcs: [
							{
								name: 'MacBook Pro 13" 2022, M2, 8GB RAM, 512GB SSD',
								specs: [
									['Buon entrylevel con performance adeguate a carichi di lavoro medi', 'Ciao'],
									['Display Retina con ottima restituzione cromatica.', ''],
									[
										'Gli 8GB di RAM sono particolarmente veloci e sufficienti alla maggior parte delle necessità, ma possono risultare stretti in caso di rendering foto/video intenso.',
										'',
									],
									['Se disponibile, valutare la configurazione con 16GB di RAM per una maggiore versatilità.', ''],
									['Ottima autonomia e portabilità', ''],
								],
								stars: 3,
								url: 'https://amzn.to/3Xj7FLJ',
								image: 'https://m.media-amazon.com/images/I/61NRYreJ2cL._AC_SL1500_.jpg',
								price: { value: 1687, time: '2022-11-21T14:00:00' },
							},
						],
					},
				],
			},
			{
				school: 'auic',
				courses: [
					{
						slug: 'todo',
						course: ['todo', 'todoE'],
						desc: ['todo', 'todoE'],
						extra: [],
						pcs: [
							{
								name: 'todo',
								specs: [
									['i500', 'i500E'],
									['182GB di RAM', 'RAME'],
								],
								stars: 4,
								url: 'https://polinetwork.org',
								image: 'https://polinetwork.org',
								price: { value: 1000, time: '' },
							},
						],
					},
				],
			},
			{
				school: 'icat',
				courses: [
					{
						slug: 'todo',
						course: ['todo', 'todoE'],
						desc: ['todo', 'todoE'],
						extra: [],
						pcs: [
							{
								name: 'todo',
								specs: [
									['i500', 'i500E'],
									['182GB di RAM', 'RAME'],
								],
								stars: 4,
								url: 'https://polinetwork.org',
								image: 'https://polinetwork.org',
								price: { value: 1000, time: '' },
							},
						],
					},
				],
			},
		],
	};
}
