# MA PAYE.0 — Version 0.5 : choix des conventions collectives

## Changement

Le champ texte de convention collective est remplacé dans la fiche entreprise et la fiche salarié par une recherche et un menu de sélection. Le numéro IDCC et le nom court apparaissent ensemble. Une option « Autre convention / saisie libre » préserve les conventions non proposées et les anciennes valeurs, sans les convertir vers un autre IDCC.

La fiche salarié peut reprendre la convention de l’entreprise en laissant son choix spécifique vide ou choisir une autre convention. Les choix identifiés sont affichés avec leur libellé dans la fiche entreprise et les bulletins de test. Un lien vers le moteur officiel du Code du travail numérique permet de vérifier le champ d’application.

## Sélection proposée au lancement

| IDCC | Libellé court |
| --- | --- |
| 1596 | Bâtiment — ouvriers, entreprises jusqu’à 10 salariés |
| 1597 | Bâtiment — ouvriers, entreprises de plus de 10 salariés |
| 2609 | Bâtiment — ETAM |
| 2420 | Bâtiment — cadres |
| 1702 | Travaux publics — ouvriers |
| 2614 | Travaux publics — ETAM |
| 3212 | Travaux publics — cadres |
| 1518 | ÉCLAT — éducation, culture, loisirs et animation |
| 1261 | ALISFA — acteurs du lien social et familial |
| 2941 | Aide, accompagnement, soins et services à domicile |
| 1486 | Bureaux d’études, ingénieurs-conseils et sociétés de conseils — Syntec |
| 1516 | Organismes de formation |
| 3043 | Propreté et services associés |
| 1979 | Hôtels, cafés, restaurants — HCR |
| 2216 | Commerce de détail et de gros à prédominance alimentaire |

Il s’agit d’une sélection de 15 conventions, non de la totalité des IDCC. Les identifiants et libellés ont été contrôlés dans les sources officielles au 12 novembre 2026. La présence dans la liste ne signifie pas que le moteur de calcul applique déjà les dispositions de la convention. Aucun choix n’est déduit automatiquement du code APE. Les dispositions territoriales, catégories de personnel et accords particuliers restent à vérifier.

## Vérifications

- Identifiants uniques, recherche insensible aux accents, filtrage par nom, secteur et IDCC.
- Filtrer les résultats conserve le choix existant sans le modifier automatiquement.
- Enregistrement d’ÉCLAT 1518 dans la fiche entreprise, conservation après rechargement.
- Choix de 2609 dans une fiche salarié indépendamment de la convention entreprise.
- Saisie libre conservée à la réouverture de la fiche.
- Contrôles existants SIRET, date fixe au 5, arithmétique et PDF : passants.

## Sources

- https://code.travail.gouv.fr/outils/convention-collective/convention
- https://entreprendre.service-public.gouv.fr/vosdroits/F39048
- https://www.legifrance.gouv.fr/liste/idcc?etatTexte=VIGUEUR_ETEN&idcc_suggest=1597
- https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052053155
- https://www.legifrance.gouv.fr/liste/idcc?etatTexte=VIGUEUR_ETEN&idcc_suggest=1518
- https://www.legifrance.gouv.fr/liste/idcc?etatTexte=VIGUEUR_ETEN&idcc_suggest=1261
- https://www.legifrance.gouv.fr/liste/idcc?etatTexte=VIGUEUR_ETEN&idcc_suggest=1486
- https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635435
- https://www.legifrance.gouv.fr/liste/idcc?etatTexte=VIGUEUR_ETEN&idcc_suggest=2941
- https://www.legifrance.gouv.fr/liste/idcc?etatTexte=VIGUEUR_ETEN&idcc_suggest=3043
- https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635534/
- https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635085
