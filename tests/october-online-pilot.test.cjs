const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const Pilot=require('../dist/october-pilot.js'),T=require('../dist/time-tracking.js'),engine=require('../dist/payroll-engine.js');
global.PayrollTest=engine;
global.PayrollTest=engine;global.LeaveBalances=require('../dist/leave-balances.js');
const A=require('../dist/payroll-automation-core.js'),D=require('../dist/dsn-preparation.js'),PDF=require('../dist/payroll-pdf.js');
const ratesContext={};vm.createContext(ratesContext);vm.runInContext(fs.readFileSync('dist/btp-cotisations.js','utf8'),ratesContext);
test('EBS en ligne : renommer uniquement la société de démonstration, conserver les autres données',()=>{
 const db={companies:[{id:'a',name:'Atelier Horizon · BTP',address:'Adresse déjà saisie'}],people:[{id:'existing',name:'Dossier conservé'}],vars:{existing:{base:'999'}},bulletins:[{id:'original'}]};
 const result=Pilot.install(db,T,'2026-11-14T20:00:00Z');assert.equal(result.changed,true);assert.equal(db.companies[0].name,'EBS RENOV’');assert.equal(db.companies[0].address,'Adresse déjà saisie');assert.equal(db.vars.existing.base,'999');assert.equal(db.bulletins[0].id,'original');
 const key='a|2026-10|'+Pilot.personId;assert.equal(db.vars[key].baseMode,'Horaire');assert.equal(db.vars[key].base,'861.70');assert.equal(db.vars[key].taxableNet,undefined);
 db.vars[key].notes='Note utilisateur';assert.equal(Pilot.install(db,T,'2026-11-15T20:00:00Z').changed,false);assert.equal(db.vars[key].notes,'Note utilisateur');assert.equal(db.people.length,2);
 const rows=Object.fromEntries(T.dates('2026-10').map(d=>[d,db.timeEntries['a|'+Pilot.personId+'|'+d]]));assert.equal(T.summarize('2026-10',db.people[1],rows).totals.worked,70);
});
test('EBS en ligne : ne pas renommer une entreprise personnalisée ni conserver un code risque fictif',()=>{
 const custom={companies:[{id:'a',name:'Entreprise personnalisée'}],people:[],vars:{}};const added=Pilot.install(custom,T,'2026-11-14T20:00:00Z');assert.equal(custom.companies[0].name,'Entreprise personnalisée');assert.notEqual(added.companyId,'a');
 const seeded={companies:[{id:'a',name:'Atelier Horizon · BTP',atmpRiskCode:'CODE-TEST',atmpRate:'6.48'}],people:[],vars:{}};Pilot.install(seeded,T,'2026-11-14T20:00:00Z');assert.equal(seeded.companies[0].atmpRiskCode,'454LE');assert.equal(seeded.companies[0].atmpRate,'6.16');assert.equal(seeded.companies[0].atmpValidFrom,'2026-01-01');
});
test('Simulation technique : cotisations arrondies, nets provisoires, PDF et DSN de préparation',()=>{
 const rows=Pilot.referenceRows('861.70',engine);assert.equal(rows.find(r=>r.label.startsWith('CIBTP')).employeeRate,'0');assert.equal(rows.find(r=>r.label.startsWith('CIBTP')).employerRate,'19.600');
 const plan=Object.fromEntries(Array.from({length:7},(_,i)=>['cpPlan'+i,i>0&&i<6?'7':'0']));const pres=A.presence({...plan,leaveEmploymentStart:'2026-10-19',leaveEmploymentEnd:'2026-11-15'},'2026-10');
 const acquisition=A.acquisition({leaveAcquisitionMode:'Automatique',leaveWorkedPercent:pres.percent,leaveN:'0',cpUnit:'Ouvrables'});
 const variables={baseMode:'Horaire',hours:'70',hourlyRate:'12.31',base:'861.70',mealQty:'0',mealUnit:'0',navigoPrice:'0',urbanTransport:'0',pasRate:'0',leaveN1:'16',leaveN:'0',leaveTakenN1:'0',leaveTakenN:'0',leaveAcquiredMonth:String(acquisition),cpDays:'0',cpUnit:'Ouvrables'};
 const input={base:'861.70',bonus:'0',absenceDeduction:'0',hoursLines:[],mealQty:'0',mealUnit:'0',mealTaxable:'0',travel:'0',travelTaxable:'0',transport:'0',advance:'0',otherDeduction:'0',taxableNet:'0',socialNet:'',pasRate:'0',rows:[],ceiling:'4005'};
 const simulated=Pilot.simulation(variables,input,rows,engine);assert.equal(simulated.result.gross,861.70);assert.ok(simulated.result.employee>0);assert.equal(simulated.result.pas,0);assert.equal(simulated.result.net,Number((861.70-simulated.result.employee).toFixed(2)));assert.equal(variables.taxableNet,undefined);assert.equal(simulated.variables.cotReviewed,'À vérifier');assert.equal(global.LeaveBalances.calculate(simulated.variables).balance,17.25);assert.equal(simulated.technicalPilot,true);
 const atmp=simulated.result.rows.find(r=>r.label.startsWith('Accident du travail'));assert.equal(atmp.employee,0);assert.equal(atmp.employer,53.08);
 const cibtp=simulated.result.rows.find(r=>r.label.startsWith('CIBTP'));assert.equal(cibtp.employee,0);assert.equal(cibtp.employer,168.89);
 assert.equal(simulated.result.employee,179.58);assert.equal(simulated.result.employer,583.00);
 const meals=Pilot.simulation({...variables,mealQty:'10',mealUnit:'10.40'},{...input,mealQty:'10',mealUnit:'10.40'},rows,engine);
 assert.equal(meals.result.meal,104);assert.equal(meals.result.gross,861.70);assert.equal(meals.result.net,786.12);assert.equal(meals.result.social,682.12);assert.equal(meals.result.taxable,706.67);
 const doc={id:Pilot.documentId,company:'a',personId:Pilot.personId,period:'2026-10',paymentDate:'2026-11-05',createdAt:'2026-11-14T20:00:00Z',engine:engine.version,person:{id:Pilot.personId,company:'a',name:'Salarié TEST',job:'Ouvrier',contract:'CDD',startDate:'2026-10-19'},employer:{id:'a',name:'EBS RENOV’'},variables:simulated.variables,result:simulated.result,technicalPilot:true,simulationAssumptions:simulated.assumptions,issues:simulated.assumptions};
 const pdf=PDF.build(doc);assert.ok(pdf.startsWith('%PDF-1.4'));assert.match(pdf,/%EOF/);
 const db={companies:[doc.employer],people:[doc.person],bulletins:[doc],dsnPreparation:{'a|2026-10':{selected:{[Pilot.personId]:doc.id}}}};const dsn=D.audit(db,'a','2026-10');assert.equal(dsn.selectedCount,1);assert.equal(dsn.employees[0].selected.gross,861.70);assert.equal(dsn.canGenerate,false);
 console.log(JSON.stringify({gross:simulated.result.gross,employee:simulated.result.employee,employer:simulated.result.employer,netTechnical:simulated.result.net,taxableTechnical:simulated.result.taxable,pas:simulated.result.pas,leave:acquisition}));
});
test('AT/MP : la fiche entreprise est prioritaire, avec taux zéro et période contrôlée',()=>{
 const company={atmpRate:'6,16',atmpValidFrom:'2026-01-08',atmpRiskCode:'RISQUE'};
 assert.equal(Pilot.companyAtmp(company,'2026-10').employerRate,'6.16');
 assert.equal(Pilot.companyAtmp({...company,atmpRate:'0'},'2026-10').employerRate,'0');
 assert.equal(Pilot.companyAtmp({...company,atmpRate:'7.25'},'2026-10').employerRate,'7.25');
 assert.throws(()=>Pilot.companyAtmp(company,'2026-01'));
 assert.throws(()=>Pilot.companyAtmp({...company,atmpValidUntil:'2026-10-15'},'2026-10'));
 const db={companies:[{id:'a',name:'EBS RENOV’',...company}],people:[],vars:{}};
 Pilot.install(db,T,'2026-11-14T20:00:00Z');assert.equal(db.companies[0].atmpRate,'6,16');assert.equal(db.companies[0].atmpValidFrom,'2026-01-08');
});
