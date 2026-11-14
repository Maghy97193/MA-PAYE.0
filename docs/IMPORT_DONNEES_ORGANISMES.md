# Paramètres et import des taux des organismes

Demande du 14 novembre 2026 : permettre de récupérer des informations et des taux exportés par les organismes, puis de les importer dans MA PAYE.0 version BTP. L’utilisatrice vérifie notamment les possibilités d’export PRO BTP. Le premier organisme évoqué reste à identifier avec son fichier exporté ; aucun format ni accès API n’est présumé disponible.

## Parcours attendu

1. Choisir l’établissement et l’organisme concerné dans la fiche entreprise.
2. Sélectionner un fichier exporté. Le format réellement pris en charge sera défini à partir d’un exemple anonymisé : CSV, Excel ou autre export officiel. Un PDF n’est pas assimilé à un tableau structuré.
3. Lire les colonnes et proposer une correspondance avec les rubriques de l’outil, sans lancer de formules, macros ou liens externes.
4. Afficher un aperçu comparant valeur existante, valeur importée, part salariale, part patronale, assiette, date d’effet et date de fin éventuelle.
5. Signaler les ambiguïtés, valeurs manquantes, doublons, taux négatifs, unités incohérentes et chevauchements de périodes. Une valeur absente n’équivaut pas à un taux zéro.
6. Valider explicitement les lignes à appliquer, puis enregistrer une version datée du paramétrage avec possibilité de retour à la version précédente.

## Informations à identifier dans un export

| Donnée | Traitement attendu |
| --- | --- |
| Organisme, établissement et SIRET | Rattacher le fichier à la bonne fiche entreprise |
| Contrat ou affiliation, catégorie de personnel | Éviter d’appliquer un taux collectif à un salarié non concerné |
| Code rubrique et libellé | Proposer une correspondance contrôlée, jamais sur le seul montant |
| Part salarié / part employeur | Deux valeurs distinctes, exprimées dans l’unité identifiée |
| Assiette | Brut, plafond, tranche, forfait, base majorée ou autre règle à confirmer |
| Date d’effet et date de fin | Appliquer le taux aux seules périodes couvertes |
| Référence du document ou de la notification | Conserver la provenance et la date d’import |
| Paramètres spécifiques | Options mutuelle, prévoyance, contrats de retraite ou autres, selon les champs effectivement fournis |

Cette liste décrit le modèle cible ; elle ne prétend pas reproduire les colonnes d’un export PRO BTP ou d’un autre organisme non encore reçu.

## Règles de conservation et de calcul

- La fiche entreprise enregistrée et ses périodes de validité restent prioritaires tant qu’un import n’a pas été validé. Exemple corrigé : AT/MP **6,16 % depuis le 08/01/2026**, et non le taux du bulletin historique.
- Ne jamais remplacer silencieusement des taux déjà renseignés. Afficher le conflit et laisser sélectionner la valeur à retenir.
- Les corrections manuelles restent possibles avec motif, date d’effet et historique. Un nouvel import ne doit pas effacer une correction sans validation.
- Ne pas modifier un bulletin historique ou clôturé. Un recalcul doit créer une nouvelle version et conserver l’original.
- Importer un taux ne suffit pas à calculer la paie : sa portée, son assiette, son plafond, ses régularisations et les règles d’allègement doivent être traités séparément.
- CIBTP et AT/MP : vérifier les parts respectives ; ne pas créer une retenue salariale à partir d’un taux employeur.
- Les données importées restent dans le périmètre sécurisé du dossier. Ne pas inclure NIR, RIB ou pièces personnelles dans un jeu de tests ou dans GitHub. Conserver seulement la provenance et les paramètres nécessaires selon la politique de conservation choisie.

## Tests à prévoir après réception du premier export

Correspondance des colonnes, décimales françaises, pourcentages et unités ; plusieurs établissements ; catégories de salariés ; taux zéro ; lignes manquantes ou en double ; dates d’effet en cours de mois ; chevauchement ; simulation avant application ; import identique répété sans doublon ; correction manuelle conservée ; retour arrière ; ancien bulletin inchangé.

## État

**Import implémenté dans l’onglet Paramètres** : fichiers .xls, .xlsx et .csv ; colonnes associables ; aperçu comparatif ; validation ligne par ligne ; catalogue versionné ; application distincte à une préparation enregistrée et retour du catalogue à une version précédente. L’import existant des relevés d’heures est une fonction distincte. Prochaine étape : recevoir un export anonymisé pour connaître son organisme, ses colonnes, ses unités et ses périodes, puis développer et tester le lecteur adapté. Une connexion directe ou une synchronisation automatique nécessitera un mécanisme officiellement disponible et les accès autorisés ; elle n’est pas promise à partir de la seule existence d’un export.


## Adaptations vérifiées sur les fichiers fournis

- **Export AT/MP CSV** : reconnaissance de la caisse, du SIRET dans la cellule établissement, du code risque, du taux et des trois dates distinctes. Les valeurs observées sont 6,16 %, code 454LE, effet au 01/01/2026, décision le 12/12/2025, notification le 08/01/2026. La notification du 8 janvier ne remplace pas la date d’effet du 1er janvier.
- **Feuille PRO BTP .xls** : lecture du format Excel historique avec SheetJS CE 0.20.3, fourni localement avec sa licence ; aucune donnée de fichier n’est envoyée au fournisseur de la bibliothèque. Les formules et macros ne sont pas exécutées.
- Les onze lignes PRO BTP sont conservées sans identifiants de dossiers/affiliation dans le catalogue initial d’EBS : trois lignes disposent de taux ventilés et d’une assiette simple ; huit restent à compléter pour la ventilation, un forfait en euros, une assiette de tranche B ou majorée, ou une ligne de TVA.
- La prévoyance ouvriers tranche A comporte 0,87 % salarié et 1,72 % employeur. Le forfait santé 25 € n’est pas un taux de 25 %. Les taux totaux cadres/ETAM sans répartition ne sont pas ventilés arbitrairement.
- Les dates d’effet PRO BTP sont absentes du fichier : le catalogue initial reste à confirmer et son application en paie est bloquée tant qu’une période n’a pas été validée. Le fichier est daté d’export, pas de validité.
- Les préparations et bulletins existants ne sont pas remplacés par le catalogue. L’application demande un choix de salarié, une période couverte, un aperçu et une confirmation. Les catégories et l’exclusion d’apprentissage sont contrôlées quand elles figurent dans la donnée structurée.
- Les paramètres importés AT/MP ne peuvent pas imposer un taux différent de la fiche entreprise depuis l’application générique à la paie : la fiche doit être contrôlée en premier.

## Vérification URSSAF

L’URSSAF publie des taux sur https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html et des tables de référence depuis ses outils. Un fichier Excel universel couvrant tous les paramètres n’a pas été confirmé. Le lecteur générique permet un tableau structuré contrôlé ; il ne prétend pas synchroniser automatiquement un espace URSSAF ou PRO BTP.

## Vérifications exécutées

Tests automatisés de décimales françaises, fractions Excel, dates invalides et dates distinctes, SIRET incompatible, taux absents versus zéro confirmé, CIBTP sans retenue, doublons et périodes qui se chevauchent, mise à jour sans modifier l’original, catégories de personnel, apprentissage, dates d’effet non confirmées et changements en cours de mois.

Recette d’interface : fichier CSV AT/MP réel reconnu et enregistré ; fichier .xls PRO BTP réel reconnu et prévisualisé, trois lignes structurées et huit à compléter ; catalogue PRO BTP sans date bloqué pour l’application ; CSV générique de test CSG importé avec correspondance des colonnes, puis appliqué explicitement sans changer le brut de 861,70 €. Aucun fichier personnel de bulletin ou de contrat n’a été réintroduit dans le dépôt.
