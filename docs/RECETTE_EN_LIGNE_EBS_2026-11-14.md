# EBS RENOV’ — recette disponible en ligne

## Périmètre et confidentialité

Mise à jour autorisée le 14 novembre 2026 : entreprise affichée EBS RENOV’, dossier de recette d’octobre disponible depuis un bloc dédié. Le salarié de recette est anonymisé. Le nom réel, le NIR, la naissance, l’adresse personnelle et les pièces fournies ne sont pas intégrés au code ni au dépôt GitHub.

Le bulletin de référence d’août et le contrat ont été placés dans la corbeille à la demande de l’utilisatrice après extraction des paramètres. Les copies locales et l’image de lecture du bulletin ont été supprimées. La commande de suppression disponible ne vide pas définitivement la corbeille et n’efface pas les messages de la conversation.

L’installation conserve les autres fiches, variables, documents et taux. Elle renomme la société de démonstration « Atelier Horizon · BTP » en EBS RENOV’ lorsqu’elle est encore présente. Si l’entreprise a déjà été personnalisée sous un autre nom, un dossier EBS distinct est ajouté. Le cas pilote et son installation sont identifiés de façon stable pour éviter les doublons. Les consultations suivantes conservent les modifications du cas pilote.

## Données actuelles retenues

- Entrée du nouveau contrat : **19/10/2026**. La date de février figurant sur le bulletin d’août ne remplace pas cette entrée.
- Mode horaire demandé : **70 × 12,31 € = 861,70 €**, sans second prorata.
- Congés N−1 : **16 jours** ; N avant acquisition : **0** ; acquisition calculée : **1,25 jour** ; solde du scénario sans congé pris : **17,25 jours**.
- Aucun abonnement Navigo en octobre ; taux PAS **0 %**.
- Panier unitaire actualisé par l’utilisatrice : **10,40 €**. La quantité n’est pas confirmée : le scénario de départ la laisse à zéro et l’indique expressément. Un test séparé vérifie dix paniers à 10,40 €, sans les présumer dus.
- Taux de cotisation repris du bulletin de référence d’août, confirmés inchangés par l’utilisatrice.

## Cotisations de référence copiées pour le cas pilote

| Rubrique | Salarié % | Employeur % |
| --- | ---: | ---: |
| Solidarité autonomie | 0 | 0,300 |
| Maladie et complément | 0 | 7,000 + 6,000 |
| Vieillesse plafonnée | 6,900 | 8,550 |
| Vieillesse déplafonnée | 0,400 | 2,110 |
| Allocations familiales et complément | 0 | 3,450 + 1,800 |
| Dialogue social | 0 | 0,016 |
| AT/MP — effet 01/01/2026 | 0 | **6,160** |
| FNAL | 0 | 0,100 |
| Chômage | 0 | 4,000 |
| AGS | 0 | 0,250 |
| Retraite complémentaire T1 | 3,150 | 4,720 |
| CEG T1 | 0,860 | 1,290 |
| CIBTP — congés payés | **0** | **19,600** |
| OPPBTP | 0 | 0,110 |
| FPC Constructys conventionnelle | 0 | 0,420 |
| APNAB | 0 | 0,150 |
| CCCA-BTP | 0 | 0,300 |
| CSG déductible | 6,800 | 0 |
| CSG non déductible et CRDS | 2,900 | 0 |
| Taxe d’apprentissage | 0 | 0,590 |
| Formation professionnelle continue | 0 | 0,550 |

Les assiettes majorées de 11,5 % (FNAL et lignes de formation concernées) et 13,14 % (OPPBTP) correspondent au rapprochement du bulletin de référence. Elles restent visibles comme assiettes manuelles de test dans la préparation. Référence OPPBTP : https://www.cibtp.fr/media/commun/1_Documents/adhesion-cotisation/ac_tableau-assiettes-cotisations.pdf .

Les montants de réduction générale et de TEPA d’août ne sont pas réutilisés pour octobre. Le scénario ne comporte pas d’heures supplémentaires. La RGDU et les paramètres annuels doivent être calculés séparément avant une paie réelle : https://www.urssaf.fr/accueil/employeur/beneficier-exonerations/reduction-generale-cotisation.html .

## Résultats du scénario initial, hors panier et avant allègements

| Contrôle | Résultat de test |
| --- | ---: |
| Brut | **861,70 €** |
| Assiette CSG / CRDS, complément zéro dans le scénario | 846,62 € |
| Cotisations salariales saisies | 179,58 € |
| Cotisations patronales saisies, avant allègements et paramètres absents | 583,00 € |
| AT/MP exclusivement employeur | 53,08 € |
| CIBTP exclusivement employeur | 168,89 € |
| Net technique avant et après PAS zéro, hors frais | 682,12 € |
| Net imposable technique du scénario simplifié | 706,67 € |
| Net social technique du scénario simplifié | 682,12 € |

Ces nets sont calculés dans la photographie technique du bulletin, sans écraser les champs de nets à valider dans la préparation réelle. Le PDF et l’écran portent les hypothèses et la mention « TEST — NON UTILISABLE POUR UNE PAIE RÉELLE ».

## Chaîne testée

1. Relevé : 70 h et deux sous-totaux de 35 h, entrée du 19 octobre conservée ; second transfert sans ajout.
2. Préparation : mode horaire, droits de congés automatiques, prix du panier 10,40 €, absence de Navigo.
3. Calcul du bulletin de simulation : taux copiés, assiettes et arrondis par ligne, parts CIBTP et AT/MP salariales nulles.
4. Génération et téléchargement du PDF : fichier PDF A4 de deux pages ouvert, texte et rendu vérifiés, montants et compteurs présents.
5. Rattachement explicite de cette simulation à la préparation DSN : une version choisie pour le salarié anonymisé, brut rapproché 861,70 €.
6. La génération NEODeS, DSN-Val et la transmission restent indisponibles. Aucun dépôt ni paiement n’est exécuté.

Les nouveaux boutons permettent de rouvrir la préparation, de voir/télécharger le bulletin de simulation et de le rattacher au dossier DSN. Une nouvelle simulation après correction crée une révision et conserve la précédente. Les autres bulletins ne sont pas remplacés.

## Limites restantes

Quantité et régime social des paniers à confirmer ; notification et code risque AT/MP à renseigner ; application des bases majorées, des plafonds, des droits CIBTP et des organismes à contrôler. Mutuelle, prévoyance, santé au travail, intempéries et allègements à documenter si applicables. Le coût patronal affiché est avant allègements, pas le coût définitif. L’identité DSN sécurisée et le moteur déclaratif restent à construire.

Reproduction : `node --test tests/*.test.cjs`. Tests dédiés : `tests/october-online-pilot.test.cjs`. Fichiers applicatifs : `dist/october-pilot.js` et `dist/october-pilot-ui.js`.

## Correction du taux AT/MP enregistré

La fiche entreprise enregistrée est prioritaire sur le bulletin historique : **6,16 % avec effet au 01/01/2026**, selon la correction explicite de l’utilisatrice. Le pilote ne force plus le taux 6,48 % d’août lors de la génération. Il lit le taux et sa période de validité dans la fiche entreprise et les photographie dans le bulletin de test. Les autres taux ne sont pas modifiés. La correction du pilote précédent conserve les anciens bulletins et crée une nouvelle simulation lors de la prochaine ouverture. Cotisation AT/MP : **861,70 × 6,16 % = 53,08 € employeur**, part salarié zéro. Les cotisations patronales saisies deviennent **583,00 € avant allègements** ; les montants salariés et le net technique restent identiques.


## Import AT/MP et feuille PRO BTP reçus après la première correction

Le CSV confirme le code risque **454LE** et distingue effet **01/01/2026**, décision **12/12/2025** et notification **08/01/2026**. La date du 8 janvier citée initialement par l’utilisatrice est la notification. L’onglet Paramètres et les lecteurs d’import sont documentés dans `IMPORT_DONNEES_ORGANISMES.md`. La feuille PRO BTP ajoute des informations de prévoyance et un forfait santé qui n’étaient pas visibles sur le bulletin historique : ils restent dans un catalogue à confirmer, sans modifier silencieusement le bulletin de test initial.
