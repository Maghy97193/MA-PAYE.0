const assert=require('node:assert/strict'),Atmp=require('../dist/company-atmp.js');
const c={atmpRiskCode:'CODE-TEST',atmpRate:'6.48',atmpValidFrom:'2026-01-01',atmpValidUntil:'2026-12-31',atmpReference:'Notification de test'};
assert.equal(Atmp.validate({atmpRate:'6,48'}).atmpRate,'6.48');assert.equal(Atmp.contribution(c,'2026-10').employerRate,'6.48');assert.equal(Atmp.contribution(c,'2026-10').employeeRate,'0');assert.match(Atmp.description(c),/CODE-TEST.*6,48 %/);assert.equal(Atmp.description({}),'');assert.equal(Atmp.contribution({...c,atmpRate:'0'},'2026-10').employerRate,'0');
for(const rate of ['-1','101','abc','6.12345'])assert.throws(()=>Atmp.validate({atmpRate:rate}));
assert.throws(()=>Atmp.validate({atmpValidFrom:'2026-02-30'}));assert.throws(()=>Atmp.contribution({...c,atmpValidFrom:'2026-10-19'},'2026-10'));assert.throws(()=>Atmp.contribution({...c,atmpValidUntil:'2026-10-15'},'2026-10'));assert.throws(()=>Atmp.contribution({},'2026-10'));assert.throws(()=>Atmp.contribution(c,'2027-01'));
const old=structuredClone(c);Atmp.contribution(c,'2026-10');assert.deepEqual(c,old);
console.log('AT/MP : taux zéro, virgule, période de validité, absence de taux universel et cotisation employeur vérifiés.');
