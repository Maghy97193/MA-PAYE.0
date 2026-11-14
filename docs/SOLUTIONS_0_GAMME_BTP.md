# Solutions.0 — gamme BTP

Décision de Maguy, 14 novembre 2026 : marque **Solutions.0** (pluriel), gamme **BTP**, produits **BATI.0** et **MA PAYE.0 BTP**. Le nom principal reste MA PAYE.0, avec BTP en petit sous le logo. BTP est la priorité métier ; la base reste extensible aux autres secteurs. Aucune vérification de disponibilité juridique de ces noms n’est annoncée.

## Livré dans le brouillon

- Suivi des heures par salarié et mois : travail journalier, ventilation HS 25/50/100, HC, absences, panier, chantier, commentaire.
- Sous-totaux par semaine entière et part du mois. Les jours des mois voisins restent communs, sans double comptage du total mensuel.
- Contrôle des bornes du contrat, des journées manquantes et de la cohérence quotidienne.
- Import XLSX et CSV hors ligne, choix de feuille, dates ISO/françaises/Excel, décimales françaises, durées HH:mm et formats de durée Excel. Aperçu avant remplacement ; refus des dates en double et matricules incompatibles. Une feuille doit concerner le salarié et les semaines affichées.
- Export d’un modèle CSV lisible dans Excel. Les anciens XLS nécessitent une conversion en XLSX ou CSV ; les formules du classeur doivent être collées en valeurs. Fichiers limités à 2 Mo, XML décompressé limité à 20 Mo.
- Transfert contrôlé vers les variables : remplacement explicite, sans addition. En mode horaire, transfert des heures normales ; en mode mensuel, conservation de la base contractuelle et traçabilité du total réellement travaillé.
- Les majorations restent qualifiées par le gestionnaire. Pas de calcul réglementaire automatique des HS, des retenues ou des congés dans ce premier suivi. Forfait jours non transférable.
- Alerte lorsque la feuille change après transfert et blocage d’un nouveau bulletin tant que la feuille n’est pas retransférée. Conservation des bulletins existants.

## Prochaine étape : référentiel réglementaire

Collecter et versionner les taux généraux, SMIC, minima BTP et paniers territoriaux avec source, dates d’effet et périmètre (IDCC, région, catégorie/classification). Distinguer montant de panier dû et plafond d’exonération. Les taux AT/MP sont ceux notifiés ; les contrats de santé/prévoyance et les paramètres de caisses nécessitent les documents de l’entreprise ou un accès autorisé. Proposer les évolutions, conserver une validation et des corrections manuelles tracées, sans écraser les dérogations ni recalculer les bulletins historiques. Aucun connecteur de mise à jour automatique de ces taux n’est livré ici.

Sources étudiées :
- https://travail-emploi.gouv.fr/droit-du-travail/temps-de-travail-et-conges/temps-de-travail/article/les-heures-supplementaires-definition-et-limites
- https://mon-entreprise.urssaf.fr/développeur/api
- https://code.travail.gouv.fr/contribution/quel-est-le-salaire-minimum
- https://www.urssaf.fr/accueil/employeur/beneficier-exonerations/frais-professionnels.html
- https://www.ameli.fr/entreprise/votre-entreprise/compte-entreprise/compte-entreprise

## Validation

Huit tests automatisés réussis (suivi/import, SIRET/paiement, AT/MP). Recette navigateur sur données fictives : saisie 9 h dont 1 h à 25 %, transfert puis second transfert sans doublon ; import d’un vrai XLSX contenant 7,5 h décimales et une durée Excel de 8 h ; total résultant 24,5 h dont 2 h majorées et 2 paniers. Aperçu et alerte de feuille modifiée vérifiés.

Sauvegarde en brouillon uniquement, sans publication.
