# Salaire de base sur mois incomplet et ombre du bloc salarié — 0.9.2

La correction 0.9.1 concernait l’acquisition des congés, mais la base de salaire mensuelle était toujours reprise intégralement. La capture transmise montre une entrée au 19/10/2026, un salaire mensuel contractuel de 1 867,06 €, 35 heures hebdomadaires et 151,67 heures mensuelles de référence. Maguy a confirmé que le bulletin concerne octobre 2026.

## Calcul ajouté

En mode mensuel, le calcul automatique applique : salaire mensuel contractuel × horaire prévu sous contrat sur le mois / horaire réel prévu pour le mois complet.

Avec le planning de 7 h du lundi au vendredi et sans autre jour hors horaire : octobre 2026 compte 154 h, dont 70 h du 19 au 31 octobre. La base calculée est **1 867,06 × 70 / 154 = 848,66 €**, avant autres variables. Le salaire contractuel reste 1 867,06 € dans le bloc contrat ; le salaire de base à payer et le brut du bulletin sont recalculés. Ni le diviseur moyen 151,67 h ni le taux horaire arrondi ne sont utilisés pour ce prorata.

- Dates d’entrée / fin reprises de la fiche et des variables de sortie, modifiables dans la préparation.
- Planning hebdomadaire de référence réutilisé. Possibilité de saisir les horaires réels du mois et du contrat, ou de préciser les jours hors horaire ; jours fériés, cycles et horaires particuliers à vérifier.
- Mode horaire préservé : heures × taux, sans appliquer un deuxième prorata. Mode « Montant fourni » conservé pour un montant explicitement saisi.
- Ligne du bulletin et du PDF mentionnant l’entrée/sortie, les heures sous contrat et le diviseur réel. La base proratisée alimente le brut, les cotisations, la CSG et, si activée, l’assiette courante de précarité.
- Les autres absences et variables restent distinctes : ne pas ressaisir une retenue d’entrée/sortie déjà incluse dans le prorata. Les bulletins historiques ne sont pas écrasés ; un nouveau calcul crée un nouvel instantané.

## Présentation

Trait sombre supérieur retiré du bloc salarié. Ombre sombre légère à l’écran ; impression sans ombre pour conserver la lisibilité.

## Vérifications

Tests dédiés : cas d’octobre ci-dessus, mois complet suivant inchangé, sortie le 19 novembre, contrat entièrement hors mois, horaires fournis, date manquante, horaires incohérents, absence de double prorata après plusieurs recalculs et mode horaire préservé. Les onze contrôles antérieurs sont conservés. Contrôle visuel de la nouvelle version non effectué ; aucun contournement de la session de navigateur bloquée précédemment.

Références primaires consultées le 12/11/2026 :
- Cour de cassation, 13 avril 2023, 21-15.210, principe de l’horaire réel du mois : https://www.courdecassation.fr/decision/6437a31d9477fe04f5cc6a44
- Cour de cassation, 11 février 1982, 80-40.359 : https://www.courdecassation.fr/decision/6079b0c59ba5988459c50335

Application de test uniquement : le prorata ne constitue pas une validation réglementaire de la paie complète.
