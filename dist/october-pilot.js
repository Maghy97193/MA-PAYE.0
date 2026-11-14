/* October acceptance fixture. No real employee identity or private document. */
(function(root){'use strict';
const month='2026-10',personId='ebs-october-pilot',documentId='ebs-october-2026-technical-v1';
const assumptions=[
  'SIMULATION TECHNIQUE UNIQUEMENT : aucun bulletin conforme, aucun paiement et aucune DSN transmis.',
  'Salarié anonymisé. Mode horaire choisi pour la recette : 70 h × 12,31 € = 861,70 €. Contrat mensualisé à rapprocher avant une paie réelle.',
  'Les taux du bulletin de référence restent conservés, sauf AT/MP : la fiche entreprise enregistrée est prioritaire. Export AT/MP reçu : 6,16 %, effet au 01/01/2026 ; notification le 08/01/2026. Code risque repris de l’export.',
  'Panier unitaire confirmé : 10,40 €. Quantité d’octobre à confirmer : hypothèse zéro dans cette simulation. Aucun Navigo en octobre.',
  'Cotisations CIBTP 19,60 % exclusivement employeur. FNAL et contributions de formation sur base majorée 11,5 %, OPPBTP sur base majorée 13,14 %, selon les assiettes du bulletin de référence : application au nouveau contrat à contrôler.',
  'Réduction générale / RGDU non calculée : les montants d’août ne sont jamais reconduits. Coût employeur présenté avant allègements. Santé au travail, mutuelle, prévoyance et intempéries restent à documenter si applicables.',
  'Plafond mensuel de référence 4 005 € conservé pour la recette ; adaptation à l’entrée et régularisations à valider. Le brut testé reste inférieur au plafond proratisé usuel.',
  'Nets techniques calculés pour ce scénario simplifié : cotisations salariales de référence uniquement, aucun avantage, maintien ou IJSS. Ce calcul ne remplace pas le moteur réglementaire.',
  'Complément CSG zéro et absence de droits consommés sont des hypothèses de recette. Congés en jours ouvrables et droits CIBTP à rapprocher du relevé de caisse.',
  'Le 1er novembre est un repos à zéro dans le jeu de test ; le relevé réel de novembre reste à vérifier.'
];
function install(db,T,now){
  db.companies=db.companies||[];db.people=db.people||[];db.vars=db.vars||{};db.timeEntries=db.timeEntries||{};db.timeTransfers=db.timeTransfers||{};db.pilotRuns=db.pilotRuns||{};
  if(db.pilotRuns.ebsOctober?.version===4)return {...db.pilotRuns.ebsOctober,changed:false};
  let c=db.companies.find(c=>String(c.siret||'').replace(/\s/g,'')==='93215268900018'||/^EBS RENOV[’']?$/i.test(c.name||''));
  if(!c)c=db.companies.find(c=>c.id==='a'&&c.name==='Atelier Horizon · BTP');
  if(!c){c={id:'ebs-renov-october',sector:'BTP'};db.companies.push(c);}
  c.name="EBS RENOV’";
  for(const[k,v]of Object.entries({siret:'93215268900018',address:'61 rue de Lyon, 75012 Paris',sector:'BTP',ape:'4333Z',legalForm:'SASU',idcc:'1596',cibtp:'CIBTP Île-de-France',occupationalHealth:'PREVLINK'}))if(!c[k])c[k]=v;
  // Only synthetic risk codes are cleared when a demo company becomes EBS.
  if(c.atmpRiskCode==='CODE-TEST'){c.atmpRiskCode='';c.atmpRate='';c.atmpValidFrom='';}
  // Preserve the registered company rate. Repair only the value written by the preceding pilot release.
  const previousPilotValue=(String(c.atmpRate)==='6.48'&&String(c.atmpReference||'').startsWith('Taux confirmé par l’utilisatrice et bulletin de référence août'))||(String(c.atmpRate).replace(',','.')==='6.16'&&c.atmpValidFrom==='2026-01-08'&&String(c.atmpReference||'').startsWith('Fiche entreprise : 6,16 %'));
  if(c.atmpRate===undefined||c.atmpRate===null||c.atmpRate===''||previousPilotValue){c.atmpRate='6.16';c.atmpValidFrom='2026-01-01';c.atmpReference='Export AT/MP : effet 01/01/2026, décision 12/12/2025, notification 08/01/2026';}
  else if(String(c.atmpRate).replace(',','.')==='6.16'&&!c.atmpValidFrom)c.atmpValidFrom='2026-01-01';
  if(!c.atmpRiskCode)c.atmpRiskCode='454LE';if(!c.atmpNotificationDate)c.atmpNotificationDate='2026-01-08';if(!c.atmpDecisionDate)c.atmpDecisionDate='2025-12-12';
  const plan=Object.fromEntries(Array.from({length:7},(_,i)=>['cpPlan'+i,i>0&&i<6?'7':'0']));
  let p=db.people.find(p=>p.id===personId);
  if(!p){p={id:personId,company:c.id,name:'Cas octobre TEST — anonymisé',matricule:'TEST-OCT',job:'Ouvrier exécutant',category:'Ouvrier',classification:'OE1',contract:'CDD',scheme:'Aucun',contractId:'TEST-OCT-2026',startDate:'2026-10-19',endDate:'2026-11-15',cddReason:'Accroissement temporaire d’activité',cddTermType:'Terme précis',workMode:'Temps plein',hours:151.67,weeklyHours:'35',monthlyBase:'1867.02',hourlyRate:'12.31',transportMode:'Aucun',transportSubscription:'Aucun',transportMonthlyCost:'0',transportProofStatus:'Non applicable',leaveN1:'16',leaveN:'0',leaveTakenN1:'0',leaveTakenN:'0',leaveUnit:'Ouvrables',leaveCycleStart:4,cibtp:'CIBTP Île-de-France',notes:'Fiche anonymisée de recette. Fin prévue, convention, affiliations et droits de caisse à confirmer.',...plan};db.people.push(p);}
  const rows={};for(let day=19;day<=31;day++){const d=month+'-'+day,worked=T.day(d).getUTCDay()%6?7:0;rows[d]={worked,extra25:0,extra50:0,extra100:0,hc:0,absence:0,meals:0,note:'Relevé de test : paniers non documentés',updatedAt:now};}
  rows['2026-11-01']={worked:0,note:'Hypothèse de recette : repos du dimanche, hors octobre',updatedAt:now};
  for(const[d,row]of Object.entries(rows)){const key=c.id+'|'+personId+'|'+d;if(!db.timeEntries[key])db.timeEntries[key]=row;}
  const sourceRows=Object.fromEntries(T.dates(month).map(d=>[d,db.timeEntries[c.id+'|'+personId+'|'+d]])),summary=T.summarize(month,p,sourceRows),signature=T.snapshot(month,p,sourceRows),key=c.id+'|'+month+'|'+personId;
  const initial={...plan,baseMode:'Horaire',hours:'70',hourlyRate:'12.31',base:'861.70',monthlySalary:'1867.02',salaryProrataApplied:false,salaryProrataDeduction:'0.00',salaryStart:'2026-10-19',salaryEnd:'2026-11-15',salaryMode:'Automatique entrée / sortie',salaryHoursMode:'Calendrier',leaveEmploymentStart:'2026-10-19',leaveEmploymentEnd:'2026-11-15',leaveCurrentPeriod:month,leaveWorkedPercent:'50',leaveSickPercent:'0',leaveSickAcquiredBefore:'0',leaveN1:'16',leaveN:'0',leaveTakenN1:'0',leaveTakenN:'0',leaveAcquisitionMode:'Automatique',leavePresenceMode:'Dates du contrat',leaveCycleStart:4,cpHoursMode:'Calendrier',cpStart:'',cpEnd:'',cpNonWorkedDates:'',cpUnit:'Ouvrables',cpMode:'Caisse CIBTP',cpDays:'0',pasRate:'0',mealQty:'0',mealUnit:'10.40',mealTaxable:'0',navigoPrice:'0',status:'À vérifier',source:'Relevé octobre préparé : 70 h, deux semaines de 35 h.',notes:assumptions.join('\n'),rows:referenceRows('861.70',root.PayrollTest),timesheetWorkedHours:summary.totals.worked,timesheetNormalHours:summary.totals.normal,timeTrackingSource:{month,worked:summary.totals.worked,normal:summary.totals.normal,absences:[],signature,transferredAt:now}};
  db.vars[key]={...initial,...db.vars[key]};
  // This named pilot alone adopts the newly supplied meal price; other payroll records remain unchanged.
  db.vars[key].mealUnit='10.40';
  const registeredAt=companyAtmp(c,month),atRows=(db.vars[key].rows||[]).filter(r=>/accident.*travail|AT\/MP/i.test(r.label));
  for(const r of atRows)Object.assign(r,registeredAt);
  if(!db.timeTransfers[key])db.timeTransfers[key]={signature,at:now};
  db.pilotRuns.ebsOctober={...db.pilotRuns.ebsOctober,version:4,companyId:c.id,personId,month,installedAt:now};
  return {...db.pilotRuns.ebsOctober,changed:true};
}
function companyAtmp(c,period){
  const rate=String(c.atmpRate??'').trim().replace(',','.');
  if(!/^\d+(\.\d{1,4})?$/.test(rate)||Number(rate)>100)throw Error('Taux AT/MP à compléter dans la fiche entreprise.');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(c.atmpValidFrom||''))throw Error('Date d’effet AT/MP à compléter dans la fiche entreprise.');
  const [year,month]=period.split('-').map(Number),last=new Date(Date.UTC(year,month,0)).toISOString().slice(0,10);
  if(c.atmpValidFrom>period+'-01'||c.atmpValidUntil&&c.atmpValidUntil<last)throw Error('Le taux AT/MP enregistré ne couvre pas ce mois : vérifier la fiche entreprise.');
  return{label:'Accident du travail — fiche entreprise',baseMode:'gross',base:'0',employeeRate:'0',employerRate:rate,csgInclude:'Non',atmpRiskCode:c.atmpRiskCode||'',atmpValidFrom:c.atmpValidFrom,atmpValidUntil:c.atmpValidUntil||'',atmpReference:c.atmpReference||'Fiche entreprise'};
}
function referenceRows(gross,engine){
  const base=coefficient=>engine.quantityAmount(gross,coefficient).toFixed(2),row=(label,employeeRate,employerRate,baseMode='gross',manual='0')=>({label,employeeRate,employerRate,baseMode,base:manual,csgInclude:'Non',reference:'Bulletin de référence août 2026 ; taux confirmés inchangés'});
  return[
    row('Solidarité autonomie','0','0.300'),row('Assurance maladie','0','7.000'),row('Complément de cotisations maladie','0','6.000'),
    row('Assurance vieillesse plafonnée','6.900','8.550','t1'),row('Assurance vieillesse déplafonnée','0.400','2.110'),
    row('Allocations familiales taux réduit','0','3.450'),row('Complément de cotisations allocations familiales','0','1.800'),
    row('Contribution au dialogue social','0','0.016'),companyAtmp({atmpRate:'6.16',atmpValidFrom:'2026-01-01',atmpRiskCode:'454LE'},month),
    row('Fonds national d’aide au logement — base BTP','0','0.100','manual',base('1.115')),
    row('Assurance chômage','0','4.000','cap4'),row('AGS','0','0.250','cap4'),
    row('Retraite complémentaire Tranche 1','3.150','4.720','t1'),row('Contribution d’équilibre général tranche 1','0.860','1.290','t1'),
    row('CIBTP — Congés payés — employeur uniquement','0','19.600'),row('OPPBTP — base BTP','0','0.110','manual',base('1.1314')),
    row('FPC Constructys contribution conventionnelle','0','0.420'),row('APNAB — négociation collective','0','0.150'),
    row('CCCA-BTP — base BTP','0','0.300','manual',base('1.115')),
    row('CSG déductible','6.800','0','csg'),row('CSG non déductible et CRDS','2.900','0','csg'),
    row('Taxe apprentissage — base BTP','0','0.590','manual',base('1.115')),row('Formation professionnelle continue — base BTP','0','0.550','manual',base('1.115'))
  ];
}
function simulation(variables,input,rows,engine){
  const v={...variables,rows:structuredClone(rows),cotReviewed:'À vérifier',taxableNet:'0',socialNet:'',pasRate:'0',healthMode:'Non imputé ce mois',csgExtra:'0',csgOtherExtra:'0',csgPriorGross:'0'};
  // Provisional figures belong only to the technical snapshot, never to validated payroll variables.
  const first=engine.calculate({...input,rows:v.rows,csgExtra:'0',csgAbatementRoom:'16020',taxableNet:'0',socialNet:'',pasRate:'0',healthMode:'Non imputé ce mois'});
  const nonDeductible=engine.moneyTotal(first.rows.filter(r=>/CSG non déductible|CRDS/.test(r.label)).map(r=>r.employee));
  const technicalSocial=Number((first.gross-first.employee).toFixed(2));
  v.taxableNet=engine.moneyTotal([technicalSocial,nonDeductible]).toFixed(2);v.socialNet=technicalSocial.toFixed(2);
  const result=engine.calculate({...input,rows:v.rows,csgExtra:'0',csgAbatementRoom:'16020',taxableNet:v.taxableNet,socialNet:v.socialNet,pasRate:'0',healthMode:'Non imputé ce mois'});
  const at=v.rows.find(r=>/accident.*travail|AT\/MP/i.test(r.label));
  const notes=assumptions.map(note=>note.startsWith('Les taux du bulletin')?'Les taux du bulletin de référence restent conservés ; AT/MP repris de la fiche entreprise : '+(at?.employerRate??'à renseigner')+' %, effet '+(at?.atmpValidFrom||'à renseigner')+'. Aucune part salariale. Code risque repris de l’export.':note);
  return{variables:v,result,assumptions:notes,technicalPilot:true};
}
const api={month,personId,documentId,assumptions,install,simulation,referenceRows,companyAtmp};root.OctoberPilot=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
