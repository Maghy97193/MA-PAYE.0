# Recette pilote — octobre 2026

Test exécuté le 14 novembre 2026 sur la version 35, source hébergée `f3276a1630b32a2a71c22e1a63291819abc93f82`. Interface testée sur une copie locale de l’application avec une fiche « Cas octobre TEST ». Aucune donnée d’identité réelle, adresse, numéro de sécurité sociale ou pièce personnelle n’est enregistrée dans ce dépôt. Les dossiers du site hébergé n’ont pas été modifiés par cette recette.

## Paramètres

- Entrée confirmée : 19/10/2026.
- Fin prévue extraite du contrat : 15/11/2026, à confirmer avant la paie de sortie.
- CDD, ouvrier exécutant OE1, 35 h par semaine, lundi–vendredi 7 h.
- Référence mensuelle : 151,67 h ; salaire mensuel contractuel : 1 867,02 €.
- Taux horaire de comparaison utilisé dans les tests précédents : 12,31 €, à rapprocher du contrat.
- Congés de départ fournis : N−1 16 jours, N 0 ; unité ouvrable retenue pour la recette, à confirmer avec la caisse. Aucun congé pris dans le scénario.
- PAS fourni : 0 %. Abonnement Navigo octobre : aucun, remboursement 0 €.
- Paniers, déplacements, complémentaire santé, prévoyance et paramètres sociaux spécifiques : non documentés. Leurs zéros de démonstration ne constituent pas une confirmation de non-droit ou d’exonération.

## Vérifications exécutées dans l’interface

| Contrôle | Résultat observé |
| --- | --- |
| Import du relevé préparé | 13 dates importées, du 19 au 31 octobre ; 10 journées à 7 h et 3 jours de repos |
| Semaine 4 du mois, 19–25 octobre | 35 h |
| Semaine 5 du mois, 26 octobre–1er novembre | 35 h pour octobre |
| Total mensuel | 70 h normales ; aucune heure majorée dans le scénario |
| Dates antérieures à l’entrée | Hors contrat, saisie désactivée |
| Semaine à cheval | Le transfert exige aussi le 1er novembre. Repos à zéro confirmé pour le scénario uniquement ; à vérifier sur le relevé suivant pour une paie réelle |
| Transfert en préparation | 70 h dans les champs d’origine du suivi ; variables remplacées |
| Second transfert identique | Message « Ces heures sont déjà transférées. Aucun ajout. » |
| Acquisition automatique d’octobre | 1,25 jour, calcul sur 10 jours au planning / équivalence 20 jours, soit 50 % de 2,5 jours |
| Compteurs | N−1 16,00 ; N 1,25 ; pris 0 ; solde total 17,25 jours |
| Transport | Remboursement Navigo 0 € |
| PAS | Taux fourni de 0 enregistré. Le montant final n’a pas été validé sur un bulletin, faute de nets et de cotisations complets |
| Bulletin test | Génération bloquée : net imposable de test, net social de test et au moins une ligne de cotisation manquants. Aucun montant de net n’a été inventé pour franchir ce contrôle |
| Préparation DSN | Le salarié entré le 19 octobre est bien présent ; aucun bulletin choisi, aucune génération ni transmission disponible |

## Écart à expliquer sur le brut

Deux méthodes donnent des résultats différents et ne doivent pas être confondues :

1. **Mode mensuel du contrat** : 1 867,02 € × 70 h / 154 h = **848,65 €** hors primes. Le mois complet compte 22 journées à 7 h. Les heures hors contrat représentent 84 h dans ce planning réel. La référence mensualisée de 151,67 h reste une donnée contractuelle, distincte du diviseur du mois réel.
2. **Mode horaire comparatif** : 70 h × 12,31 € = **861,70 €** hors primes. Observé dans le formulaire, puis annulé afin de conserver le mode mensuel du contrat.

Le résultat horaire ne suffit pas à valider la paie d’un salarié mensualisé. De plus, 151,67 × 12,31 = 1 867,06 € après arrondi, et non 1 867,02 €. Rapprocher les références de rémunération et confirmer le traitement contractuel avant établissement du bulletin réel.

Référence du principe de retenue sur horaire réel : Cour de cassation, pourvoi 80-40.359, https://www.courdecassation.fr/decision/6079b0c59ba5988459c50335 . La présence d’une règle conventionnelle ou contractuelle plus favorable reste à examiner.

Référence des équivalences d’acquisition de congés : https://www.service-public.gouv.fr/particuliers/vosdroits/F18260?lang=fr . Le compteur de test n’est pas une validation des droits portés par la CIBTP. Les fractions sont conservées en cours de cycle ; contrôler l’arrondi du droit cumulé à la clôture ou à la fin effective du contrat.

## Compatibilité du fichier fourni

Le classeur original est un relevé présenté avec titre, informations de salarié, formules et durées Excel. L’import actuel requiert un tableau à en-têtes en première ligne et des valeurs, et refuse les cellules avec formules. Il n’a donc pas été annoncé comme directement compatible.

Une copie CSV anonymisée a été préparée à partir des dates et des valeurs calculées des lignes 11 à 23, en convertissant les fractions de jour Excel en heures décimales. Total contrôlé : 70 h. Le fichier d’origine est conservé intact. La fixture CSV est dans `tests/fixtures/october-pilot-hours.csv`.

## Ce qui reste nécessaire

1. Confirmer la convention collective, le régime CIBTP et le cycle de congés, les 16 jours reportés, les paniers et déplacements réellement dus, et les références de salaire.
2. Compléter et contrôler cotisations, assiettes, plafonds d’entrée en cours de mois, taux AT/MP notifié, mutuelle/prévoyance, allègements et nets réglementaires. Les taux de démonstration de l’établissement ne sont pas ceux de l’employeur réel.
3. Développer et valider le moteur de paie complet, les nets, la correspondance NEODeS, la génération DSN, DSN-Val et le traitement des retours. La préparation DSN existante est un inventaire, pas un fichier déclaratif.

La recette est donc **réussie pour l’import préparé, les totaux, le transfert sans doublon et les compteurs de ce scénario** ; **incomplète pour un bulletin final et une DSN déclarable**. Aucun document ne doit être remis comme bulletin conforme à partir de ce test.

## Reproduction

`node --test tests/*.test.cjs`

Le fichier `tests/october-pilot.test.cjs` vérifie le relevé, les deux méthodes de salaire, les congés et l’inclusion dans la préparation DSN. Les manipulations d’interface décrites ci-dessus ont été réalisées séparément ; les tests automatisés ne constituent pas à eux seuls une recette visuelle ou une certification réglementaire.
