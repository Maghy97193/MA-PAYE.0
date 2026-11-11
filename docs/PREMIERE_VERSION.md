# MA PAYE.0 — Première version

Outil RH et préparation de paie multi-activités. Démonstration avec données fictives uniquement.

## Utilisation

Ouvrir index.html dans un navigateur moderne, ou servir le dossier avec `python3 -m http.server 8000` puis ouvrir http://localhost:8000.

## Fonctionnalités

- Choix parmi trois entreprises de démonstration de secteurs différents.
- Ajout et modification des dossiers salariés de test.
- Variables par entreprise, salarié et mois : heures, prime brute, état de validation.
- Actions et suivi des pièces manquantes.
- Export CSV des variables et sauvegarde JSON.
- Enregistrement local dans le navigateur, sans synchronisation entre appareils.

## Limites

Aucun calcul de cotisations, bulletin réglementaire, transmission DSN ou stockage de documents. Aucune authentification applicative ni base de données serveur. Ne pas utiliser avec des données RH réelles. La sauvegarde JSON est téléchargeable ; la restauration par import reste à développer.

## Vérifications réalisées

Syntaxe JavaScript ; création d’un salarié ; saisie et validation d’une prime ; conservation après rechargement ; affichage séparé des salariés selon l’entreprise choisie. Le responsive doit encore être vérifié sur les appareils cibles. Les exports nécessitent une recette de téléchargement et réimport dans l’outil de destination.

## Suite

1. Gestion des entreprises et dossiers salariés complets.
2. Absences, contrats, variables détaillées et contrôles.
3. Authentification, habilitations, sauvegarde et restauration sécurisées.
4. Moteur de paie versionné et testé par convention, bulletins puis DSN.

La version hébergée est maintenue séparément : ce dépôt n’installe pas une synchronisation automatique avec l’hébergement.
