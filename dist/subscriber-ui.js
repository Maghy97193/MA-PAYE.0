/* Subscriber entry point. Authentication is owned by the hosting platform. */
(()=>{
  const label='Connexion & abonnement';
  const originalRender=window.render;
  window.render=function(){
    if(view!==label)return originalRender();
    document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('active',b.textContent===label));
    document.querySelector('#app').innerHTML=`
      <div class="eyebrow">Espace abonné</div>
      <div class="heading"><div><h1>Votre accès à MA PAYE.0</h1><p>Retrouvez la connexion et les informations sur votre futur abonnement.</p></div></div>
      <div class="grid subscriber-grid">
        <section class="panel subscriber-connect" aria-labelledby="connection-title">
          <span class="badge">Connexion sécurisée</span>
          <h2 id="connection-title">Bienvenue dans votre espace</h2>
          <p>Connectez-vous avec votre compte ChatGPT pour accéder à la version de travail, sous réserve des autorisations accordées.</p>
          <a class="btn subscriber-link" href="/signin-with-chatgpt?return_to=%2F%3Fespace%3Dabonne" target="_top">Se connecter avec ChatGPT →</a>
          <p>Première visite ? Vous pourrez créer votre compte ChatGPT depuis la page de connexion.</p>
          <p class="muted">La connexion ne souscrit aucun abonnement et ne déclenche aucun paiement.</p>
        </section>
        <section class="panel" aria-labelledby="subscription-title">
          <span class="badge warn">Ouverture des abonnements à venir</span>
          <h2 id="subscription-title">Votre futur abonnement</h2>
          <p>Un espace prévu pour accompagner la gestion de vos équipes et la préparation de la paie.</p>
          <dl class="subscriber-details"><div><dt>Formules et tarifs</dt><dd>À définir</dd></div><div><dt>Paiement en ligne</dt><dd>Non activé</dd></div><div><dt>Souscription</dt><dd>Pas encore ouverte</dd></div></dl>
          <p class="muted">Les conditions, les fonctionnalités incluses et la date d’ouverture seront précisées avant toute souscription.</p>
        </section>
      </div>
      <section class="panel subscriber-info"><h2>Une connexion, puis un abonnement</h2><ol><li><strong>Se connecter</strong><p>Utilisez le parcours sécurisé de ChatGPT.</p></li><li><strong>Choisir une formule</strong><p>Lorsque les offres seront disponibles, consultez les tarifs et les conditions.</p></li><li><strong>Activer son abonnement</strong><p>La souscription et le paiement restent à mettre en place.</p></li></ol><p class="muted">Version actuelle : données de test conservées dans ce navigateur. La connexion ne synchronise pas les dossiers et ne crée pas encore d’espace de données distinct par abonné.</p></section>`;
  };
  const button=document.createElement('button');button.type='button';button.textContent=label;button.onclick=()=>go(label);document.querySelector('#nav').append(button);
  const top=document.createElement('button');top.type='button';top.className='btn secondary';top.textContent='Espace abonné';top.onclick=()=>go(label);document.querySelector('.top').append(top);
  const style=document.createElement('style');style.textContent='.subscriber-connect h2,.subscriber-grid section>h2{font-size:24px;margin-top:22px}.subscriber-link{display:inline-block;text-decoration:none;margin:8px 0;line-height:1.5}.subscriber-link:focus-visible{outline:3px solid #8cad55;outline-offset:4px}.subscriber-details{margin:24px 0}.subscriber-details>div{display:flex;justify-content:space-between;gap:16px;padding:15px 0;border-bottom:1px solid var(--line)}.subscriber-details dt{color:#697c73}.subscriber-details dd{margin:0;font-weight:600;text-align:right}.subscriber-info{margin-top:22px}.subscriber-info ol{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;padding-left:24px}.subscriber-info li::marker{color:var(--green);font-weight:700}.subscriber-info li p{margin-bottom:0}@media(max-width:650px){.subscriber-info ol{grid-template-columns:1fr;gap:16px}.subscriber-details>div{flex-wrap:wrap}.subscriber-details dd{text-align:left}}';document.head.append(style);
  if(new URLSearchParams(location.search).get('espace')==='abonne')go(label);
})();
