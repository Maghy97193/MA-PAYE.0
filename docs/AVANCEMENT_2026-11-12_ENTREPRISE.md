# MA PAYE.0 — Version 0.4 : entreprise, organismes et paiement

## Modifications demandées par Maguy

- Recherche d’un établissement à partir de son SIRET pour préremplir la fiche entreprise.
- Listes de choix pour les caisses sociales.
- Paiement des salaires fixé au 5 du mois suivant la période de paie.

## Fonctionnement

Dans « Entreprise », ouvrir « Renseigner / modifier l’entreprise », saisir les 14 chiffres du SIRET puis cliquer « Rechercher l’entreprise ». Le résultat est présenté avant application. « Utiliser ces informations » remplit les champs disponibles : raison sociale, SIREN, adresse du bon établissement, APE, forme juridique et date de création. Les champs restent modifiables avant enregistrement.

La recherche appelle l’API publique Recherche d’entreprises sans clé et ne transmet que le SIRET. Elle vérifie le SIRET exact de l’établissement ; l’adresse du siège n’est pas utilisée à sa place lorsqu’il s’agit d’un autre établissement. Elle conserve une date et une source de recherche. Données non diffusées, établissement absent, indisponibilité ou limitation de requêtes : un message est affiché et la saisie manuelle reste possible. Aucune donnée manquante n’est inventée.

Les conventions signalées dans la réponse sont des indications à vérifier ; la convention applicable n’est pas déduite automatiquement de l’APE. Les caisses et taux ne sont pas obtenus par cette API.

## Listes de choix

- Recouvrement : Urssaf, CGSS, MSA, autre.
- Retraite complémentaire : sélection de groupes et possibilité d’en préciser un autre.
- Prévoyance et complémentaire santé : sélection d’organismes et nom exact à compléter.
- Congés : CIBTP Île-de-France, autre caisse territoriale CIBTP, CNETP, caisse des coopératives, caisse Outre-mer, non applicable, autre.
- Champs complémentaires : caisse locale/institution exacte et référence d’affiliation ou de contrat pour chaque catégorie.

Les listes ne constituent ni une confirmation d’affiliation ni une nomenclature DSN. Les anciennes valeurs saisies et notes d’organismes restent conservées. Choisir « Autre » exige de préciser le nom.

## Paiement fixe

La date est calculée à partir du mois de paie et affichée en lecture seule : novembre 2026 → 5 décembre 2026 ; décembre 2026 → 5 janvier 2027. Il n’y a pas de report automatique pour week-end ou jour férié, conformément au jour fixe demandé.

La date est incluse dans les nouveaux bulletins de test, leur PDF, leur photographie JSON et l’export CSV des variables. Elle ne déclenche aucun virement. Les bulletins historiques ne sont pas réécrits : s’ils ne comportaient pas cette date, elle est indiquée comme non enregistrée dans le document antérieur. Une ancienne date manuelle au niveau entreprise peut rester conservée dans les données à titre historique mais n’est plus utilisée pour les nouveaux bulletins.

## Vérifications réalisées

- Tests des mois, année suivante, février et formats de période invalides.
- Tests de correspondance SIRET exacte, établissement distinct du siège, absence de correspondance et absence d’affiliation inventée.
- Recherche réelle depuis l’interface avec un SIRET public de démonstration (DINUM), aperçu, reprise des données et enregistrement.
- Choix des caisses et conservation après rechargement.
- Changement de période décembre → paiement au 5 janvier, sans quitter l’écran Entreprise.
- Nouveau bulletin de test : date du 5 affichée correctement ; tests du PDF avec date.
- Tests arithmétiques de paie existants conservés et passants.

## Périmètre conservé

Données de démonstration uniquement, conservées dans le navigateur. Le moteur réglementaire complet reste à développer. La DSN n’est pas développée : Maguy donnera le feu vert pour cette étape. Le code et les documents sont sauvegardés dans GitHub ; l’hébergement est mis à jour séparément.

## Sources techniques officielles

- https://recherche-entreprises.api.gouv.fr/docs/
- https://recherche-entreprises.api.gouv.fr/openapi.json
- https://www.agirc-arrco.fr/nous-connaitre/nos-etudes-et-publications/documentation-institutionnelle/annuaire-agirc-arrco/
- https://www.cibtp.fr/annuaire
