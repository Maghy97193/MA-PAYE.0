# MA PAYE.0 — Calculs automatiques, version 0.7

## Fonctionnalités livrées

- Salaire de base : mode mensuel (salaire contractuel) ou horaire (heures normales × taux). Brut actualisé avec majorations, primes, fractions soumises, avantages et retenues renseignées.
- Paniers : quantité × valeur unitaire, total visible. Seule la fraction soumise saisie rejoint le brut ; le reste est remboursé au net, sans double comptage.
- Transport urbain : remboursement calculé à 50 % du coût d’abonnement éligible. Nouveau mois initialisé depuis la fiche salarié ; le bouton permet de reprendre le prix volontairement. Part éligible ajustable sur justificatif pour les situations particulières. Transport BTP distinct.
- Congés payés employeur : comparaison automatique entre dixième proratisé aux jours pris / droits acquis et maintien calculé sur les heures réelles du mois. Retient le plus favorable. Références et droits fournis par l’utilisateur dans une unité identique. Lorsque le salaire de base inclut les jours de congé, retenue de cette rémunération puis ajout de l’indemnité afin d’éviter le double comptage.
- Mode Caisse CIBTP : conformément à la demande de Maguy, aucune retenue automatique liée à ce mode, aucune indemnité de congés ajoutée au versement employeur. Les opérations de la caisse restent à suivre séparément. Ce choix ne supprime pas les cotisations sociales sur la rémunération employeur.
- Cotisations : préremplissage volontaire d’un socle de taux BTP 2026, profils ouvrier / ETAM / cadre, sans remplacer les lignes existantes. Calcul par ligne des montants salarié et employeur à partir du brut, avec assiettes brut, T1, T2, plafonnement 4/8 plafonds, CSG ou manuelle. Total et assiettes visibles en direct. Modèle limité aux périodes 2026 et confirmation des paramètres avant génération d’un bulletin de test.
- PDF et écran du bulletin : détail des paniers non soumis et du transport urbain, inclus dans le total des frais. Export CSV enrichi ; sauvegarde JSON conservée.

## Paramètres restant à compléter

Ce socle reste une simulation, avant allègements. Pas de moteur de paie réglementaire complet. Les taux AT/MP, mutuelle, prévoyance, FNAL, mobilité, formation/apprentissage, CET selon les cumuls annuels, caisse CIBTP, intempéries et OPPBTP doivent être complétés selon l’entreprise, l’affiliation et les pièces. Aucune valeur inconnue n’est inventée.

Plafond individuel à contrôler (4 005 € par défaut en 2026) et complément CSG à fournir explicitement, y compris zéro justifié. Pas de régularisation annuelle progressive, RGDU, DFS ni exonérations d’heures supplémentaires automatiques. Les assiettes particulières nécessitent une saisie manuelle adaptée. Les contrats d’apprentissage et autres régimes spécifiques ne sont pas couverts par le modèle standard. Net fiscal et net social restent fournis manuellement. La liquidation propre à la CIBTP n’est pas reproduite par la comparaison employeur.

DSN toujours en attente d’une instruction expresse de Maguy. Aucun bulletin définitif ni transmission.

## Vérifications

Six fichiers de tests passent : moteur existant, PDF, entreprise/SIRET, conventions, fiche salarié et nouveaux calculs. Contrôles : arrondis au centime, base mensuelle/horaire, paniers, transport 50 %, congés dixième/maintien/égalité, séparation CIBTP sans retenue, assiettes au-delà du plafond et profils BTP.

Parcours navigateur vérifié avec données fictives : base 2 000 €, 4 h à +25 % au taux de 10 € → brut 2 050 € ; paniers 20 × 12 € → 240 € ; abonnement 90,80 € → 45,40 €. Préremplissage de 15 lignes et calcul des parts salarié/employeur ; comparaison de congés ; enregistrement puis rechargement ; mode caisse sans retenue.

Les données locales et les anciens instantanés de bulletins sont conservés. Les nouveaux calculs concernent les préparations / nouveaux bulletins, sans réécrire les instantanés antérieurs.

## Sources vérifiées le 12 novembre 2026

- Urssaf, taux secteur privé : https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html
- Urssaf, nouveautés 2026 (RGDU et vieillesse) : https://www.urssaf.fr/accueil/actualites/informations-nouvelle-annee.html
- Code de la sécurité sociale, article D242-4 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048852488
- Agirc-Arrco, calcul des cotisations : https://www.agirc-arrco.fr/entreprises/gerer-une-entreprise/calculer-et-declarer/le-calcul-des-cotisations-de-retraite-complementaire/
- FNTP, références BTP et clé ETAM : https://www.fntp.fr/baremes-et-taux-2026/
- Service Public, indemnité de congés payés : https://www.service-public.gouv.fr/particuliers/vosdroits/F33359
- CIBTP, calcul des indemnités : https://www.cibtp-grandest.fr/entreprise/conges-payes/calcul-des-indemnites-de-conge
- Service Public, transport : https://entreprendre.service-public.gouv.fr/vosdroits/F19846
