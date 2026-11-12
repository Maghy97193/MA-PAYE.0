const assert=require('node:assert/strict');const {calculate}=require('../dist/payroll-engine.js');
const base={base:'2000',bonus:'100',absenceDeduction:'50',hourlyRate:'10',extraHours1:'4',extraHours2:'2',multiplier1:'1.25',multiplier2:'1.5',mealQty:'10',mealUnit:'12',mealTaxable:'20',travel:'50',travelTaxable:'10',transport:'30',advance:'100',otherDeduction:'10',taxableNet:'1900',socialNet:'1800',pasRate:'5',rows:[{label:'Cotisation fictive A',baseMode:'gross',base:'0',employeeRate:'10',employerRate:'20'},{label:'Cotisation fictive B',baseMode:'manual',base:'1000',employeeRate:'2',employerRate:'3'}]};
let r=calculate(base);assert.equal(r.gross,2160);assert.equal(r.employee,236);assert.equal(r.employer,462);assert.equal(r.reimburse,170);assert.equal(r.netBefore,1984);assert.equal(r.pas,95);assert.equal(r.net,1889);assert.equal(r.cost,2792);assert.equal(r.social,1800);
assert.throws(()=>calculate({...base,mealTaxable:'121'}),/part soumise/);assert.throws(()=>calculate({...base,absenceDeduction:'99999'}),/absence/);assert.throws(()=>calculate({...base,pasRate:'101'}),/taux/);assert.throws(()=>calculate({...base,bonus:'NaN'}),/invalide/);assert.throws(()=>calculate({...base,advance:'99999'}),/retenues/);assert.equal(calculate({...base,rows:[],socialNet:''}).social,null);
// Exact half-cent rounds upward, separately for each contribution.
let cent=calculate({...base,base:'0.05',bonus:'0',absenceDeduction:'0',extraHours1:'0',extraHours2:'0',mealQty:'0',mealTaxable:'0',travel:'0',travelTaxable:'0',transport:'0',advance:'0',otherDeduction:'0',taxableNet:'0',pasRate:'0',rows:[{label:'Test centime',baseMode:'gross',employeeRate:'10',employerRate:'10'}]});assert.equal(cent.employee,.01);assert.equal(cent.net,.04);
console.log('8 scénarios de calcul et de rejet vérifiés.');

let triple=calculate({...base,hoursLines:[{label:'HS +25 %',hours:'4',rate:'10',multiplier:'1.25'},{label:'HS +50 %',hours:'2',rate:'10',multiplier:'1.5'},{label:'HS +100 %',hours:'3',rate:'10',multiplier:'2'}]});assert.equal(triple.gross,2220);assert.equal(triple.hours[2].amount,60);
let benefit=calculate({...base,advantages:'100'});assert.equal(benefit.gross,2260);assert.equal(benefit.netBefore,1974);
let noDoubleCount=calculate({...base,hoursLines:[],extraHours1:'100'});assert.equal(noDoubleCount.gross,2080);
assert.throws(()=>calculate({...base,hoursLines:[{label:'Invalid',hours:'1',rate:'10',multiplier:'100'}]}),/Coefficient/);
assert.throws(()=>calculate({...base,rows:[{label:'X',baseMode:'unknown',employeeRate:0,employerRate:0}]}),/assiette/);
console.log('HS 25/50/100, avantages, absence de double comptage et validations supplémentaires vérifiés.');
