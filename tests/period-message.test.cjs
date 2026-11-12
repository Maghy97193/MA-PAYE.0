const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('dist/btp-cotisations.js','utf8'),c);const check=c.btpDraftCheck;
assert.equal(check({cotTemplateYear:'2026',cotReviewed:'Oui'},'2026-11'),null);assert.equal(check({},'2026-11'),null);
let r=check({cotTemplateYear:'2026',cotReviewed:'À vérifier'},'2026-11');assert.equal(r.field,'cotReviewed');assert.match(r.message,/correspond au modèle/);assert.match(r.message,/choisissez « Oui »/);
r=check({cotTemplateYear:'2026',cotReviewed:'Oui'},'2027-01');assert.equal(r.field,'cotTemplateYear');assert.match(r.message,/2027-01/);assert.match(r.message,/2026/);
console.log('Le contrôle distingue période compatible non validée et véritable différence d’année.');
