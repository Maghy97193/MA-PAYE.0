# MA PAYE.0 — Reprise du travail

Point de sauvegarde du 11 novembre 2026.

## Objectif confirmé

Logiciel RH ET paie multi-activités, destiné à calculer et produire les bulletins. Le BTP est un module ; il ne définit pas à lui seul le produit.

## Ce qui existe et fonctionne dans l’interface

La démonstration `index.html` : tableau de bord, entreprises fictives, dossiers salariés simples, contrat sommaire (CDI/CDD/apprentissage/autre), saisie heures et prime, validation des variables, tâches, export CSV et sauvegarde JSON. Données uniquement dans le navigateur, sans synchronisation ni serveur de paie.

Interface privée : https://ma-paye-zero-maguy.sprightlygerbil1.chatgpt.site

## Ce qui a été préparé ce soir mais n’est pas intégré à l’interface

`dist/payroll-engine.js` : noyau ARITHMÉTIQUE de test avec décimales contrôlées et arrondis, brut, deux lignes d’heures majorées paramétrables, paniers ventilés, déplacements, transport, acomptes, retenues, lignes de cotisations libres et PAS. Net imposable et net social sont des entrées manuelles de test, pas encore des calculs réglementaires. Aucun taux légal préchargé. Les taux des tests sont fictifs.

`tests/payroll-engine.test.cjs` vérifie les résultats attendus et rejets d’entrées incohérentes. Commande : `node tests/payroll-engine.test.cjs`.

**Ce noyau n’est ni un moteur réglementaire complet, ni un bulletin, ni une fonction déjà disponible sur le site.** Il comporte actuellement deux tranches d’heures ; la troisième tranche +100 % demandée n’est pas encore implémentée. La prochaine version devra utiliser une liste de rubriques de majoration plutôt que deux champs fixes.

## Demande de Maguy à traiter en premier

Lire et compléter l’état `docs/ETAT_COMPLET_DONNEES_PAIE.md` AVANT de figer les écrans. Maguy a signalé les paniers BTP manquants, les contrats insuffisamment détaillés et les lignes HS +25 %, +50 %, +100 %.

## Ordre de reprise

1. Structurer les fiches entreprise, salarié et contrat : nature CDI/CDD distincte du dispositif apprentissage, dates, classification, temps et rémunération.
2. Refaire la préparation mensuelle à partir de l’inventaire : HS 25/50/100 et taux libre, heures complémentaires, absences, primes, paniers, trajet/transport, grands déplacements, Navigo, avantages, acomptes et sorties.
3. Généraliser le noyau de test, ajouter les tests de la tranche 100 % et l’aperçu/impression d’un bulletin avec filigrane TEST ; vérifier les parcours dans le navigateur.
4. Choisir le périmètre réglementaire initial et le moteur (interne ou partenaire). Développer/valider les bases, cotisations et cumuls, net fiscal et net social, PAS et particularités conventionnelles. Comparaison indépendante avant production réelle.
5. Authentification, accès, stockage sécurisé, import/restauration, remise/archivage des bulletins, puis DSN et retours.

## Ne pas perdre les données existantes

Ne pas supprimer la clé navigateur `mapaye-demo-v1` ; migrer les enregistrements en préservant les champs déjà saisis. Garder les données fictives comme exemples, sans dossiers RH réels dans le dépôt public.

## Organisation du dépôt

- `index.html` : copie de la démonstration actuellement hébergée.
- `dist/index.html` : même source pour le déploiement ; les garder identiques tant que le projet n’a pas de génération dédiée.
- `dist/payroll-engine.js` : noyau de calcul de test non branché à l’interface.
- `tests/` : contrôles du noyau.
- `docs/ETAT_COMPLET_DONNEES_PAIE.md` : inventaire cible demandé par Maguy.
- `docs/CAHIER_DES_CHARGES.md` : cahier des charges renommé MA PAYE.0.
- `docs/PREMIERE_VERSION.md` : périmètre de la première démonstration.
- `docs/REPRISE_DEMAIN.md` : présent point de reprise.

GitHub et l’hébergement ne sont pas synchronisés automatiquement. Ce soir, le code de calcul est sauvegardé sans annoncer une mise à jour fonctionnelle du site. Aucun traitement ne continue automatiquement après la fin de la conversation.
