# MA PAYE.0 — Avancement du 12 novembre 2026

## Version 0.3 : préparation détaillée et bulletins de test

L’objectif reste la production de bulletins de paie réglementaires multi-activités. La version actuelle sert à tester les données, le parcours et l’arithmétique ; elle ne permet pas encore une paie réelle.

### Disponible dans l’interface

- Paramètres de l’entreprise : identité, convention, caisse et organismes à renseigner.
- Fiche salarié étendue : matricule, identité de test, emploi, catégorie, classification, convention, contrat CDI/CDD/CDI de chantier, dispositif d’apprentissage ou professionnalisation distinct, dates de contrat, ancienneté, temps de travail et rémunération, CFA et paramètres de formation, affiliations à vérifier.
- Préparation mensuelle : salaire de base, heures normales à titre informatif, HS à +25 %, +50 %, +100 %, autre taux, heures complémentaires, primes de nuit/dimanche/férié, absence, retenue manuelle, congés/maintien, suivi informatif des IJSS, paniers, trajets, transports BTP, grands déplacements, Navigo, frais, avantages, acomptes et autres retenues.
- Cotisations de test : lignes et assiettes saisies manuellement, taux salarié et employeur.
- Calcul de simulation : brut, lignes de cotisations, frais, acomptes, PAS et net à payer. Net imposable et net social restent fournis manuellement pour le test.
- Bulletins de test conservés comme photographies datées dans le navigateur, aperçu, PDF téléchargeable, impression et export JSON du calcul.
- Export CSV enrichi des variables. Sauvegarde globale JSON conservée.

### Tester le parcours

1. Ouvrir https://ma-paye-zero-maguy.sprightlygerbil1.chatgpt.site
2. Aller dans « Préparation paie » et choisir l’entreprise/le mois.
3. Cliquer « Charger un exemple fictif », puis « Enregistrer ». Cela ajoute un salarié de test sans remplacer les autres dossiers.
4. Sur la ligne « Exemple bulletin TEST », cliquer « Préparer » pour voir les variables ou « Bulletin test » pour générer le résultat.
5. Dans le bulletin, télécharger le PDF de test. Retrouver ensuite le document dans « Bulletins de test » pour la même entreprise et période.

### Vérifications effectuées

- Tests arithmétiques : résultats de référence, centimes, HS 25/50/100, avantages en nature, absence de double comptage des heures, rejets de taux et montants incohérents.
- Tests PDF : signature, table des offsets, génération avec accents et pagination longue ; fichier reconnu par Poppler, texte extrait et rendu visuel A4 inspecté.
- Dans le navigateur : ajout d’un jeu fictif, génération d’un bulletin (brut 2 220 €, net de simulation 1 943 € avec les taux fictifs du jeu), conservation après rechargement, modification d’un CDD en apprentissage et enregistrement de paniers/majorations.
- La boîte d’impression du navigateur n’a pas été confirmée dans l’environnement de test ; le téléchargement PDF direct ne dépend pas de cette boîte.
- Affichage sur iPad et téléchargement réel sur iOS restent à vérifier sur l’appareil cible.

### Limites à traiter avant paie réelle

Aucun moteur de cotisations réglementaires complet, aucun barème officiel préchargé, aucune détermination automatique du net fiscal/social, des exonérations, réductions, plafonds, cumuls annuels ou minimum apprentissage. Pas de calcul automatique des IJSS, absences complexes, maintien ou indemnités de rupture. Pas de DSN, ni paiement, ni remise réglementaire du bulletin.

Pas de collecte de NIR/RIB ou de pièces sensibles dans cette démonstration. Les données restent dans le navigateur, sans synchronisation entre appareils. La restauration JSON par import reste à construire. Le suivi documentaire est descriptif ; pas de stockage de pièces.

La majoration +100 % est une rubrique à justifier selon les règles applicables, pas un doublement universel du dimanche. Les ventilations des paniers et déplacements sont manuelles et à contrôler.

### Trois priorités suivantes

1. Vérifier les écrans avec Maguy et compléter les lignes manquantes à partir de l’inventaire détaillé.
2. Définir un premier périmètre conventionnel et choisir le moteur réglementaire (interne ou partenaire), puis constituer les cas de comparaison indépendants.
3. Structurer les règles datées, cotisations et cumuls, la sécurité et la restauration avant toute utilisation réelle.

## Sources du code

`dist/` contient les fichiers servis. `index.html` à la racine utilise les mêmes scripts de `dist/`. Les tests s’exécutent avec :

```
node tests/payroll-engine.test.cjs
node tests/payroll-pdf.test.cjs
```

GitHub : https://github.com/Maghy97193/MA-PAYE.0

L’hébergement et GitHub ne sont pas synchronisés automatiquement. La version 0.3 doit être déployée après les vérifications ; son succès de publication est confirmé séparément dans la conversation.
