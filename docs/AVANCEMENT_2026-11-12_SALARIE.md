# MA PAYE.0 — Version 0.6 : transport et fin de CDD

## Fiche salarié

Ajout d’un bloc « Transport domicile-travail » : mode de transport, abonnement/réseau (Navigo, etc.), coût mensuel de référence, taux de prise en charge, début et fin de validité, état du justificatif et précisions/référence du justificatif. Les champs restent facultatifs lorsqu’ils ne s’appliquent pas. Aucun taux ni montant de remboursement n’est imposé ou appliqué automatiquement à la préparation mensuelle ; le gestionnaire vérifie les variables du mois. Les déplacements professionnels BTP restent distincts.

Dans « Contrat et dates », ajout du bloc « Fin de CDD — si concerné » : date de fin réelle, liste de motifs, précisions et référence de la pièce justifiant la fin. Le motif de recours au CDD existant est conservé et renommé plus explicitement. Le choix du motif de fin ne calcule aucune indemnité et ne transmet aucune déclaration.

Les choix de motif comprennent terme atteint, fin de l’objet/retour du salarié remplacé, poursuite en CDI, différents cas de rupture anticipée, période d’essai et autre à vérifier. Le traitement de situations particulières, dont l’apprentissage, nécessite un contrôle spécifique du dossier. Il ne s’agit pas d’une nomenclature DSN ni d’une validation juridique automatique.

## Vérifications

- Enregistrement d’un coût transport, d’un taux, d’un abonnement Navigo de test, d’une fin réelle et d’un motif de fin de CDD ; conservation vérifiée dans le navigateur après rechargement.
- Contrôle des montants négatifs, des taux hors 0–100 %, des dates inversées et des motifs « Autre » sans précisions pour un CDD.
- Tous les tests existants sur conventions, SIRET, date de paiement, calcul et PDF passent.

Source de cadrage pour les motifs : https://entreprendre.service-public.gouv.fr/vosdroits/F40

Les données déjà enregistrées sont conservées. La sauvegarde JSON globale contient ces nouveaux champs. La DSN reste en attente du feu vert de Maguy. La version reste réservée aux données fictives et aux bulletins de test.
