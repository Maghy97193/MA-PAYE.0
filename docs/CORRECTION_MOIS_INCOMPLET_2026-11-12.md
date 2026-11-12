# Correction : acquisition des congés pour un mois incomplet — 0.9.1

Le mode automatique de la version précédente ne bornait pas effectivement l’acquisition aux dates du contrat. Il proposait un pourcentage de mois à renseigner et pouvait conserver un ancien 100 %. Cette correction remplace ce comportement par une présence dérivée des dates, indépendamment de l’ancien pourcentage enregistré.

- Date d’entrée et fin effective, à défaut fin de CDD prévue ou date de sortie renseignée, reprises dans la préparation. Les dates connues de la fiche priment ; des dates de préparation peuvent servir si la fiche est incomplète.
- Présence limitée au mois courant ; zéro si le contrat est entièrement hors période ; absence de date d’entrée signalée au lieu d’assumer un mois complet.
- En mois incomplet, comparaison du prorata calendaire, de l’équivalence quatre semaines et de l’équivalence en jours au planning. Méthode la plus favorable retenue pour l’estimation mensuelle, limitée à un mois standard. Équivalence 150 heures ajoutée seulement pour un ouvrier BTP identifié avec heures éligibles expressément renseignées.
- Une simple réduction des heures hebdomadaires d’un temps partiel ne réduit pas ses droits en jours : l’équivalence en jours utilise son propre rythme hebdomadaire.
- La période retenue, les jours calendaires sous contrat, les jours au planning et la méthode sont affichés. Les absences particulières nécessitent une ventilation travail / maladie cohérente avec cette présence. Les équivalences annuelles cumulées, forfaits de congés de l’année précédente, autres employeurs BTP et droits spécifiques ne sont pas liquidés par cette estimation : rapprochement CIBTP et contrôle du droit cumulé requis.
- Arrondi du cumul lors de la clôture du cycle ou de la fin effective confirmée du contrat. La fin prévue seule ne déclenche pas un arrondi définitif. Le résultat de l’arrondi n’est pas ajouté une seconde fois à chaque enregistrement.
- Mode « Fractions fournies » et acquisition manuelle conservés pour une situation justifiée différente. Si le calcul automatique échoue, l’ancien 2,5 n’est pas présenté comme un nouveau droit ; la génération d’un nouveau bulletin de test demande la correction de l’information manquante.

Tests ajoutés : entrée le 16 / fin prévue le 29 novembre, planning lundi–vendredi 7 h, acquisition provisoire 1,25 jour ; avec fin effective confirmée et cumul initial nul, droit final arrondi à 2 jours. Contrat hors mois, mois complet, date manquante, méthode BTP avec heures fournies et migration sans ancien 100 % implicite vérifiés. Ces dates constituent un exemple fictif, pas une reconstitution du dossier de Maguy.

Sources consultées le 12/11/2026 :
- https://www.service-public.gouv.fr/particuliers/vosdroits/F2931
- https://code.travail.gouv.fr/fiche-service-public/labsence-du-salarie-est-elle-prise-en-compte-pour-le-calcul-de-ses-conges
- https://travail-emploi.gouv.fr/les-conges-payes
- https://www.cibtp-idf.fr/salarie/conges-payes/composition-du-conge

Application de test : aucune paie définitive ni déclaration. Les limites réglementaires et de contrôle visuel de la version 0.9 restent applicables.
