# Reprise — DSN fictive d’octobre 2026

Arrêt demandé par l’utilisatrice le 14 novembre 2026. Reprise lors de sa prochaine demande, sans tâche automatique.

## État sauvegardé

- Application privée actualisée, version 38 ; paramètres de cotisations et import Excel/CSV disponibles ; libellé URSSAF en majuscules.
- Code sauvegardé sur la branche `ma-paye-0-version-btp`.
- Le module DSN actuel assure uniquement la préparation documentaire et le rapprochement avec les bulletins de test. Il ne génère pas encore de fichier NEODeS.
- Aucun fichier DSN généré, validé avec DSN-Val ou transmis. Aucun paiement exécuté.

## Scénario confirmé

- EBS RENOV’, octobre 2026 ; salarié anonymisé.
- Entrée 19/10/2026 ; 70 heures à 12,31 € : 861,70 € de salaire brut de base.
- Panier unitaire 10,40 €. Après proposition de 10 paniers (104 €), l’utilisatrice indique que le reste est bon : reprendre ce nombre comme confirmation conversationnelle, à rapprocher du relevé avant toute paie réelle.
- Aucun abonnement Navigo en octobre ; PAS 0 %.
- Congés N−1 : 16 jours ; N avant acquisition : 0 ; acquisition automatique de test : 1,25 jour, à contrôler avec la caisse.
- AT/MP : 6,16 %, code risque 454LE ; effet 01/01/2026, notification 08/01/2026, selon export reçu.
- Taux PRO BTP fournis : confirmation globale de l’utilisatrice pour le scénario, mais date d’effet documentaire à obtenir pour un usage réel.

## Points restant à traiter

1. Régularisation éventuelle mutuelle et prévoyance auprès de PRO BTP : affiliation omise signalée ; garanties, date d’effet et répartition à confirmer. Ne pas présenter une couverture rétroactive comme acquise.
2. Identifiant communiqué : format compatible avec un NTT, distinct d’un NIR/NIA. Ne conserver aucun identifiant personnel dans les sources, fixtures ou documentation GitHub ; utiliser un identifiant entièrement fictif dans les exports de recette.
3. Vérifier les dates de fin de contrat avant de tester novembre : la fin présente dans la fiche pilote reste une hypothèse de recette.
4. Développer un export de test explicite, sa correspondance avec la norme 2026 et les contrôles de cohérence bulletin/DSN. Distinguer contrôles locaux et validation officielle DSN-Val, non exécutée.
5. Fournir un fichier et un rapport de test consultables. Aucun dépôt à Net-entreprises, aucune transmission aux organismes. La demande d’immatriculation Assurance maladie est une démarche séparée.

## Confidentialité

Les originaux du bulletin d’août et du contrat ont été placés dans la corbeille à la demande de l’utilisatrice ; leurs copies locales de travail ont été supprimées. Ne pas les réintroduire. La présente note ne contient aucune identité civile, date de naissance ni numéro d’identification du salarié.
