# Reprise — MA PAYE.0 version BTP

Sauvegarde du 14 novembre 2026, branche `ma-paye-0-version-btp`, issue du commit `f034bd3f19511f928fa2bb22006ab6b63b4a2c28` de main.

## Décisions conservées

- Marque Solutions.0 (pluriel), gamme BTP.
- Produits BATI.0 et MA PAYE.0 — version BTP.
- Ne pas renommer ou modifier BATI.0 tant que son organisation de référence n’est pas confirmée. Le rapprochement de la branche existante 01-SOLUTION/02-TEST reste à clarifier.

## Travail sauvegardé

Fiche établissement structurée (caisses, AT/MP, médecine du travail puis paiement), blocs compacts et fonds clairs, listes de caisses, fiche salarié et contrats, préparation et bulletins de test, suivi des congés, préparation DSN. Feuille d’heures journalière par salarié avec sous-totaux hebdomadaires et mensuels, import XLSX/CSV avec aperçu, transfert validé des variables sans ajout en double. Marque BTP sous le logo et bouton Connexion & abonnement sous Préparation DSN.

## Limites et suites

1. Connexion e-mail : écran préparé et désactivé ; choisir un service sécurisé compatible et un hébergement approprié. Aucun compte e-mail opérationnel ni mot de passe stocké dans le navigateur.
2. Validation mobile par les ouvriers : idée étudiée, non réalisée ; requiert comptes individuels, données partagées et autorisations par salarié.
3. Liaison BATI.0 : en attente de la vérification de Maguy sur le lieu et le format d’enregistrement des heures. Prévoir ensuite un export/import avec rapprochement du salarié, des dates et du chantier avant toute liaison directe.
4. Barèmes et cotisations : référentiel avec sources et dates d’effet à construire ; aucune collecte automatique, ni mise à jour des salaires ou paniers, n’est activée. Conserver corrections manuelles et historique.
5. Majorations : qualification par le gestionnaire. Le suivi ne décide pas seul des heures supplémentaires, complémentaires ou du traitement des congés. Le transfert conserve la base mensualisée et les bulletins historiques.

## Vérifications déjà faites

Huit tests automatisés passés. Recette navigateur de la saisie, des totaux, d’un vrai XLSX contenant des durées Excel, de l’aperçu et du transfert sans doublon. Contrôle visuel de l’ordre DSN puis Connexion. La dernière version Sites sauvegardée est la 30 (brouillon) ; le site précédemment mis en ligne est la 28. La création de cette branche ne déploie rien et ne modifie pas main.
