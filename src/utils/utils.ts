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
								url: 'https://www.amazon.it/MSI-11UC-1224IT-Notebook-I7-11800H-Garanzia/dp/B09PLNW8KP',
								image: 'https://m.media-amazon.com/images/I/71yxQ9XaIwL._AC_SL1500_.jpg',
								price: { value: 999.0, time: '2022-11-24T17:00:00' },
								complete:true
							},
						],
					},
					{
						slug: 'management',
						course: ['Gestionale 📊', 'Management 📊'],
						desc: ['Ingegneria Gestionale', 'Management Engineering'],
						extra: [],
						pcs: [
							{
								name: 'Acer Aspire 3 A315-58-56LW',
								specs: [
									['Intel Core i5-1135G7', 'Intel Core i5-1135G7'],
									['RAM 8 GB DDR4 2.4 GHz', 'RAM 8 GB DDR4 2.4 GHz'],
									['Intel Iris Xe, 4GB GDDR6', 'Intel Iris Xe, 4GB GDDR6'],
									['512 GB PCIe NVMe SSD', '512 GB PCIe NVMe SSD'],
									['15.6" FHD', '15.6" FHD'],
								],
								stars: 3,
								url: 'https://amzn.eu/d/c5lTsEg',
								image: 'https://m.media-amazon.com/images/I/81R86aeUJpL._AC_SX679_.jpg',
								price: { value: 459.0, time: '2022-11-22T19:00:01' },
								complete: true
							},
						],
					},
					{
						slug: 'aerospace, energy, mechanical',
						course: ['Aerospaziale, Energetica, Meccanica 🚀🛠', 'Aerospace, Energy, Mechanical 🚀🛠'],
						desc: ['Ingegneria Aerospaziale, Energetica, Meccanica', 'Aerospace, Energy, Mechanical Engineering'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
							},
						],
					},
					{
						slug: 'biomedical',
						course: ['Biomedica 🧬', 'Biomedical 🧬'],
						desc: ['Ingegneria Biomedica', 'Biomedical Engineering'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
							},
						],
					},
					{
						slug: 'electrical',
						course: ['Elettrica 💡', 'ELectrical 💡'],
						desc: ['Ingegneria Elettrica', 'Electrical Engineering'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
							},
						],
					},
					{
						slug: 'electronics',
						course: ['Elettronica 🔌', 'ELectronics 🔌'],
						desc: ['Ingegneria Elettronica', 'Electronics Engineering'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
							},
						],
					},
					{
						slug: 'physics',
						course: ['Fisica 🧲', 'Physics 🧲'],
						desc: ['Ingegneria Fisica', 'Physics Engineering'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
							},
						],
					},
					{
						slug: 'mathematical',
						course: ['Matematica 🧮', 'Mathematical 🧮'],
						desc: ['Ingegneria Matematica', 'Mathematical Engineering'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
							},
						],
					},
					{
						slug: 'chemical',
						course: ['Chimica ⚗️', 'Chemical ⚗️'],
						desc: ['Ingegneria Chimica', 'Chemical Engineering'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
							},
						],
					},
					{
						slug: 'mat&nano',
						course: ['Mat&Nano 🔬', 'Mat&Nano 🔬'],
						desc: ['Ingegneria dei Materiali e delle Nanotecnologie', 'Materials Engineering and Nanotechnology'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
							},
						],
					},
					{
						slug: 'automation',
						course: ['Automazione  🤖', 'Automation  🤖'],
						desc: ['Ingegneria dell" automazione', 'Automation Engineering'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
							},
						],
					},
					{
						slug: 'industrial production',
						course: ['Produzione Industriale 🏭', 'Industrial Production  🏭'],
						desc: ['Ingegneria della produzione industriale', 'Industrial Production Engineering'],
						extra: [],
						pcs: [
							{
								name: ' ',
								specs: [
									['processore', 'processore'],
									['RAM', 'RAM '],
									['scheda grafica', 'scheda grafica'],
									['SSD', 'SSD'],
									['schermo', 'schermo'],
								],
								stars: 3,
								url: 'link',
								image: 'foto',
								price: { value: 0.0, time: '2022-11-22T19:00:01' },
								complete: false
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
								complete: true
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
									['Buon entrylevel con performance adeguate a carichi di lavoro medi', ''],
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
								price: { value: 1687.64, time: '2022-11-21T14:00:00' },
								complete: true
							},
							{
								name: 'MacBook Pro 14" 2021, M1 Pro, CPU 8-core, GPU 14-core, 16GB RAM, 512GB SSD',
								specs: [
									[
										'Midrange con performance adeguate a carichi di lavoro medio-alti, inclusi rendering foto/video e 3D moderati.',
										'',
									],
									['Display XDR OLED (P3-1600 nit) con la migliore restituzione cromatica su computer laptop.', ''],
									['Ottima autonomia e portabilità', ''],
								],
								stars: 3.5,
								url: 'https://amzn.to/3VhxSIy',
								image: 'https://m.media-amazon.com/images/I/61vFO3R5UNL._AC_SL1500_.jpg',
								price: { value: 2069.0, time: '2022-11-21T14:00:00' },
								complete: true
							},
							{
								name: 'MacBook Pro 16" 2021, M1 Pro, CPU 10-core, GPU 16-core, 16GB RAM, 512GB SSD',
								specs: [
									[
										'Ottimo midrange con performance adeguate a carichi di lavoro alti, inclusi rendering foto/video e 3D intensi.',
										'',
									],
									['Display XDR OLED (P3-1600 nit) con la migliore restituzione cromatica su computer laptop.', ''],
									['Ottima autonomia e portabilità', ''],
								],
								stars: 4,
								url: 'https://amzn.to/3OqKACA',
								image: 'https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_SL1500_.jpg',
								price: { value: 2539.99, time: '2022-11-21T14:00:00' },
								complete: true
							},
							{
								name: 'MacBook Pro 16" 2021, M1 Max, CPU 10-core, GPU 32-core, 32GB RAM, 1TB SSD',
								specs: [
									[
										'Top di gamma con performance adeguate a carichi di lavoro altissimi, per un utilizzo prevalente in campo video e 3D.',
										'',
									],
									['Display XDR OLED (P3-1600 nit) con la migliore restituzione cromatica su computer laptop.', ''],
									['Ottima autonomia e portabilità', ''],
								],
								stars: 4.5,
								url: 'https://amzn.to/3TTUCNU',
								image: 'https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_SL1500_.jpg',
								price: { value: 3699.28, time: '2022-11-21T14:00:00' },
								complete: true
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
								complete: false
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
								complete: false
							},
						],
					},
				],
			},
		],
	};
}
