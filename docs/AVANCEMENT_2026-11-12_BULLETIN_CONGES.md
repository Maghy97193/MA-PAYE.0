# MA PAYE.0 — Bulletin professionnel et compteurs de congés, version 0.8

## Modifications

- Nouveau modèle visuel de bulletin, à l’écran, à l’impression et en PDF : en-tête bleu ardoise, période et paiement, employeur à gauche, salarié à droite, montants alignés, net à payer mis en évidence.
- Toutes les données contractuelles renseignées sont regroupées à gauche sous la convention collective : référence, nature, dispositif, début, ancienneté, fins prévue/réelle, essai, modalités, durées, salaire et taux contractuels, effet, HS structurelles et répartition. Informations CDD et apprentissage ajoutées si concerné.
- Libellé explicite « Motif de recours au CDD » dans la fiche et dans le bloc contrat ; distinct du motif de fin du CDD. Si absent sur un CDD, le bulletin affiche « À renseigner ».
- Compteurs N−1 et N dans la fiche salarié (situation de référence), dans la préparation mensuelle, dans une synthèse par salarié et sur le bulletin / PDF. Export CSV des compteurs distinct de celui des variables.
- Solde calculé = acquis N−1 + acquis N + acquisition du mois renseignée − déjà pris avant le mois − pris ce mois. Imputation des jours du mois sur N−1 puis N. Le dépassement est visible pour contrôle des congés anticipés / régularisation.
- Reprise volontaire du mois précédent, sur le même cycle et dans la même unité. Le cumul déjà consommé est repris une seule fois. Aucune bascule annuelle ni acquisition réglementaire n’est supposée.
- Compteurs à renseigner si les droits sont inconnus, sans inventer des zéros. Les jours pris sont indépendants des montants versés par l’employeur / la caisse. Le mode CIBTP reste sans retenue automatique liée à la caisse, conformément à la demande de Maguy.

## Vérification

Sept fichiers de tests passent, dont les compteurs décimaux, l’ordre d’imputation, le dépassement, les données absentes et la reprise sans double consommation.

Parcours navigateur sur exemple fictif : acquis N−1 25, N 10 ; pris antérieurs 20 et 2 ; acquisition du mois 2,50 ; congés du mois 7 → solde N−1 0, N 8,50, total 8,50. Enregistrement et bulletin de test vérifiés. Motif de recours au CDD visible sous la convention collective. Téléchargement PDF et rendu visuel vérifiés, avec entêtes et mentions TEST sur chaque page. Bloc net regroupé lors du passage à la page suivante.

## Limites conservées

Données de test locales au navigateur ; anciens instantanés conservés. Nouvelle présentation appliquée lors de leur affichage, sans réécriture des valeurs historiques. Le modèle reste marqué TEST : moteur réglementaire incomplet, net fiscal/social fournis manuellement, cotisations spécifiques à compléter. DSN toujours en attente d’instruction expresse. Le modèle n’est pas un bulletin définitif conforme.

## Ajouts demandés pendant la réalisation

### Indemnité de fin de CDD

Calcul activable sur la période de fin : (brut éligible antérieur du même contrat et renouvellements + brut éligible du mois de sortie) × taux, à 10 % par défaut. Le cumul antérieur doit être fourni et rapproché des bulletins ; aucun total n’est inventé depuis les brouillons. Les frais ne sont pas intégrés au brut ; l’indemnité elle-même et une éventuelle indemnité compensatrice de congés payés de fin de contrat sont exclues de l’assiette. La prime est affichée sur une ligne propre et ajoutée au brut soumis aux cotisations.

Décision « À vérifier », « Calculer » ou « Non due », avec motif documenté si non due. Taux dérogatoire à justifier ; pas de 6 % par défaut. Apprentissage / professionnalisation / contrats aidés bloqués dans le calcul standard ; CDI de chantier exclu. CIBTP n’est pas une exemption de cette prime. La base d’une éventuelle indemnité compensatrice de congés payés reste à contrôler : pas de liquidation complète du solde de tout compte.

Références vérifiées le 12/11/2026 :
- Code du travail L1243-8 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901219
- IDCC 1596 : https://code.travail.gouv.fr/contribution/1596-dans-le-cadre-dun-cdd-quel-est-le-montant-de-lindemnite-de-fin-de-contrat
- IDCC 1597 : https://code.travail.gouv.fr/contribution/1597-dans-le-cadre-dun-cdd-quel-est-le-montant-de-lindemnite-de-fin-de-contrat
- IDCC 2609 : https://code.travail.gouv.fr/contribution/2609-dans-le-cadre-dun-cdd-quel-est-le-montant-de-lindemnite-de-fin-de-contrat
- Cadres 2420 : https://code.travail.gouv.fr/contribution/2420-dans-le-cadre-dun-cdd-quel-est-le-montant-de-lindemnite-de-fin-de-contrat (applicabilité de dispositions non étendues à contrôler).

### Médecine du travail

Service et référence d’adhésion ajoutés à la fiche entreprise. Préparation : service, mode, forfait affecté à la période ou taux explicitement documenté, facture / tarif et période couverte. Aucun tarif national uniforme n’est appliqué. Pour un SPSTI, le socle relève d’une cotisation par travailleur ; le taux documenté est réservé à une situation tarifaire justifiée, pas à une règle générale BTP.

Le montant est exclusivement employeur, visible dans les cotisations et dans le coût total, sans réduction du net salarié ni ajout à la CSG. Une facture annuelle ne doit pas être imputée chaque mois. Aucune périodisation automatique ni aucun paiement / déclaration n’est effectué.

Source : article L4622-6, https://code.travail.gouv.fr/code-du-travail/l4622-6

### Validation finale

Neuf fichiers de tests passent. Nouveaux tests : prime sur cumul, sortie et taux dérogatoire documenté, non-versement, contrats particuliers, intégration au brut et cotisations ; médecine du travail forfait / taux et net inchangé.

Navigateur : précarité de 1 222 € sur une assiette fictive de 12 220 €, brut total 3 442 € ; forfait de santé au travail 120 € affecté exclusivement à l’employeur et visible dans le bulletin, sans diminution du net salarié.
