# MA PAYE.0 — Cahier des charges RH et paie multi-activités

Version de cadrage du 11 novembre 2026 — Projet de Maguy Polynice. Nom retenu par Maguy : MA PAYE.0.

Périmètre corrigé : outil RH et paie destiné à tous les secteurs d’activité, avec une couverture déployée et validée progressivement par convention collective et régime.

## 1. Objectif et hypothèses

Créer un outil pour centraliser l’administration du personnel, préparer la paie et, à terme, calculer les bulletins et produire les déclarations sociales des entreprises et associations de tous secteurs d’activité en France. Prévoir une utilisation multi-sociétés et multi-établissements avec séparation stricte des données. L’architecture doit permettre plusieurs conventions collectives et régimes. Le lancement porte sur des périmètres validés et publiés ; l’objectif tous secteurs ne doit pas être présenté comme une couverture immédiatement disponible de toutes les situations.

Le présent document propose un périmètre ; il ne confirme aucune intégration existante avec SILAE, les organismes ou BATI.0. Budget, calendrier, hébergement, effectifs cibles et modèle commercial restent à définir.

## 2. Lots fonctionnels

| Lot | Contenu | Condition de mise en service |
| --- | --- | --- |
| 1 — RH et préparation | Dossiers salariés, contrats, temps, variables, échéances, exports | Recette métier et sécurité |
| 2 — Calcul et bulletins | Moteur réglementaire, cotisations, cumuls, régularisations, bulletins | Validation indépendante des calculs et du périmètre couvert |
| 3 — Déclarations | DSN périodiques et événements, retours organismes, CIBTP | Démarches éditeur, tests techniques et recette déclarative |

L’objectif final comprend la paie complète. Le lot 1 permet de travailler sans présenter une simulation comme un bulletin définitif. Une connexion à un moteur de paie tiers peut remplacer le développement interne du lot 2 après étude technique, contractuelle et économique.

## 3. Utilisateurs et accès

Rôles : administrateur, gestionnaire RH/paie, responsable d’entreprise, responsable d’équipe ou de chantier, salarié et intervenant externe autorisé. Chaque rôle dispose des seuls accès utiles à sa mission. Un responsable d’équipe peut valider des heures sans accéder aux salaires, au NIR ou aux coordonnées bancaires. Toute action sensible est tracée. Les accès de support sont temporaires et autorisés.

## 4. Dossiers entreprises et salariés

- Entreprise et établissement : SIREN/SIRET, convention collective et IDCC, activité, effectif, caisse de congés si applicable, régime social, organismes, taux propres, accords et calendriers.
- Salarié : identité, coordonnées, emploi, classification, ancienneté, contrat, temps de travail, salaire, affiliations et coordonnées de paiement ; collecte limitée aux informations nécessaires.
- Historique daté des changements de salaire, contrat, classification et établissement.
- Documents : contrats et avenants, justificatifs utiles, suivi DPAE, mutuelle, autorisations de travail si applicables, visites médicales et documents sectoriels, dont carte BTP lorsque nécessaire.
- Alertes de fin de contrat, période d’essai, renouvellement, visite et document expirant. Les délais dépendent du cas juridique ; aucun délai universel codé en dur.
- Conserver le suivi administratif de santé nécessaire sans constituer de dossier médical ni enregistrer de diagnostic.

## 5. Temps et variables

Saisie et import des heures par salarié, jour, service, projet ou chantier ; heures normales, supplémentaires, complémentaires et repos. Absences, maladie, accident, congés et activité partielle selon périmètre validé. Paniers, trajet, transport, grands déplacements, frais, primes, avantages, acomptes et saisies selon règles applicables.

Chaque variable porte sa période, sa source, son auteur, son justificatif et son état : brouillon, à vérifier, validée, exportée. Détecter doublons, heures incohérentes, données manquantes et chevauchements. Ne pas confondre indemnités conventionnelles et exonérations sociales.

## 6. Préparation et cycle de paie

Tableau mensuel des salariés attendus, pièces manquantes, changements et écarts avec le mois précédent. Validation explicite avant export ou calcul définitif. Période clôturée protégée ; correction tracée et procédure de réouverture contrôlée. Export documenté vers le logiciel choisi, sous réserve de formats ou API disponibles. Import de contrôle des résultats si techniquement possible.

Pour le moteur : brut, assiettes, plafonds, proratisations, cotisations, exonérations, réductions, net imposable, prélèvement à la source, montant net social, net à payer, cumuls et régularisations. Préciser pour chaque règle : source officielle/conventionnelle, date d’effet, version, formule, arrondis et cas couverts. Ne jamais appliquer rétroactivement une nouvelle règle à un historique sans décision explicite.

Une IA peut assister la saisie ou expliquer une anomalie ; les calculs définitifs doivent rester déterministes, traçables et reproductibles.

## 7. Couverture multi-activités et modules sectoriels

Le socle commun couvre les dossiers RH, contrats, temps, absences, rémunérations, paie, déclarations, documents et tableaux de bord. Les règles sont sélectionnées selon la convention collective applicable, les accords, le régime social, la population et la date d’effet. Le code APE seul ne suffit pas à déterminer automatiquement toutes les règles.

| Secteur cible | Paramétrages et cas à spécifier puis valider |
| --- | --- |
| Commerce, services et bureaux | Classifications, minima, primes, temps et absences conventionnels |
| Associations | Convention applicable, emplois et contrats, temps partiel et financements analytiques |
| Hôtellerie et restauration | Horaires, repas, avantages et majorations propres au périmètre |
| Industrie, transport, propreté, santé privée | Modules spécifiques, classifications, cycles et indemnités selon conventions |
| BTP | Caisses de congés, déplacements, populations ouvriers/ETAM/cadres |
| Agriculture, particuliers employeurs, secteur public et autres régimes spécifiques | Études et lots dédiés avant toute annonce de prise en charge ; ne pas réutiliser les règles du régime général par défaut |

Pour chaque périmètre : afficher les conventions et versions prises en charge, cas exclus, tests réalisés et date de dernière maintenance. Bloquer le calcul définitif lorsqu’une règle essentielle n’est pas couverte. Le planning de déploiement sectoriel reste à définir avec Maguy.

### Module BTP

Matrice de couverture par population : ouvriers, ETAM, cadres ; bâtiment/travaux publics ; taille d’entreprise ; région ; convention, accords et caisse compétente. Ne pas appliquer les seules conventions ouvriers à toutes les populations.

Prévoir classifications et minima datés, petits et grands déplacements, paniers, heures et absences, congés gérés par les caisses, intempéries si couvertes, prévoyance/retraite et contrats de chantier selon les situations validées. Les taux et règles CIBTP sont paramétrés par caisse et période ; aucun taux unique présumé.

Les modèles de contrat sont versionnés et soumis à validation juridique. Un formulaire ne suffit pas à établir la validité d’un CDD, de son motif ou d’un CDI de chantier.

## 8. Déclarations sociales et organismes sectoriels

Respecter la norme NEODeS et les consignes applicables à la période déclarée. Prévoir DSN par établissement, contrôles préalables, corrections et annule-et-remplace selon les règles du dispositif, signalements couverts et gestion des retours métiers.

États distincts : fichier généré, contrôlé localement, déposé, reçu, accepté techniquement, anomalies métiers à traiter, dossier soldé après vérification. Un dépôt ou un contrôle technique réussi ne prouve pas l’exactitude des droits sociaux.

Conserver les accusés, comptes rendus et actions correctives. Activer le module CIBTP uniquement pour les entreprises concernées. Paramétrer ses données selon la caisse et rapprocher paie, DSN et retours CIBTP. Organiser les démarches éditeur avec Net-entreprises/GIP-MDS, la charte et les accès de test ; vérifier les conditions à jour avant intégration. La brique de contrôle ne délivre pas de certificat général de conformité.

## 9. Bulletins et documents de sortie

Respect des mentions et présentations obligatoires applicables, dont le montant net social, et des mentions interdites. PDF lisible, historique et correction traçable. Distinguer bulletin brouillon et bulletin émis.

Pour la remise électronique : information et droit d’opposition du salarié, intégrité, confidentialité, disponibilité réglementaire et récupération de l’ensemble des bulletins. Étudier un prestataire d’archivage adapté ; un simple envoi par courriel n’établit pas à lui seul toutes ces garanties.

Le double employeur doit être conservé cinq ans. La disponibilité des bulletins électroniques pour le salarié obéit à une obligation distincte prévue à l’article D3243-8 : cinquante ans ou jusqu’à l’âge légal visé par le texte augmenté de six ans. Vérifier le texte en vigueur au lancement et lors des évolutions. Prévoir la continuité en cas de fermeture du service.

Documents de sortie et événements déclaratifs : définir précisément ceux produits, ceux transmis et ceux simplement suivis. Validation humaine avant émission.

## 10. RGPD, confidentialité et sécurité

L’employeur est en principe responsable du traitement de ses données RH ; l’éditeur hébergeant pour son compte intervient généralement comme sous-traitant, avec ses propres traitements éventuels à analyser séparément. Prévoir contrat article 28, registre, information des salariés, gestion des droits et liste des sous-traitants.

Pas de déclaration courante du fichier de paie à la CNIL depuis le RGPD. Évaluer la nécessité d’une AIPD et d’un DPO selon le projet : ils ne sont pas automatiquement obligatoires pour tout logiciel. Encadrer particulièrement l’usage du NIR et les données sensibles. Hébergement UE/EEE proposé comme choix de projet ; tout transfert hors EEE doit être identifié et juridiquement encadré.

Exigences de projet : authentification multifacteur pour les gestionnaires, chiffrement en transit et au repos, gestion des secrets, isolation des entreprises, journal d’audit protégé, sauvegardes chiffrées et restauration testée, gestion des vulnérabilités. Aucun salaire, NIR ou RIB dans les journaux techniques ordinaires. Données fictives dans les démonstrations et tests usuels ; pour les tests organismes, suivre leurs exigences dans un environnement strictement encadré.

Politique de conservation par catégorie et point de départ, distinguant base active, archivage intermédiaire, obligations de preuve et suppression. Pas de suppression générale après cinq ans. Gérer les suspensions pour contentieux et le cycle des sauvegardes. Procédure de violation de données : information rapide du responsable du traitement ; notification CNIL dans les 72 heures lorsque les conditions du RGPD sont réunies.

## 11. Commercialisation et responsabilités

La création et la vente d’un logiciel de paie ne sont pas soumises, en règle générale, à un agrément préalable spécifique d’éditeur. Cette conclusion générale ne vaut pas autorisation de chaque service associé ni certification du produit.

Prévoir activité déclarée dans une structure adaptée, contrats clients, périmètre de couverture explicite, maintenance réglementaire, support, réversibilité et répartition des responsabilités. Distinguer vente du logiciel, prestation de paie et conseil juridique ; ces prestations doivent faire l’objet d’une analyse propre. RC professionnelle et couverture cyber à étudier avec l’assureur, sans les présenter comme universellement obligatoires.

Aucune allégation « agréé Urssaf », « certifié CNIL » ou équivalente sans fondement vérifiable. L’employeur conserve ses obligations sociales ; cela n’exonère pas l’éditeur de ses propres obligations contractuelles et de sécurité.

## 12. Recette et critères de lancement

| Domaine | Preuve attendue |
| --- | --- |
| Accès | Aucun accès entre sociétés ou hors rôle ; accès support tracé |
| Variables | Import sans doublon ; rapprochement des heures et justificatifs |
| Calcul | Comparaison indépendante sur cas représentatifs et cas limites ; écarts expliqués et validés |
| Cas métier | Entrée/sortie en cours de mois, temps partiel, HS, absence, congés caisse, acomptes, changement de taux et régularisation |
| DSN | Contrôles techniques, tests sur plateforme selon conditions, retours métiers analysés et rapprochement paie/DSN |
| Archivage | Export intégral, opposition au numérique, accès et continuité vérifiés |
| Résilience | Restauration démontrée ; objectifs de reprise et perte maximale de données fixés |

Avant paie réelle : validation par un professionnel compétent dans les conventions et régimes concernés sur le périmètre annoncé et plusieurs cycles en parallèle du système de référence. Bloquer un dossier non couvert ou un paramètre essentiel manquant. Une validation technique DSN ne remplace pas la recette des calculs.

## 13. Livrables et décisions à prendre

Livrables : maquettes, dictionnaire des données, matrice conventionnelle, catalogue des règles, spécification des imports/exports, plan de sécurité et conservation, dossier RGPD, plan de tests, procédure de clôture/correction, documentation utilisateur et maintenance.

Décisions : outil autonome ou liaison KIPBOARD/BATI.0 ; paie interne ou moteur partenaire ; populations et régions initiales ; nombre de sociétés/salariés ; format web ou bureau ; hébergement ; budget et calendrier ; prestations vendues en complément du logiciel.

Trois priorités : (1) définir les premiers secteurs et conventions à valider dans la trajectoire multi-activités ; (2) construire le dossier salarié et le cycle de validation des variables ; (3) choisir le moteur de calcul et organiser sa validation avant de développer les déclarations.

## 14. Sources officielles consultées

Vérification documentaire au 11 novembre 2026. Les règles sont à contrôler à nouveau avant mise en production ; ce cadrage ne constitue pas une validation juridique du produit.

- CNIL, Paie des employés : démarches et absence de déclaration courante : https://www.cnil.fr/fr/cnil-direct/question/paye-des-employes-que-faire
- CNIL, référentiel ressources humaines : https://www.cnil.fr/fr/le-referentiel-relatif-la-gestion-des-ressources-humaines-en-questions
- CNIL, RGPD chapitre IV, notamment articles 28, 32 et 33 : https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4
- Ministère du Travail, bulletin de paie : https://travail-emploi.gouv.fr/droit-du-travail/la-remuneration/article/le-bulletin-de-paie
- Code du travail, D3243-8 : https://code.travail.gouv.fr/code-du-travail/d3243-8
- Net-entreprises, norme DSN : https://www.net-entreprises.fr/declaration/norme-et-documentation-dsn/
- Net-entreprises, charte éditeurs : https://www.net-entreprises.fr/declaration/charte-editeurs-dsn/
- Net-entreprises, conditions d’utilisation : https://www.net-entreprises.fr/declaration/mentions-legales/
- Net-entreprises, outils de contrôle : https://www.net-entreprises.fr/declaration/outils-de-controle-dsn-val/
- CIBTP Île-de-France, paramétrage DSN : https://www.cibtp-idf.fr/entreprise/dsn/declarer


## Complément de conception

L’inventaire détaillé `ETAT_COMPLET_DONNEES_PAIE.md` précise les fiches entreprise/salarié, la préparation mensuelle et les sorties. Prévoir explicitement les HS à +25 %, +50 %, +100 % et à taux libre, selon les règles applicables, ainsi que les paniers et déplacements BTP. La production de bulletins fait partie de l’objectif central du produit.
