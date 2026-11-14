(function(){'use strict';
const installed=OctoberPilot.install(db,TimeTracking,new Date().toISOString());
if(installed.changed){if(!save())throw Error('Le dossier de test EBS ne peut pas être enregistré.');company=installed.companyId;$('#period').value=OctoberPilot.month;view='Préparation paie';}
function refreshCompany(){const current=company;$('#company').innerHTML=db.companies.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('');$('#company').value=current;}
function openPilot(){company=installed.companyId;$('#period').value=OctoberPilot.month;selectedPerson=OctoberPilot.personId;refreshCompany();view='Préparation paie';render();}
function pilotSnapshot(){
  const p=db.people.find(p=>p.id===OctoberPilot.personId),previousCompany=company;company=installed.companyId;
  const v=richVar(p),rows=v.rows?.length?structuredClone(v.rows):OctoberPilot.referenceRows(v.base,PayrollTest);
  const at=rows.find(r=>/accident.*travail|AT\/MP/i.test(r.label)),registeredAt=OctoberPilot.companyAtmp(db.companies.find(c=>c.id===company),OctoberPilot.month);
  if(at)Object.assign(at,registeredAt);else rows.push(registeredAt);
  const simulated=OctoberPilot.simulation(v,engineInput(v),rows,PayrollTest);
  const snapshot={id:OctoberPilot.documentId,pilotSignature:JSON.stringify({v,rows}),company,personId:p.id,period:OctoberPilot.month,paymentDate:CompanyUtils.paymentDate(OctoberPilot.month),createdAt:new Date().toISOString(),engine:PayrollTest.version,person:structuredClone(p),employer:structuredClone(db.companies.find(c=>c.id===company)),variables:simulated.variables,result:simulated.result,technicalPilot:true,simulationAssumptions:simulated.assumptions,issues:simulated.assumptions};
  company=previousCompany;return snapshot;
}
function ensureSnapshot(){
  const candidate=pilotSnapshot(),previous=db.bulletins.find(d=>d.id===(db.pilotRuns.ebsOctober.documentId||OctoberPilot.documentId));
  if(previous?.pilotSignature===candidate.pilotSignature)return previous;
  if(previous){candidate.revises=previous.id;candidate.id=OctoberPilot.documentId+'-'+crypto.randomUUID();}
  const before=db.pilotRuns.ebsOctober.documentId;db.pilotRuns.ebsOctober.documentId=candidate.id;
  db.bulletins.push(candidate);if(!save()){db.bulletins.pop();db.pilotRuns.ebsOctober.documentId=before;throw Error('Enregistrement du bulletin de simulation impossible.');}return candidate;
}
window.openEbsOctoberPilot=openPilot;
window.showEbsOctoberSimulation=function(){try{openPilot();const d=ensureSnapshot();showDraft(d.id);}catch(e){toast(e.message);}};
window.attachEbsOctoberDsn=function(){try{openPilot();const d=ensureSnapshot(),key=company+'|'+OctoberPilot.month,previous=db.dsnPreparation?.[key];db.dsnPreparation=db.dsnPreparation||{};db.dsnPreparation[key]={...previous,selected:{...previous?.selected,[d.personId]:d.id},documents:{...previous?.documents,referencePayroll:'À vérifier',employmentContract:'Reçu',timesheet:'Reçu'},notes:'Rapprochement de simulation technique uniquement ; aucune DSN générée ou transmise.'};if(!save()){if(previous)db.dsnPreparation[key]=previous;else delete db.dsnPreparation[key];throw Error('Enregistrement DSN impossible.');}view='Préparation DSN';render();}catch(e){toast(e.message);}};
const oldMarkup=draftMarkup;draftMarkup=function(d){let html=oldMarkup(d);if(!d.technicalPilot)return html;const notice=`<section class="notice pilot-warning"><strong>Simulation technique — nets et coût employeur provisoires</strong><p>Le salaire de base est de 861,70 €. Les autres résultats testent le moteur avec des hypothèses visibles ; ils ne sont pas validés pour une paie réelle.</p><ul>${d.simulationAssumptions.map(a=>'<li>'+esc(a)+'</li>').join('')}</ul></section>`;return notice+html.replace('Net imposable fourni manuellement','Net imposable technique — hypothèses').replace('Net social fourni manuellement','Net social technique — hypothèses');};
const oldRender=render;render=function(){oldRender();const app=$('#app');if(!app)return;const panel=document.createElement('section');panel.className='panel pilot-panel';panel.innerHTML=`<div><h2>EBS RENOV’ · test octobre 2026</h2><p>Entrée le 19/10 · 70 h × 12,31 € = <strong>861,70 € brut de base</strong> · congés N−1 : 16 j, acquisition d’octobre calculée. Panier unitaire : 10,40 € ; quantité à confirmer. Dossier salarié anonymisé.</p></div><div class="tools"><button type="button" class="btn secondary" id="openEbsPilot">Ouvrir la préparation d’octobre</button><button type="button" class="btn" id="showEbsSimulation">Voir le bulletin de simulation</button><button type="button" class="btn secondary" id="attachEbsDsn">Rattacher au dossier DSN de test</button></div><p class="muted">La simulation reprend les taux du bulletin de référence confirmés inchangés et les hypothèses signalées. Les paramètres réels manquants ne sont pas validés. Aucune génération ou transmission DSN.</p>`;app.prepend(panel);panel.querySelector('#openEbsPilot').onclick=openPilot;panel.querySelector('#showEbsSimulation').onclick=window.showEbsOctoberSimulation;panel.querySelector('#attachEbsDsn').onclick=window.attachEbsOctoberDsn;};
refreshCompany();
if(new URLSearchParams(location.search).get('dossier')==='ebs-octobre-2026'){company=installed.companyId;$('#period').value=OctoberPilot.month;view='Préparation paie';refreshCompany();}
render();
})();
