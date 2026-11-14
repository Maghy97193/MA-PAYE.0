// Recette anonymisée : aucune identité, adresse ni donnée bancaire réelle.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
global.PayrollTest=require('../dist/payroll-engine.js');
global.LeaveBalances=require('../dist/leave-balances.js');
const T=require('../dist/time-tracking.js');
const I=require('../dist/time-import.js');
const A=require('../dist/payroll-automation-core.js');
const S=require('../dist/salary-proration.js');
const D=require('../dist/dsn-preparation.js');
const plan=Object.fromEntries(Array.from({length:7},(_,i)=>['cpPlan'+i,i>0&&i<6?'7':'0']));
const person={id:'pilot-october',company:'pilot',name:'Cas octobre TEST',matricule:'TEST-OCT',startDate:'2026-10-19',endDate:'2026-11-15',contract:'CDD',workMode:'Temps plein',hours:151.67,job:'Ouvrier exécutant',classification:'OE1',cddReason:'Accroissement temporaire d’activité'};
const imported=I.map(I.csv(fs.readFileSync(__dirname+'/fixtures/october-pilot-hours.csv','utf8')));
const retained=require('./fixtures/october-pilot-payroll.json');

test('Choix utilisateur : scénario horaire retenu à 861,70 sans second prorata',()=>{
  const vm=require('node:vm');
  const context={PayrollTest,SalaryProration:S,autoVariables:v=>({...v,base:v.baseMode==='Horaire'?PayrollTest.quantityAmount(v.hours,v.hourlyRate).toFixed(2):v.monthlySalary}),richVar:()=>({}),variableMarkup:()=>'',readVariableForm:()=>({}),refreshCalculations:()=>{},render:()=>{},period:()=>retained.period,euroFmt:n=>Number(n).toFixed(2)+' EUR'};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../dist/salary-proration-ui.js'),'utf8'),context);
  const result=context.autoVariables({...retained,salaryProrataApplied:true,salaryProrataDeduction:'1018.37'});
  assert.equal(result.baseMode,'Horaire');
  assert.equal(result.base,retained.expectedBase);
  assert.equal(result.salaryProrataApplied,false);
  assert.equal(result.salaryProrataDeduction,'0.00');
  assert.equal(retained.finalPayrollValidated,false);
});

test('Pilote octobre : import de 13 dates, deux semaines de 35 h et 70 h mensuelles',()=>{
  assert.equal(imported.length,13);
  const rows=Object.fromEntries(imported.map(r=>[r.date,r.entry]));
  const incomplete=T.summarize('2026-10',person,rows);
  assert.deepEqual(incomplete.missing,['2026-11-01']);
  // Hypothèse de recette uniquement : le dimanche voisin est un repos confirmé.
  rows['2026-11-01']={worked:0};
  const result=T.summarize('2026-10',person,rows);
  assert.equal(result.totals.worked,70);
  assert.equal(result.totals.normal,70);
  assert.deepEqual(result.weeks.map(w=>w.month.worked),[0,0,0,35,35]);
  assert.equal(result.missing.length,0);
  assert.equal(T.active(person,'2026-10-18'),false);
  assert.equal(T.active(person,'2026-10-19'),true);
});

test('Pilote octobre : mensualisation contractuelle et mode horaire restent distincts',()=>{
  const result=S.calculate({...plan,salaryStart:person.startDate,salaryEnd:person.endDate,monthlySalary:'1867.02',salaryHoursMode:'Calendrier'},'2026-10');
  assert.equal(result.totalHours,154);
  assert.equal(result.contractHours,70);
  assert.equal(result.outsideHours,84);
  assert.equal(result.base,848.65);
  assert.equal(PayrollTest.quantityAmount('70','12.31'),861.70);
  assert.equal(PayrollTest.percentageAmount('0','50'),0);
});

test('Pilote octobre : acquisition 1,25 jour, N−1 16 et solde 17,25',()=>{
  const presence=A.presence({...plan,leaveEmploymentStart:person.startDate,leaveEmploymentEnd:person.endDate},'2026-10');
  assert.equal(presence.scheduledDays,10);
  assert.equal(presence.percent,50);
  const acquired=A.acquisition({leaveAcquisitionMode:'Automatique',leaveWorkedPercent:String(presence.percent),leaveSickPercent:'0',cpUnit:'Ouvrables',leaveN:'0'});
  assert.equal(acquired,1.25);
  const balances=LeaveBalances.calculate({leaveN1:'16',leaveN:'0',leaveTakenN1:'0',leaveTakenN:'0',leaveAcquiredMonth:String(acquired),cpDays:'0',cpUnit:'Ouvrables'});
  assert.equal(balances.balance,17.25);
});

test('Pilote octobre : la préparation DSN inclut l’entrant sans annoncer une génération',()=>{
  const audit=D.audit({companies:[{id:'pilot',name:'Entreprise TEST'}],people:[person],bulletins:[]},'pilot','2026-10');
  assert.equal(audit.employees.length,1);
  assert.equal(audit.employees[0].id,person.id);
  assert.equal(audit.selectedCount,0);
  assert.equal(audit.canGenerate,false);
  assert.ok(audit.missing>0);
});
