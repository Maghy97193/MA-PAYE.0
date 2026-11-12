/* Curated identification catalogue, not a regulatory payroll rule engine. */
(function(root){'use strict';
const catalog=[
['1596','Bâtiment — ouvriers, entreprises jusqu’à 10 salariés','Bâtiment','CAPEB FFB construction ouvrier petite entreprise'],
['1597','Bâtiment — ouvriers, entreprises de plus de 10 salariés','Bâtiment','FFB construction ouvrier grande entreprise'],
['2609','Bâtiment — employés, techniciens et agents de maîtrise (ETAM)','Bâtiment','construction administratif technicien'],
['2420','Bâtiment — cadres','Bâtiment','construction encadrement'],
['1702','Travaux publics — ouvriers','Travaux publics','TP chantier infrastructure'],
['2614','Travaux publics — employés, techniciens et agents de maîtrise (ETAM)','Travaux publics','TP administratif technicien'],
['3212','Travaux publics — cadres','Travaux publics','TP encadrement'],
['1518','ÉCLAT — éducation, culture, loisirs et animation','Associations et accompagnement','association utilité sociale environnementale CEAD'],
['1261','ALISFA — acteurs du lien social et familial','Associations et accompagnement','centres sociaux socioculturels jeunes enfants association'],
['2941','Aide, accompagnement, soins et services à domicile (BAD)','Associations et accompagnement','aide domicile accompagnement soins'],
['1486','Bureaux d’études techniques, ingénieurs-conseils et sociétés de conseils (Syntec)','Services et formation','informatique logiciel conseil ingénierie'],
['1516','Organismes de formation','Services et formation','formation professionnelle enseignement'],
['3043','Entreprises de propreté et services associés','Services et formation','nettoyage entretien propreté'],
['1979','Hôtels, cafés, restaurants (HCR)','Hôtellerie et restauration','hôtel restauration café tourisme'],
['2216','Commerce de détail et de gros à prédominance alimentaire','Commerce','supermarché hypermarché alimentation distribution']
].map(([idcc,name,sector,keywords])=>({idcc,name,sector,keywords,checkedAt:'2026-11-12'}));
const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
function find(value){const s=String(value??'').trim(),m=/^(?:IDCC\s*)?(\d{1,4})(?:\s*(?:[—–:-]|$))/i.exec(s);return m?catalog.find(c=>c.idcc===m[1].padStart(4,'0'))||null:null;}
function search(value){const tokens=normalize(value).split(/\s+/).filter(Boolean);return catalog.filter(c=>tokens.every(t=>normalize([c.idcc,c.name,c.sector,c.keywords].join(' ')).includes(t)));}
function display(value){const c=find(value);return c?'IDCC '+c.idcc+' — '+c.name:String(value??'');}
const api={catalog,find,search,display};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.Conventions=api;
})(typeof globalThis!=='undefined'?globalThis:this);
