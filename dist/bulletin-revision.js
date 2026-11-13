/* Recalculate an explicitly selected saved TEST snapshot; retain its original. */
(function(root){'use strict';
function hourlyVariables(d){const v=structuredClone(d.variables),hours=Number(v.salaryContractHours),rate=Number(v.hourlyRate||d.person.hourlyRate);if(!v.salaryProrataApplied||!Number.isFinite(hours)||hours<=0||!Number.isFinite(rate)||rate<=0)throw Error('Heures sous contrat et taux horaire à renseigner dans la préparation.');return{...v,baseMode:'Horaire',hours:hours.toFixed(2),hourlyRate:String(rate),base:PayrollTest.quantityAmount(hours,rate).toFixed(2),salaryProrataApplied:false,salaryProrataDeduction:'0.00',salaryProrationError:'',precPeriod:d.period,leaveCurrentPeriod:d.period};}
root.BulletinRevision={hourlyVariables};if(typeof module!=='undefined'&&module.exports)module.exports=root.BulletinRevision;
})(typeof globalThis!=='undefined'?globalThis:this);
