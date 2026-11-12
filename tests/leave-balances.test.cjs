const assert=require('node:assert/strict'),{calculate}=require('../dist/leave-balances.js');
let v={leaveN1:'25',leaveN:'10',leaveTakenN1:'20',leaveTakenN:'2',leaveAcquiredMonth:'2.5',cpDays:'7'};
let b=calculate(v);assert.deepEqual(b,{n1:25,n:12.5,takenN1:25,takenN:4,monthTaken:7,taken:29,balanceN1:0,balanceN:8.5,balance:8.5,excess:0});
assert.equal(calculate({...v,cpDays:'1.25'}).balance,14.25);assert.equal(calculate({...v,cpDays:'20'}).excess,4.5);assert.equal(calculate({cpDays:'5'}),null);assert.equal(calculate({...v,leaveN1:'',leaveN:''}),null);assert.throws(()=>calculate({...v,leaveTakenN1:'26'}));assert.throws(()=>calculate({...v,leaveN:'-1'}));assert.throws(()=>calculate({...v,cpDays:'1.0000001'}));
const prior=calculate(v);const next={leaveN1:prior.n1,leaveN:prior.n,leaveTakenN1:prior.takenN1,leaveTakenN:prior.takenN,cpDays:0};assert.equal(calculate(next).balance,8.5);assert.equal(calculate(next).taken,29);
assert.deepEqual(calculate({...v,cpMode:'Caisse CIBTP'}),b);console.log('Compteurs N−1/N, ordre d’imputation, fractions de jour, reprise sans double décompte, champs absents et dépassements vérifiés.');
