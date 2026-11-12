/* Deterministic arithmetic for TEST bulletins; no statutory contribution tables. */
(function(root){'use strict';
function dec(value,scale=2){const s=String(value??'').trim().replace(',','.');if(!/^\d+(\.\d+)?$/.test(s))throw Error('Montant ou taux invalide : '+s);let[a,b='']=s.split('.');if(b.length>scale&&/[1-9]/.test(b.slice(scale)))throw Error('Trop de décimales : '+s);const n=BigInt(a)*10n**BigInt(scale)+BigInt(b.slice(0,scale).padEnd(scale,'0'));if(n>1000000000000n)throw Error('Valeur hors limite');return n}
const round=(n,d)=>(n+d/2n)/d,euro=n=>Number(n)/100;
const product=(q,p)=>round(dec(q)*dec(p,4),10000n);
function percent(base,rate){const r=dec(rate,4);if(r>1000000n)throw Error('Un taux doit être compris entre 0 et 100 %');return round(base*r,1000000n)}
function calculate(v){
const base=dec(v.base),bonus=dec(v.bonus),absence=dec(v.absenceDeduction),advantages=dec(v.advantages||0),extraGross=dec(v.extraGross||0);
let input=v.hoursLines||[{label:'HS tranche 1',hours:v.extraHours1,rate:v.hourlyRate,multiplier:v.multiplier1},{label:'HS tranche 2',hours:v.extraHours2,rate:v.hourlyRate,multiplier:v.multiplier2}];
if(!Array.isArray(input)||input.length>100)throw Error('Liste d’heures invalide');
const hours=input.map(h=>{const multiplier=dec(h.multiplier,4);if(multiplier>100000n)throw Error('Coefficient horaire hors limite');return{...h,amount:euro(round(dec(h.hours)*dec(h.rate,4)*multiplier,100000000n))}}),extra=hours.reduce((s,h)=>s+dec(h.amount),0n);
const panier=product(v.mealQty,v.mealUnit),panierTax=dec(v.mealTaxable),travel=dec(v.travel),travelTax=dec(v.travelTaxable);
if(panierTax>panier||travelTax>travel)throw Error('La part soumise ne peut pas dépasser le montant versé.');
const gross=base+bonus+extra-absence+panierTax+travelTax+advantages+extraGross;if(gross<0n)throw Error('La retenue pour absence dépasse les éléments bruts.');
if(!Array.isArray(v.rows)||v.rows.length>100)throw Error('Liste de cotisations invalide');
const rows=v.rows.map(r=>{if(!String(r.label||'').trim())throw Error('Libellé de cotisation manquant');if(!['gross','manual'].includes(r.baseMode))throw Error('Type d’assiette invalide');const b=r.baseMode==='gross'?gross:dec(r.base);return{label:r.label,base:euro(b),employeeRate:r.employeeRate,employerRate:r.employerRate,employee:euro(percent(b,r.employeeRate)),employer:euro(percent(b,r.employerRate))}});
const employee=rows.reduce((s,r)=>s+dec(r.employee),0n),employer=rows.reduce((s,r)=>s+dec(r.employer),0n),reimburse=panier-panierTax+travel-travelTax+dec(v.transport),advance=dec(v.advance),other=dec(v.otherDeduction),netBefore=gross-employee+reimburse-advance-other-advantages;
if(netBefore<0n)throw Error('Les retenues dépassent le net disponible.');
const taxable=dec(v.taxableNet),pas=percent(taxable,v.pasRate);if(pas>netBefore)throw Error('Le PAS dépasse le net disponible.');
const social=v.socialNet===''?null:euro(dec(v.socialNet));
return{base:euro(base),bonus:euro(bonus),absence:euro(absence),advantages:euro(advantages),extraGross:euro(extraGross),hours,extra1:hours[0]?.amount||0,extra2:hours[1]?.amount||0,meal:euro(panier),mealTaxable:euro(panierTax),travel:euro(travel),travelTaxable:euro(travelTax),gross:euro(gross),rows,employee:euro(employee),employer:euro(employer),reimburse:euro(reimburse),advance:euro(advance),other:euro(other),netBefore:euro(netBefore),taxable:euro(taxable),pas:euro(pas),net:euro(netBefore-pas),social,cost:euro(gross+employer+reimburse)};
}
const api={calculate,moneyTotal:values=>euro(values.reduce((s,v)=>s+dec(v),0n)),percentageAmount:(value,rate)=>euro(percent(dec(value),rate)),version:'0.3-test-arithmetic'};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.PayrollTest=api;
})(typeof globalThis!=='undefined'?globalThis:this);
