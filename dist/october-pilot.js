/* October acceptance fixture. No real employee identity or private document. */
(function(root){'use strict';
const month='2026-10',personId='ebs-october-pilot',documentId='ebs-october-2026-technical-v1';
const assumptions=[
  'SIMULATION TECHNIQUE UNIQUEMENT : aucun bulletin conforme, aucun paiement et aucune DSN transmis.',
  'Salarié anonymisé. Mode horaire choisi pour la recette : 70 h × 12,31 € = 861,70 €. Contrat mensualisé à rapprocher avant une paie réelle.',
  'Taux repris du bulletin de référence d’août 2026, confirmés inchangés par l’utilisatrice. AT/MP employeur : 6,48 % ; code risque et date de notification à compléter.',
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
  if(db.pilotRuns.ebsOctober?.version===2)return {...db.pilotRuns.ebsOctober,changed:false};
  let c=db.companies.find(c=>String(c.siret||'').replace(/\s/g,'')==='93215268900018'||/^EBS RENOV[’']?$/i.test(c.name||''));
  if(!c)c=db.companies.find(c=>c.id==='a'&&c.name==='Atelier Horizon · BTP');
  if(!c){c={id:'ebs-renov-october',sector:'BTP'};db.companies.push(c);}
  c.name="EBS RENOV’";
  for(const[k,v]of Object.entries({siret:'93215268900018',address:'61 rue de Lyon, 75012 Paris',sector:'BTP',ape:'4333Z',legalForm:'SASU',idcc:'1596',cibtp:'CIBTP Île-de-France',occupationalHealth:'PREVLINK'}))if(!c[k])c[k]=v;
  // Only synthetic risk codes are cleared when a demo company becomes EBS.
  if(c.atmpRiskCode==='CODE-TEST'){c.atmpRiskCode='';c.atmpValidFrom='';}
  c.atmpRate='6.48';c.atmpReference='Taux confirmé par l’utilisatrice et bulletin de référence août 2026 ; code risque à compléter';
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
  if(!db.timeTransfers[key])db.timeTransfers[key]={signature,at:now};
  db.pilotRuns.ebsOctober={version:2,companyId:c.id,personId,month,installedAt:now};
  return {...db.pilotRuns.ebsOctober,changed:true};
}
function referenceRows(gross,engine){
  const base=coefficient=>engine.quantityAmount(gross,coefficient).toFixed(2),row=(label,employeeRate,employerRate,baseMode='gross',manual='0')=>({label,employeeRate,employerRate,baseMode,base:manual,csgInclude:'Non',reference:'Bulletin de référence août 2026 ; taux confirmés inchangés'});
  return[
    row('Solidarité autonomie','0','0.300'),row('Assurance maladie','0','7.000'),row('Complément de cotisations maladie','0','6.000'),
    row('Assurance vieillesse plafonnée','6.900','8.550','t1'),row('Assurance vieillesse déplafonnée','0.400','2.110'),
    row('Allocations familiales taux réduit','0','3.450'),row('Complément de cotisations allocations familiales','0','1.800'),
    row('Contribution au dialogue social','0','0.016'),row('Accident du travail — taux confirmé','0','6.480'),
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
  return{variables:v,result,assumptions:[...assumptions],technicalPilot:true};
}
const api={month,personId,documentId,assumptions,install,simulation,referenceRows};root.OctoberPilot=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
