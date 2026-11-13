# Première vue de préparation DSN

Suite au plan DSN sauvegardé, ajout en brouillon d’un onglet Préparation DSN. Le site en ligne reste inchangé.

- Périmètre entreprise / mois ; salariés dont le contrat recoupe la période, y compris les entrées du mois et les contrats sans date à compléter.
- Inventaire des données entreprise, salarié et contrat. Présence d’une donnée distincte de sa validité réglementaire.
- Choix explicite d’une version de bulletin par salarié : aucune somme des anciennes versions et des révisions, aucun choix automatique du plus récent.
- Pièces suivies : bulletin de référence, contrats, relevés, ancienne DSN, CRM, fiches complémentaires, AT/MP, CIBTP si applicable.
- Échéance saisie et confirmée avec une référence, distincte du paiement des salaires au 5.
- Enregistrement dans la sauvegarde locale existante, sans modifier les salariés, variables ou bulletins.
- Identification sécurisée NIR / NTT, mapping NEODeS, paie validée, génération, DSN-Val, dépôts et retours restent à intégrer. Aucun fichier DSN ni dépôt créé. Aucune collecte de NIR ou d’IBAN.

Tests automatisés : entrée au 19/10, exclusion des contrats hors mois, choix de la révision sans doublons, choix invalide, isolation des périodes et lecture sans mutation. Pièce « reçue » ne signifie pas paie validée. Même avec tous les champs renseignés, la génération reste indisponible.

Prochaine étape avec Maguy : dossier pilote anonymisé, bulletin de référence validé + contrat + relevé d’heures, puis fiches de paramétrage organismes. Confirmer l’entreprise et le mois pilote avant de préparer les correspondances de rubriques.

Références : docs/DSN_PLAN_ET_INFORMATIONS_A_FOURNIR.md ; https://www.net-entreprises.fr/declaration/norme-et-documentation-dsn/ ; https://www.cibtp.fr/dsn/fiches-de-parametrage
