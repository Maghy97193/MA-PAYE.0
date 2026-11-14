# MA PAYE.0 — version BTP : audit, recette et projet d’offres
Date : 14 novembre 2026. Document de travail, durée d’essai de 45 jours validée ; tarifs et autres modalités commerciales encore proposés. Aucun paiement ni essai chronométré activé.

## 1. Décision produit
Marque Solutions.0, gamme BTP. Finaliser cette version avant d’ouvrir à d’autres activités. La version publiée actuelle est la 34 ; les développements sont conservés dans la branche ma-paye-0-version-btp.

## 2. Vérification exécutée
Commande : `node --test tests/*.test.cjs`.
Résultat : code de sortie 0, 25 résultats de test, 25 réussis, 0 échec, 0 ignoré. Le journal associé conserve la sortie complète. Cette réussite ne constitue pas une validation réglementaire ni une recette exhaustive.

Couverture présente : calculs arithmétiques, paniers/transport, bases et heures, congés et reprises, CDD, AT/MP, SIRET/paiement, conventions et champs, ancienneté, PDF, prorata, révisions de bulletins et conservation des originaux, préparation DSN, suivi journalier et import CSV.
Les tests XLSX en navigateur et le transfert sans doublon ont été effectués dans la recette précédente sur données fictives ; ils n’ont pas été réexécutés dans cet audit.

## 3. État et manques
| Domaine | Présent | À faire avant un usage réel |
|---|---|---|
| Fiches et heures | Établissement, salarié, contrats, feuilles journalières, import XLSX/CSV et transfert contrôlé | Reprise des cumuls, contrôle des pièces, validation du dossier initial et qualification des heures selon les règles applicables |
| Moteur de paie | Arithmétique de test, modèles de lignes, assiettes et calculs ciblés | Paramètres datés et sourcés, règles BTP applicables, plafonds proratisés/régularisés, allègements/exonérations, bases fiscales/sociales et cumuls réglementaires |
| Cotisations | Lignes de cotisation de test et paramètres saisis | Vérification annuelle des valeurs, FPOC santé/prévoyance, AT/MP notifié, paramètres CIBTP ; contrôles des conditions et assiettes, pas seulement taux × brut |
| Bulletin | PDF et photographies historiques | Rapprochement indépendant ligne par ligne ; conformité des mentions ; distinction claire des bases contractuelles et des éléments réellement dus |
| DSN | Inventaire des pièces et sélection des bulletins | Génération NEODeS, contrôles DSN-Val, dépôt de test, bilans, CRM, annule/remplace et signalements, puis procédure de production autorisée |
| Accès et données | Aperçu privé, données navigateur, sauvegarde JSON | Authentification e-mail réelle, serveur, isolation des entreprises et des rôles, base partagée, sauvegardes/restauration, journaux et gestion des incidents |
| Abonnement | Écran d’attente | Comptes clients, offres approuvées, essai contrôlé côté serveur, droits d’accès et facturation |
| Paiement | Aucun | Prestataire de paiement, compte marchand validé, paramètres contractuels et fiscaux, paiement hébergé, notifications serveur vérifiées et portail client |
| Mobile / BATI.0 | Scénario discuté | En attente ; liaison heures BATI.0 à vérifier par Maguy. Aucun changement de BATI.0 ici |

Les valeurs par défaut et les taux inscrits dans le code ne sont pas un référentiel réglementaire validé pour toute période. Le net imposable, le net social et le PAS restent actuellement fournis au moteur de test. La DSN actuelle ne produit et ne transmet aucun fichier.

## 4. Ordre de recette
### P0 : dossier pilote et résultats de référence
1. Choisir un périmètre initial explicite (IDCC, territoire, catégorie, taille et régime de l’entreprise, contrat et horaire).
2. Utiliser des dossiers anonymisés et comparer à une paie de référence vérifiée par un gestionnaire indépendant.
3. Tester mois entier, entrée le 19/10/2026, sortie CDD, salarié hors période, temps partiel, apprenti et cadres/ETAM uniquement si annoncés comme supportés.
4. Le cas 70 h × 12,31 € = 861,70 € appartient au calcul horaire ; le test de prorata mensuel 1 867,06 € × 70/154 = 848,66 € relève d’une autre méthode. Vérifier le mode contractuel et la référence retenue avant de valider un résultat. Deux tests verts ne prouvent pas que le choix utilisateur est correct.
5. Vérifier semaines à cheval, congés et absences, majorations, paniers soumis/non soumis, transports, absence de double comptage et traitement CIBTP.
6. Rapprocher chaque assiette, taux, montant salarié/employeur, régularisation, net social, net fiscal et PAS, puis les cumuls et écritures comptables.

### P0 : chaîne DSN
Fichier NEODeS conforme à la norme de la période, validation DSN-Val, envoi test, lecture des bilans et comptes rendus disponibles, correction et annule/remplace. Un envoi test ne remplace pas un dépôt réel. Les retours de test ne couvrent pas tous les CRM de production. Tester également signalements et fins de contrat selon le périmètre.

### P0 : données et sécurité
Comptes de deux entreprises et rôles distincts : impossibilité d’accéder aux dossiers de l’autre. Tester restauration après erreur, accès simultanés, export de sortie, pertes de connexion, échec d’enregistrement et journalisation. Formaliser conservation, obligations du prestataire/sous-traitant et modalités de fin de contrat. Aucun NIR/RIB ou dossier réel dans l’actuelle démonstration navigateur.

### P1 : parcours commercial
Tester début et fin d’essai, limites de dates/fuseau horaire, essai non renouvelable par simple changement d’e-mail, paiement accepté/refusé, notification répétée ou retardée, abonnement annulé et reprise. Les droits payants dépendent du serveur et d’un paiement confirmé, pas du retour visuel d’une page de paiement. Préserver consultation et récupération des documents selon la politique contractuelle et légale.

## 5. Offre d’essai — durée validée : 45 jours
Décision de Maguy : essai gratuit de 45 jours à compter de l’activation, au lieu de 30 jours ou d’une fenêtre fixe du 15 au 15. Nom retenu : « Essai gratuit 45 jours ». Pas d’offre gratuite permanente.

- Une entreprise, un essai, compte vérifié. Départ et échéance affichés ; pas de prolongation automatique.
- Proposition conservée : pas de carte demandée au départ ; bascule payante uniquement après choix explicite de la formule et paiement confirmé.
- Parcours visé : heures → préparation → bulletin → DSN, avec une période de paie choisie pour tester le cycle. Vérifier dès l’activation que l’échéance DSN du dossier et les contrôles nécessaires sont couverts ; ne pas garantir qu’un mois calendaire complet pourra être observé à partir de n’importe quelle inscription.
- Rappels avant échéance. Après expiration, bloquer les nouvelles opérations de production ; conserver consultation et récupération des documents selon la politique contractuelle et légale à formaliser.
- La DSN est déposée le mois suivant la paie selon l’échéance applicable. La fenêtre du 15 au 15 n’est pas retenue, car elle peut finir le jour même du dépôt et laisse peu de marge pour les retours.
- La durée de 45 jours est décidée ; l’essai de production, les comptes clients, l’abonnement et les paiements ne sont pas activés. Leur ouverture dépend de la validation du moteur de paie, de la chaîne DSN et du socle sécurisé.

## 6. Tarification — hypothèse à valider
Deux offres seulement au lancement :
- Essai gratuit 45 jours : 0 €, sans engagement payant automatique.
- Standard BTP : 29 € HT par entreprise/mois + 6 € HT par salarié ayant une paie sur le mois. Corrections du même salarié/mois incluses pour éviter une double facturation.
Exemples HT : 1 salarié = 35 €/mois ; 5 salariés = 59 € ; 10 salariés = 89 €.
Sans engagement annuel au lancement. Le nombre d’établissements et les prestations d’accompagnement incluses sont à définir.
Le tarif doit couvrir hébergement, authentification, sauvegardes, transmission DSN, maintenance réglementaire/conventionnelle, paiement et assistance. Ce n’est pas un tarif mis en vente.
Comparateurs consultés : macompta affiche notamment 19 € HT/mois + 6 € HT/bulletin pour une formule ; PayFit affiche pour sa formule Paie un exemple à 49 € de base + 20 € par collaborateur pour 3 salariés (109 € HT/mois), avec un forfait de base variable selon l’effectif. Les périmètres, services, conventions et niveaux d’assistance diffèrent ; ces prix ne constituent pas une comparaison de conformité ni de couverture BTP.

## 7. Sens de « souscription » et activation
Souscription = choix de la formule, création ou identification du compte client, présentation du prix et des conditions, acceptation contractuelle et activation de l’abonnement. Cela ne signifie pas à lui seul « rendre le site accessible à tous ».
Parcours cible : compte e-mail vérifié → entreprise → essai → formule Standard → conditions et paiement hébergé → confirmation serveur → droits payants.
Stripe Billing est une option à étudier, pas un service déjà raccordé. Prévoir portail de gestion, factures, résiliation, impayés, remboursement selon les conditions applicables, TVA et mentions commerciales. Ne jamais stocker les numéros de carte dans MA PAYE.0.
Ne pas publier des promesses de DSN opérationnelle ni activer des paiements réels tant que les points P0 ne sont pas validés.

## 8. Sources officielles et commerciales consultées
- Urssaf, échéances DSN selon effectif et date de versement : https://www.urssaf.fr/accueil/employeur/gerer-entreprise/declaration-sociale-nominative.html
- Net-entreprises, dépôt de test : https://net-entreprises.custhelp.com/app/answers/detail/a_id/49/
- Net-entreprises, modes de transmission : https://net-entreprises.custhelp.com/app/answers/detail_dsn/a_id/8/
- Net-entreprises, responsabilité et CRM : https://net-entreprises.custhelp.com/app/answers/detail_dsn/a_id/2925/
- CNIL, sous-traitance : https://www.cnil.fr/fr/cnil-direct/question/reglement-europeen-un-sous-traitant-de-donnees-personnelles-cest-quoi
- Conservation des bulletins employeur : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020625846/
- Mise à disposition électronique salarié, obligations distinctes : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033627046/
- macompta : https://www.macompta.fr/tarifs
- PayFit : https://payfit.com/fr/nos-offres/
- Stripe, fin d’essai sans moyen de paiement : https://support.stripe.com/questions/how-to-pause-or-cancel-subscriptions

## 9. Trois priorités
1. Fixer le dossier pilote et fiabiliser la paie par rapprochement indépendant.
2. Terminer le socle sécurisé et la chaîne DSN avec preuves de recette.
3. Finaliser l’offre et les conditions, puis intégrer et tester le paiement en environnement de test avant ouverture commerciale.
