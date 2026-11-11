# MA PAYE.0 — État des données nécessaires à la paie

Document de conception du 11 novembre 2026. Objectif : un logiciel RH **et de production de bulletins**, multi-activités. Cet inventaire décrit la cible à construire, pas des fonctions déjà disponibles. Les régimes particuliers nécessitent des modules validés ; aucune liste unique ne suffit à couvrir toutes les conventions.

## Lire cet état

- **Socle** : information à prévoir pour les dossiers concernés ; cela ne signifie pas que chaque donnée est une mention légalement obligatoire sur le bulletin.
- **Conditionnel** : à activer selon le contrat, la situation, la convention, le régime ou l’événement.
- **Paramètre** : règle versionnée ou valeur issue d’un organisme, à gérer hors de la saisie mensuelle ordinaire.
- **Calculé** : résultat produit par le moteur, contrôlé et traçable.

Une fiche salarié conserve les informations durables et leur historique. La préparation mensuelle conserve les événements de la période. Le bulletin est produit à partir d’une photographie de ces données et des règles applicables, afin de rester reproductible.

## 1. Dossier entreprise et établissement — préalable indispensable

| Bloc | Champs à prévoir | Usage |
| --- | --- | --- |
| Identité | Raison sociale, adresse, SIREN, SIRET, code APE/NAF, établissement employeur | Bulletin et déclarations |
| Cadre social | Convention(s), IDCC, champ d’application, accords d’entreprise/établissement, territoire, dates d’effet | Sélection des règles ; ne pas déduire toute la convention du seul code APE |
| Effectifs | Effectif pertinent par obligation, historique et franchissement de seuils | Cotisations, réductions et obligations |
| Organisation | Durée collective, catégories de personnel, calendrier, horaires, jours fériés locaux, méthode d’aménagement du temps | Temps et absences |
| Paie | Périodicité, calendrier de clôture, date de versement, mode de paiement, devise, règles d’arrondi | Cycle de production |
| Organismes | Urssaf/MSA selon régime, retraite complémentaire, prévoyance, santé, caisse de congés, références d’affiliation et de contrats | Calcul et DSN |
| Taux propres | AT/MP, versement mobilité et autres paramètres selon établissement, dates et justificatifs | Paramètres datés |
| Couvertures collectives | Contrats santé/prévoyance, catégories, garanties, bases, parts employeur/salarié, dispenses possibles | Cotisations |
| BTP | Caisse CIBTP, adhésion, populations, grilles régionales, zones et accords de déplacement, règles intempéries | Module conditionnel |
| Déclarations | Identité déclarant, habilitations, références DSN, échéances applicables, suivi des retours | Aucun dépôt sans autorisation et validation |
| Comptabilité | Journal, comptes de charges/dettes, axes analytiques et établissements | Export des écritures |

Les barèmes légaux, plafonds, minima conventionnels, taux et formules sont stockés dans un référentiel séparé avec source, version et date d’effet. Ils ne doivent pas être ressaisis arbitrairement chaque mois.

## 2. Fiche salarié — informations permanentes et historiques

### 2.1 Identité et gestion administrative

| Champ ou groupe | Niveau | Précision |
| --- | --- | --- |
| Matricule unique et identifiants internes | Socle | Identité stable malgré changement de nom ou de contrat |
| Nom de naissance, nom d’usage, prénoms | Socle | Distinction utile aux déclarations |
| Date et lieu de naissance, commune/pays, données d’état civil nécessaires à la DSN | Socle | Contrôles de cohérence et de référentiel |
| NIR et clé, ou identifiant temporaire selon les procédures autorisées | Socle déclaratif | Accès restreint ; ne pas bloquer illégalement une embauche pour absence de NIR |
| Adresse et pays de résidence | Socle | Dates des changements |
| Téléphone et courriel de contact | Conditionnel | Gestion RH ; ne pas collecter sans utilité |
| Nationalité et autorisation de travail, dates de validité | Conditionnel | Seulement lorsque nécessaire aux obligations applicables |
| Coordonnées de paiement et titulaire | Conditionnel | IBAN/BIC si virement ; accès restreint et changement contrôlé |
| Droit d’opposition au bulletin électronique, canal de remise | Socle de remise | Date d’information et historique |
| Contacts d’urgence | RH facultatif | Sans incidence automatique sur la paie |

Ne pas collecter de diagnostic médical, de religion ou d’appartenance syndicale. Le statut administratif nécessaire à une obligation liée au handicap est traité séparément et avec accès limité ; il n’est pas une mention du bulletin. La situation familiale n’est pas à collecter systématiquement : l’employeur ne recalcule pas le taux fiscal personnel à partir du foyer.

### 2.2 Contrat et emploi

| Champ ou groupe | Niveau | Précision |
| --- | --- | --- |
| Entreprise, établissement et affectation | Socle | Historique des mutations |
| Identifiant de contrat et avenants | Socle | Plusieurs contrats successifs ou simultanés si périmètre couvert |
| Nature juridique : CDI, CDD, autre nature prise en charge | Socle | Ne pas confondre avec le dispositif de formation |
| Dispositif : apprentissage, professionnalisation, contrat aidé, etc. | Conditionnel | Un apprentissage peut être conclu en CDD ou s’inscrire dans un CDI |
| CDI de chantier/opération et références chantier | Conditionnel | Règles de branche et de rupture propres |
| Dates de signature, début du contrat, entrée effective | Socle | Informations distinctes |
| Fin prévue, terme précis/imprécis, durée minimale et renouvellement | CDD/conditionnel | Motif de recours et pièces justificatives |
| Fin réelle et motif de sortie | Conditionnel | Déclenche les calculs de sortie et les déclarations |
| Période d’essai et renouvellement éventuel | Conditionnel | Dates et limites applicables |
| Ancienneté retenue et reprises d’ancienneté | Socle | Différentes anciennetés si la règle l’impose |
| Poste et emploi, catégorie socioprofessionnelle | Socle | Référentiels déclaratifs selon norme |
| Statut : ouvrier, employé, technicien, agent de maîtrise, cadre, etc. | Socle | Catégorie conventionnelle distincte des affiliations |
| Convention applicable au salarié, niveau, position, échelon, coefficient | Socle | Classifications et minima datés |
| Temps plein/partiel, forfait heures/jours, autre modalité couverte | Socle | Ne pas appliquer un calcul horaire à un forfait jours par défaut |
| Durées hebdomadaire et mensuelle contractuelles | Socle horaire | Quotité de référence et quotité du contrat distinguées pour la DSN |
| Heures supplémentaires structurelles déjà contractualisées | Conditionnel | Séparer du supplément ponctuel pour éviter un double paiement |
| Planning habituel, répartition et aménagement du temps | Socle temps | Annualisation, modulation, cycles, RTT si couverts |
| Centre de coût, équipe, service, chantier/projet | Conditionnel | Affectation analytique sans effet social automatique |

### 2.3 Rémunération et affiliations

| Champ ou groupe | Niveau | Précision |
| --- | --- | --- |
| Salaire mensuel de base, taux horaire ou salaire forfaitaire | Socle | Mode de rémunération, date d’effet et source contractuelle |
| Minimum légal/conventionnel et salaire de référence | Calculé/paramètre | Contrôles adaptés à la population et à la période |
| Primes récurrentes et conditions d’acquisition | Conditionnel | Ancienneté, treizième mois, fonctions, objectifs, etc. |
| Avantages en nature habituels | Conditionnel | Logement, véhicule, repas, évaluations et participation du salarié |
| Régime de Sécurité sociale, régime local, statut particulier | Socle/conditionnel | Affiliations et modalités de calcul |
| Retraite complémentaire et catégorie | Socle | Tranches, références et cas particuliers |
| Santé et prévoyance | Conditionnel | Contrat, option, catégorie, répartition, dates, dispense documentée |
| Taux PAS reçu, nature du taux, référence et date de réception | Conditionnel fiscal | Gestion de sa validité ; grille par défaut selon règles si absence de taux valable |
| Affiliation CIBTP et règles propres | BTP/conditionnel | Pas d’application aux autres secteurs par défaut |
| Paramètres d’exonération, abattement ou déduction spécifique | Conditionnel | Éligibilité, accord lorsque requis, justificatifs, limites et dates |
| Saisies sur rémunération/oppositions et échéanciers | Conditionnel | Procédure, quotité saisissable et rang à calculer selon droit applicable |
| Compteurs CP, RTT, repos, CET | Conditionnel | Droits acquis/pris/restants et historique ; gestion caisse si applicable |
| Cumuls de reprise | Reprise de dossier | Brut, plafonds, bases, cotisations, net fiscal, PAS, HS exonérées, réductions et compteurs depuis le début de l’année |

### 2.4 Apprentissage et autres populations particulières

Prévoir date de conclusion et de début du contrat, type CDD/CDI, dates de formation, CFA, diplôme/titre, cycle et année d’exécution, date de naissance, pourcentage applicable, assiette de référence, précédents contrats utiles au maintien de rémunération, changements d’âge et d’année, règles conventionnelles plus favorables et dates d’effet des exonérations. L’âge et l’année ne suffisent pas à eux seuls à couvrir toutes les situations.

Professionnalisation, stagiaires, mandataires, expatriés/détachés, salariés agricoles, intermittents, particuliers employeurs et agents publics nécessitent des fiches et moteurs adaptés. Un stagiaire ou un mandataire ne doit pas être créé comme un salarié CDI ordinaire pour contourner une absence de module.

## 3. Préparation mensuelle — les variables à saisir ou importer

Chaque ligne porte : salarié + contrat + établissement, période d’activité, période de paie, date/jour ou semaine si nécessaire, rubrique, quantité/unité, taux ou valeur, justificatif/source, auteur, validation et éventuelle période de régularisation. Un montant absent ne vaut pas zéro confirmé.

### 3.1 Présence, heures et majorations

| Ligne de préparation | Saisie attendue | Contrôle nécessaire |
| --- | --- | --- |
| Heures normales / présence | Quantité, dates, planning de référence | Éviter de rajouter les heures normales à un salaire mensualisé déjà dû |
| HS à +25 % | Nombre d’heures, semaine et taux de référence | Taux payé = 125 % de la base éligible |
| HS à +50 % | Nombre d’heures, semaine et taux de référence | Taux payé = 150 % de la base éligible |
| HS à +100 % | Nombre d’heures, fondement de la majoration | Taux payé = 200 % ; activation selon règle applicable |
| HS à un autre taux | Quantité et taux configuré | Accord et minimum applicables ; pas de taux universel unique |
| HS structurelles | Quantités prévues / ajustements | Déjà comprises ou non dans la rémunération contractuelle |
| Heures complémentaires temps partiel | Quantités par tranche et taux | Ne pas les traiter comme HS temps plein ; contrôler limites |
| Travail de nuit | Heures/dates, prime ou repos | Cumul éventuel avec HS selon règles |
| Dimanches | Dates, heures et contrepartie | Pas de doublement automatique universel |
| Jours fériés, dont 1er mai | Dates, travaillé/chômé, heures et contrepartie | Règles propres et éventuels cumuls |
| Astreinte et intervention | Durée d’astreinte, interventions et trajets | Séparer temps de travail et contrepartie d’astreinte |
| Repos compensateur / récupération | Heures acquises et prises, nature | Distinguer remplacement du paiement et contrepartie obligatoire en repos |
| Forfait jours / RTT / CET | Jours/demi-journées, repos et mouvements | Calcul spécifique au forfait et à l’accord |
| Formation / CFA | Dates et heures | Prise en compte du temps de travail selon régime |

**25 %, 50 % et 100 % sont trois rubriques distinctes à prévoir.** Le +100 % est une option conventionnelle/contractuelle à justifier, pas une règle générale du dimanche. Les HS doivent être qualifiées à partir du décompte adapté (souvent hebdomadaire), pas uniquement d’un total mensuel. Les majorations de nuit/dimanche/férié sont enregistrées séparément : une même heure peut ouvrir plusieurs contreparties selon les textes, sans être comptée plusieurs fois comme heure travaillée.

### 3.2 Absences et maintien de salaire

| Événement | Données à recueillir |
| --- | --- |
| Congés payés | Dates, nombre de jours et mode de décompte, droits, indemnité maintien/dixième selon règles ; caisse de congés si applicable |
| RTT, repos, CET | Dates, unités et mouvement des compteurs |
| Maladie / accident non professionnel | Dates, prolongation/reprise, heures/jours prévus non travaillés, maintien et carence |
| AT/MP, accident de trajet | Nature administrative, dates et références utiles ; aucun diagnostic |
| Maternité, paternité, adoption | Dates, maintien et indemnisation |
| Temps partiel thérapeutique | Périodes, durée travaillée/non travaillée et traitement spécifique |
| Sans solde / absence injustifiée | Dates/heures et méthode de retenue |
| Événements familiaux / autorisations rémunérées | Motif administratif et dates, selon droits |
| Activité partielle | Heures non travaillées, motif, autorisation si nécessaire, indemnisation et éventuel complément |
| Intempéries BTP | Dates/heures, conditions et références de prise en charge |
| Autres suspensions | Dates et règle applicable ; libellé de bulletin compatible avec les mentions interdites |
| IJSS | Période, montant attendu/réel, nature, subrogation oui/non, dates et régularisations |

La méthode de retenue pour absence et celle du maintien sont deux règles distinctes. Ne pas déduire systématiquement toutes les absences sur la base de 151,67 heures. Gérer le décalage entre IJSS estimées et reçues.

### 3.3 Primes, frais, paniers et avantages

| Rubrique | Données mensuelles |
| --- | --- |
| Primes | Libellé, montant ou base × taux, période de rattachement, source, condition ; assiduité, rendement, ancienneté, chantier, objectifs, exceptionnelles, treizième mois, etc. |
| Paniers / indemnités de repas BTP | Nombre de jours éligibles, dates, montant unitaire conventionnel, situation de repas/déplacement, montant payé, fraction exonérée et fraction soumise calculées selon règles et justificatifs |
| Trajet BTP | Jours et zones, taux conventionnel, circonstances ; rubrique distincte du transport |
| Transport BTP | Jours, zones/distances, moyen et frais déjà pris en charge |
| Grands déplacements | Lieu, durée, repas, découchers/logement, remboursements et justificatifs |
| Abonnement transport / Navigo | Prix, période, justificatif, quote-part et traitement des absences selon règles |
| Mobilité / kilomètres | Type, distance, véhicule si nécessaire, barème et justificatifs |
| Autres frais professionnels | Nature, date, montant, réel/forfait, justificatif et limite applicable |
| Titres-restaurant | Nombre, valeur, répartition employeur/salarié et non-cumul avec repas pris en charge |
| Avantages en nature | Valeur, jours d’usage, participation du salarié et régularisation ; ajout au brut et déduction au net lorsque requis |
| Épargne salariale et primes à régime spécifique | Nature et dispositif, versement/placement, conditions d’éligibilité et régime applicable |

Ne pas confondre le montant que la convention impose de payer et la limite sociale d’exonération. Le dépassement et les conditions d’éligibilité doivent être traités ; toutes les indemnités de déplacement n’ont pas le même régime. Éviter le double paiement entre frais remboursés hors paie et frais repris sur le bulletin.

### 3.4 Retenues, changements et fin de contrat

| Rubrique | Données mensuelles |
| --- | --- |
| Acompte | Date, montant déjà versé, période et référence ; déduction du net |
| Avance / prêt | Montant, échéancier et retenue autorisée ; régime distinct de l’acompte |
| Saisie sur rémunération | Instruction valide, montant restant et données nécessaires au calcul de la retenue |
| Régularisations | Rubrique d’origine, période, motif, valeur précédente/corrigée, incidence déclarative |
| Entrée en cours de mois | Dates réelles, planning et prorata selon règle applicable |
| Sortie en cours de mois | Date, motif, préavis effectué/dispensé et partie qui dispense |
| CDD | Motif et fin, indemnité de fin de contrat si due ou cause d’exclusion, congés à régler selon dispositif |
| Autres ruptures | Indemnité légale/conventionnelle, préavis, congés, transaction éventuelle et ventilation sociale/fiscale à valider |
| Changements | Avenant salaire/temps/classification, mutation, nouvelle affiliation ou dispense, date d’effet |
| PAS | Nouveau taux reçu et validité ; correction fiscale selon procédure |

## 4. Production de la paie — ce que le moteur doit calculer

| Étape | Sorties / traitements attendus |
| --- | --- |
| Reprise du dossier à la bonne date | Contrat, salaire, convention, taux et affiliations applicables à la période |
| Contrôles de rémunération | Minima, apprentissage, temps, proratas, doublons de variables |
| Construction du brut | Base, heures et majorations, primes, indemnités soumises, avantages et retenues d’absence |
| Assiettes | Brut social/fiscal pertinent, bases plafonnées/déplafonnées, tranches, CSG/CRDS, forfaits et montants fixes selon nature |
| Plafonds et cumuls | Proratisations, régularisations progressives/annuelles et reprises historiques |
| Cotisations | Santé, AT/MP, retraite, famille, chômage, complémentaire, prévoyance/santé et autres contributions selon périmètre |
| Exonérations et réductions | Conditions, bases, limites, réintégrations et régularisations ; HS/apprentis et autres dispositifs selon règles datées |
| Congés et absences | Droits, retenue, maintien, indemnités, IJSS et subrogation |
| Net avant impôt | Cotisations salariales, avantages à déduire, frais, acomptes et retenues non sociales |
| Net imposable et net social | Deux calculs propres, distincts du net payé ; ne pas utiliser un pourcentage global du brut |
| PAS | Base fiscale, taux valable ou grille applicable, montant, type de taux et référence |
| Net à payer | Montant restant à verser après PAS et autres retenues, contrôle des montants négatifs |
| Coût employeur | Brut, charges patronales, réductions, remboursements et autres coûts selon indicateur explicitement défini |
| Cumuls et compteurs | Bases, cotisations, fiscal, PAS, HS exonérées, congés, repos et historique annuel |
| Régularisations et clôture | Traçabilité, bulletin rectificatif si nécessaire, impacts DSN, pas d’écrasement silencieux d’un bulletin émis |

Les montants sont arrondis selon la règle propre à chaque rubrique. Chaque résultat doit permettre de retrouver données, formule, source, version et arrondi. Un taux global approximatif de « charges » n’est pas un moteur de paie utilisable.

## 5. Contenu cible du bulletin et sorties associées

- Identité/adresse employeur, SIRET, APE, convention ; nom, emploi et classification du salarié.
- Période, date de paiement, base horaire ou forfait ; heures normales et majorées avec leurs taux, accessoires de salaire et brut.
- Cotisations présentées selon les rubriques réglementaires : assiettes, taux et montants requis, parts salariales/patronales, exonérations et total employeur selon présentation applicable.
- Autres versements et retenues : frais, avances/acompte, avantages et autres éléments traités.
- Net à payer avant impôt, net imposable, montant net social, PAS et net effectivement payé.
- Cumuls fiscaux, PAS et heures complémentaires/supplémentaires exonérées requis ; autres cumuls utiles clairement identifiés.
- Congés et activité partielle lorsque concernés ; mentions finales obligatoires, accès à la rubrique officielle et conservation sans limitation de durée.
- Aucun motif de grève ni d’activité de représentation du personnel sur le bulletin ; libellés conformes aux interdictions applicables.
- PDF, remise et archivage conformes, journal de paie, état des charges, écritures comptables, données de paiement et DSN. Ce sont des sorties distinctes ; produire un PDF ne vaut pas payer le salaire ou transmettre une DSN.

Le NIR et le RIB ne sont pas des mentions obligatoires à afficher sur le bulletin : limiter leur diffusion. La fiche contient davantage d’informations que le bulletin.

## 6. Contrôles à prévoir avant le bouton « Produire »

1. Contrat, convention, classification, salaire et dates cohérents ; paramètres manquants ou périmètre non couvert bloquants.
2. Heures justifiées ; pas de doublon structurelles/ponctuelles ; calcul hebdomadaire ou dispositif d’aménagement validé ; temps partiel traité séparément.
3. Absences et congés cohérents ; IJSS/subrogation et compteur caisse rapprochés.
4. Paniers et déplacements justifiés ; pas de double indemnisation ; soumission sociale déterminée selon nature.
5. Cotisations, plafonds, taux propres et exonérations contrôlés ; cumuls de reprise complets.
6. Net fiscal, net social, PAS et net payé calculés indépendamment et rapprochés.
7. Contrôle des écarts avec le mois précédent et validation par un gestionnaire identifié.
8. Clôture avec photographie des règles/données ; PDF, sauvegarde et piste d’audit ; déclaration uniquement après contrôles et habilitation.

## 7. Parcours à construire dans MA PAYE.0

**Entreprise → fiche salarié/contrat → préparation mensuelle → contrôles → calcul → aperçu du bulletin → validation → émission et archivage → déclarations et retours.**

Les écrans doivent proposer des rubriques adaptées au profil, tout en autorisant une recherche dans le catalogue. Prévoir import des variables, corrections, pièces manquantes, édition en masse et accès à l’explication du calcul. Pas de case « validé » qui masque une règle non couverte.

## 8. Sources officielles et limites

Vérification documentaire au 11 novembre 2026. Les taux et règles seront vérifiés à nouveau pour chaque version de calcul ; cet état n’est pas une certification de conformité.

- Bulletin : https://www.service-public.gouv.fr/particuliers/vosdroits/F559
- Heures supplémentaires : https://www.service-public.gouv.fr/particuliers/vosdroits/F2391
- Travail le dimanche : https://www.service-public.gouv.fr/particuliers/vosdroits/F13887
- Apprentissage : https://www.service-public.gouv.fr/particuliers/vosdroits/F2918
- Frais professionnels : https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/frais-professionnels.html
- PAS : https://www.service-public.gouv.fr/particuliers/vosdroits/F34732
- Quotités DSN : https://net-entreprises.custhelp.com/app/answers/detail_dsn/a_id/115
- Norme et maintenance DSN : https://www.net-entreprises.fr/declaration/norme-et-documentation-dsn/
- RGPD/paie : https://www.cnil.fr/fr/cnil-direct/question/paye-des-employes-que-faire
