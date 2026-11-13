# Plan du module DSN et informations à réunir
MA PAYE.0 — préparation du 13 novembre 2026 — document de travail non publié sur le site.

## Objectif et ordre de travail
Préparer une DSN à partir de données de paie validées, identifier les pièces manquantes, produire un fichier normé de test, contrôler ses retours puis organiser les corrections et le dépôt. Les bulletins actuels de démonstration ne constituent pas, à eux seuls, une paie réglementaire validée.

1. Constituer un dossier pilote : une entreprise, un établissement, un salarié et un mois, puis vérifier le bulletin et ses assiettes.
2. Construire le dossier DSN et les contrôles : entreprise, établissement, individu, contrat, versement, rémunérations, bases et cotisations. Distinguer données présentes, manquantes, à vérifier et confirmées.
3. Associer chaque rubrique de paie aux rubriques NEODeS de la norme applicable ; préparer la génération mensuelle, les identifiants stables, versions, régularisations et annule-et-remplace.
4. Générer un fichier de test ; vérifier avec DSN-Val ou la brique de contrôle, tester le dépôt sur le circuit approprié et exploiter les certificats, bilans et comptes rendus métier (CRM). Un certificat de conformité technique ne dispense pas de lire les CRM.
5. Ajouter les signalements : arrêts, reprises anticipées, fins de contrat (FCTU), ainsi que les éléments d’amorçage nécessaires à l’embauche selon le périmètre retenu.
6. Préparer le fonctionnement réel après recette : habilitations, dépôt manuel initial ou intégration ultérieure, archivage, traçabilité, sauvegarde, traitement des rejets et suivi des échéances.

Avant toute collecte de NIR et de coordonnées bancaires réels : espace sécurisé, droits d’accès, protection des données, sauvegarde et politique de conservation à mettre en place. Pour le dossier pilote, fournir des pièces anonymisées, sans NIR ni IBAN ni mot de passe. Pour une DSN réelle, les données d’identification réglementaires devront être renseignées dans l’espace sécurisé.

## Premier envoi utile
- Entreprise pilote et mois à traiter ; préciser s’il existe plusieurs établissements.
- Un bulletin validé servant de référence et le bulletin MA PAYE.0 à comparer.
- Contrat de ce salarié et avenants applicables.
- Relevé d’heures / absences / paniers / transport du mois.
- Dernière DSN acceptée et CRM disponibles, si une DSN existe déjà ; indiquer le logiciel qui la produit.
- Fiches de paramétrage DSN mutuelle / prévoyance et caisse CIBTP ; notification du taux AT/MP.
Indiquer « à demander » si une pièce manque. Le fichier DSN lui-même contient des données personnelles : transmettre un exemple anonymisé pour l’étude ou réserver sa consultation au futur espace sécurisé.

## 1 Entreprise établissement et déclarant
À réunir : raison sociale, SIREN, SIRET de chaque établissement, adresses, code APE, IDCC applicables, régime de protection sociale, effectif pertinent, périodicités et échéances déclaratives connues, date habituelle de paiement des salaires, identité du déclarant et qualité employeur / tiers déclarant.
Pièces : extrait d’immatriculation ou fiche établissement, références d’affiliation, mandat éventuel du tiers déclarant et ancien paramétrage DSN.
La date de salaire fixée au 5 dans MA PAYE.0 ne fixe pas automatiquement l’échéance DSN. L’échéance applicable au 5 ou au 15 doit être confirmée selon la situation de l’entreprise et le calendrier officiel.

## 2 Organismes et paiements
À réunir : URSSAF ou MSA, retraite complémentaire, mutuelle, prévoyance, assurance chômage selon le régime, PRO BTP si applicable, CIBTP si applicable, références d’adhésion et de contrats, populations / options, établissements de rattachement, dates d’effet, périodicités et modalités de paiement.
Pièces : fiches de paramétrage DSN des organismes complémentaires, documents d’affiliation et notifications de taux.
Taux AT/MP : notification de l’établissement et période de validité, notamment pour confirmer les 6,48 % évoqués. Ce taux ne doit pas devenir un taux BTP universel.
Coordonnées bancaires, mandats et habilitations : à recueillir uniquement dans le circuit sécurisé prévu pour le dépôt réel.

## 3 Salarié
À réunir pour le dossier complet : matricule stable, nom de naissance, nom d’usage, prénoms d’état civil, données de naissance et d’identification requises par la norme, adresse, régime et statut particuliers si applicables. NIR ou identifiant provisoire / NTT selon la situation à traiter par les règles adaptées.
Pour le premier test : utiliser « Salarié A » et indiquer seulement si ces informations sont disponibles. Ne pas envoyer de NIR réel dans la conversation ni le stocker dans la démonstration actuelle.

## 4 Contrat
À réunir : numéro / identifiant stable, établissement employeur, nature du contrat, dispositif, date d’entrée, ancienneté reprise, fin prévue et fin réelle, motif du CDD et motif de sortie distincts, terme précis ou durée minimale, temps plein / partiel, unité de durée, quotités contractuelle et de référence, emploi, classification, statut catégoriel et données DSN nécessaires à la retraite / prévoyance, IDCC.
Pièces : contrat signé, avenants et documents de sortie s’il y a lieu.
Cas déjà connu : entrée le 19/10/2026 ; référence 151,67 h ; présentation demandée de 81,67 h déduites et 70 h rémunérées à 12,31 €, soit 861,70 € de base. Vérifier le contrat et la méthode de paie applicable avant d’utiliser ce cas comme référence de recette réglementaire.

## 5 Paie du mois et historique
À réunir : bulletin définitif de référence, période et date de versement, base, heures normales / supplémentaires / complémentaires, primes, paniers soumis et non soumis, trajets, transport, congés, absences, indemnités, avantages en nature, acomptes et retenues.
Montants et paramètres : brut, bases plafonnées / déplafonnées, CSG/CRDS, cotisations individuelles et agrégées, plafonds, SMIC de référence, réductions / exonérations applicables, net imposable, montant net social, net versé, PAS (taux, nature, identifiant et régularisations), cumuls et corrections antérieures.
Les assiettes manuelles et les nets saisis dans la démonstration doivent être rapprochés d’une paie validée. Une simple application de taux au brut ne suffit pas.
Historique : DSN antérieures utiles, identifiants des contrats déjà déclarés, cumuls de paie et régularisations à reprendre. Recenser les versions de bulletins pour ne déclarer qu’une version retenue par salarié / contrat / période.

## 6 Particularités BTP
À réunir si l’entreprise est concernée : caisse CIBTP et numéro d’adhérent, fiche de paramétrage de la caisse, codes métier et classification BTP, statut ouvrier / ETAM / cadre, bases et taux documentés, PRO BTP, OPPBTP et autres particularités effectivement applicables.
Identifier les congés indemnisés par la caisse, paniers, trajets, petits / grands déplacements et éventuelle DFS avec ses conditions, justificatifs et accord applicables.
Les intempéries doivent être recensées séparément : la DSN ne remplace pas automatiquement toutes les démarches de déclaration d’intempéries.
Les cotisations de caisse employeur ne doivent pas créer une retenue salariale par défaut.

## 7 Événements et retours
Arrêts : nature, dates, dernier jour travaillé, maintien et subrogation si applicable ; reprise anticipée : date réelle ; sortie : date, motif documenté, indemnités, éléments de préavis et historique requis.
Pour les dépôts existants : accusés, certificats, bilans d’identification, anomalies et CRM URSSAF / retraite / organismes complémentaires / DGFiP / CIBTP selon les organismes concernés. Suivre aussi les attestations et retours FCTU.
Dates et obligations événementielles à vérifier selon chaque situation, distinctement de la DSN mensuelle.

## Critères avant une première DSN réelle
Paie rapprochée et validée ; version de norme confirmée ; établissements et contrats identifiés ; données obligatoires complètes ; affiliations et fiches de paramétrage vérifiées ; fichier de test contrôlé ; anomalies et CRM traités ; modalités d’accès, mandat éventuel, dépôt et paiements validés ; archives et historique conservés.
Aucun fichier réel n’est déposé à ce stade.

## Références officielles consultées
Au 13 novembre 2026, Net-entreprises présente le cahier technique 2026.1.2 comme norme en production et 2027.1.3 comme norme à venir. Prévoir le journal de maintenance et les tables de codes / contrôles ; vérifier la version applicable au mois traité au démarrage de l’implémentation.
- https://www.net-entreprises.fr/declaration/norme-et-documentation-dsn/
- https://www.net-entreprises.fr/declaration/outils-de-controle-dsn-val/
- https://net-entreprises.custhelp.com/app/answers/detail_dsn/a_id/2925
- https://entreprendre.service-public.gouv.fr/vosdroits/F34059
- https://www.cibtp.fr/dsn/fiches-de-parametrage
- https://www.cibtp.fr/dsn
- https://www.net-entreprises.fr/media/documentation/guide-utilisateur/emettre-une-dsn-test.pdf
