const assert=require('node:assert/strict'),{audit,inPeriod}=require('../dist/dsn-preparation.js');
const company={id:'c',name:'Entreprise fictive',siret:'00000000000000',address:'Adresse fictive',ape:'4333Z',idcc:'1596'};
const person={id:'p',company:'c',name:'Salarié A',startDate:'2026-10-19',endDate:'2026-11-19',contract:'CDD'};
const db={companies:[company],people:[person,{...person,id:'future',startDate:'2026-11-01'},{...person,id:'past',startDate:'2026-01-01',actualEndDate:'2026-09-30'}],bulletins:[{id:'old',company:'c',personId:'p',period:'2026-10',result:{gross:848.66}},{id:'new',company:'c',personId:'p',period:'2026-10',result:{gross:861.70},revises:'old'}]};
const copy=JSON.stringify(db),a=audit(db,'c','2026-10');assert.equal(a.employees.length,1);assert.equal(a.selectedCount,0);assert.equal(a.employees[0].documents.length,2);assert.equal(a.canGenerate,false);assert.equal(JSON.stringify(db),copy);
db.dsnPreparation={'c|2026-10':{selected:{p:'new'},documents:{referencePayroll:'Reçu'}}};const b=audit(db,'c','2026-10');assert.equal(b.selectedCount,1);assert.equal(b.employees[0].selected.gross,861.70);assert.equal(b.documents[0].status,'Reçu');assert.equal(b.canGenerate,false);
db.dsnPreparation['c|2026-10'].selected.p='missing';assert.equal(audit(db,'c','2026-10').selectedCount,0);
assert.throws(()=>audit(db,'c','2026-13'));assert.throws(()=>audit(db,'absent','2026-10'));assert.equal(inPeriod({...person,actualEndDate:'2026-10-01'},'2026-10'),true);
console.log('DSN : entrée au 19 octobre incluse, périodes isolées, sélection explicite des révisions et absence de validation automatique vérifiées.');
