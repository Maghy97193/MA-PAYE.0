# MA PAYE.0 — Automatisation de la préparation, version 0.9

## Modifications

- Message de contrôle corrigé : distingue une différence d’année du modèle BTP d’un simple paramètre « À vérifier ». Lorsque la période correspond, ouvre la préparation et le champ de contrôle des cotisations. Le taux / la conformité ne sont pas approuvés automatiquement. Le message CDD affiche séparément la date de fin et la période attendue.
- Assiette CSG / CRDS affichée avec son brut et ses compléments. En mode automatique, le complément est calculé depuis les parts patronales des lignes explicitement qualifiées « Réintégrer dans la CSG : Oui » et les autres éléments saisis ; zéro peut être calculé sans demander une saisie artificielle. Les cotisations obligatoires nationales préremplies sont qualifiées « Non ». Les lignes non qualifiées restent signalées. Les anciens compléments positifs sont conservés en mode « Montant fourni ».
- Limite d’abattement : possibilité de renseigner le brut annuel éligible antérieur et la limite annuelle (192 240 € en 2026). Le reliquat est alors calculé et utilisé dans l’assiette. Sans cumul annuel, approximation mensuelle explicitement signalée comme provisoire.
- Heures de congés : mode Calendrier utilisant début / fin des congés et planning hebdomadaire. Calcule les heures de congés et les heures prévues du mois, avec dates non travaillées / fériées paramétrables. Les périodes qui chevauchent deux mois sont limitées au mois courant. Le planning proposé en temps plein est modifiable ; temps partiel à renseigner. Mode manuel préservé pour les anciennes heures saisies.
- Planning de référence ajouté à la fiche salarié. Les droits restent en jours ; leur suivi n’est pas converti artificiellement en droits horaires.
- Acquisition mensuelle automatique paramétrable : mois complet travail / assimilé 2,5 jours ouvrables, part maladie non professionnelle 2 jours ouvrables avec plafond dédié de 24. Équivalent en ouvrés (25 sur une année ordinaire), total ordinaire plafonné à 30 ouvrables. Parts du mois, droits maladie antérieurs et situations particulières à vérifier. Les fractions de jours sont conservées avec six décimales afin d’éviter une perte cumulée ; arrondi de clôture proposé au dernier mois du cycle. Les méthodes équivalentes plus favorables (quatre semaines / jours / heures dans le BTP), droits supplémentaires et règles particulières ne sont pas entièrement automatisés : contrôle ou mode manuel requis.
- Reprise automatique des compteurs précédents lors de l’ouverture d’un nouveau mois, si les données existent et l’unité correspond. Les mois déjà enregistrés conservent leur situation de départ. Le bouton de reprise permet une actualisation volontaire. L’acquisition du mois est ajoutée une seule fois.
- Cycle paramétrable : avril proposé en présence d’une affiliation CIBTP/CNETP identifiée, juin à défaut. Une valeur explicite ou un cycle précédent prime. Les soldes antérieurs sont conservés à la bascule, sans suppression automatique des droits ; reports anciens et clôture à contrôler.
- Ligne explicite « Congés acquis ce mois » ajoutée au bulletin et au PDF ; export des compteurs enrichi avec acquisition du mois et heures de congés / heures prévues.

## Préservation et limites

Les données locales, anciens bulletins et saisies manuelles sont conservés. Initialisation des droits N−1 / N nécessaire en l’absence de compteurs précédents. Les absences particulières, entrées/sorties et cumuls inconnus nécessitent des informations : aucune situation inconnue n’est certifiée automatiquement. Les relevés CIBTP restent la référence pour la liquidation de caisse. Pas de retenue salariale liée au seul mode CIBTP.

L’outil reste une simulation de paie : DSN en attente d’instruction, aucun bulletin définitif, aucune transmission. Les régimes CSG particuliers et exonérations ne sont pas totalement gérés.

## Validation

Onze fichiers de tests passent. Scénarios ajoutés : calendrier avec week-end et jours exclus, chevauchement de mois, planning invalide, acquisition normale / maladie / mixte, plafonds, clôture en ouvrés sans dérive d’arrondis, report sans double décompte, CSG avec complément patronal et limite annuelle atteinte / partiellement disponible, absence de boucle de réintégration, migration et reprise idempotente.

Le contrôle visuel de cette dernière version n’a pas pu être terminé : la session de navigateur de contrôle a perdu le serveur d’aperçu puis l’observation de la page d’erreur a été bloquée par sa politique d’URL. Aucun contrôle de navigateur n’a été contourné. La validation finale repose sur les tests arithmétiques, l’adaptation de l’interface en environnement simulé et les contrôles de syntaxe.

## Sources vérifiées le 12 novembre 2026

- Urssaf, CSG/CRDS : https://www.urssaf.fr/accueil/employeur/cotisations/liste-cotisations/csg-crds.html
- Service Public, CSG : https://www.service-public.gouv.fr/particuliers/vosdroits/F2971
- Service Public, congés payés : https://www.service-public.gouv.fr/particuliers/vosdroits/F2258
- Service Public, maladie : https://www.service-public.gouv.fr/particuliers/vosdroits/F37482
- CIBTP Île-de-France, période et droits : https://www.cibtp-idf.fr/salarie/conges-payes/lessentiel-sur-le-droit-a-conge-dans-le-btp

## Dernière demande : visibilité et mise à jour de l’acquis

Le tableau des congés est toujours affiché sur le bulletin et dans le PDF, même si les compteurs de départ sont inconnus (mention « À renseigner », sans faux solde zéro). « Congés acquis ce mois » est une ligne explicite. Pour les préparations qui n’ont pas encore choisi un mode d’acquisition, le mode automatique est proposé ; un mode manuel explicitement enregistré est conservé.

Le bouton « Recalculer depuis la préparation enregistrée » produit un nouvel instantané à partir des variables et formules courantes. Il ne remplace pas les valeurs du bulletin antérieur. Les changements de la préparation doivent être enregistrés avant de l’utiliser.
