# Drupal Portfolio

Portfolio personnel sous Drupal 11 avec un theme custom `adeline_portfolio`, lance en environnement Docker.

## Stack

- Drupal 11
- PHP / Apache via image `drupal:11-apache`
- MySQL 8
- Drush
- Theme custom : `drupal/web/themes/custom/adeline_portfolio`

## Structure

```text
.
├── docker/
│   ├── dev/
│   │   └── docker-compose.yml
│   └── prod/
├── drupal/
│   ├── composer.json
│   ├── vendor/
│   └── web/
│       ├── core/
│       ├── sites/
│       └── themes/
│           └── custom/
│               └── adeline_portfolio/
└── README.md
```

## Prerequis

- Docker
- Docker Compose
- Git

## Installation

Cloner le projet puis installer les dependances Composer si necessaire :

```bash
git clone <url-du-repo>
cd drupal_portfolio/drupal
composer install
```

## Lancer le projet en local

Depuis le dossier `docker/dev` :

```bash
cd /home/adeline/drupal_portfolio/docker/dev
docker compose up -d
```

Le site est alors accessible sur :

```text
http://localhost:8080
```

## Conteneurs utilises

- `drupal_dev` : conteneur Apache / PHP / Drupal
- `drupal_db_dev` : conteneur MySQL

## Commandes utiles

### Vider le cache Drupal

```bash
docker exec -it drupal_dev /opt/drupal/vendor/bin/drush cr
```

### Recreer les conteneurs

```bash
cd /home/adeline/drupal_portfolio/docker/dev
docker compose up -d --force-recreate
```

### Arreter l'environnement

```bash
cd /home/adeline/drupal_portfolio/docker/dev
docker compose down
```

## Theme custom

Le theme se trouve ici :

```text
drupal/web/themes/custom/adeline_portfolio
```

Fichiers principaux :

- `templates/page--front.html.twig` : page d'accueil
- `templates/node--projet.html.twig` : carte projet dans la liste
- `templates/node--projet--full.html.twig` : fiche projet detaillee
- `templates/includes/navbar.html.twig` : navbar du site
- `css/style.css` : styles globaux
- `js/project-carousel.js` : carousel de la galerie projet
- `adeline_portfolio.libraries.yml` : declaration des assets Drupal

## Fonctionnalites mises en place

- page d'accueil personnalisee
- navbar custom
- liste de projets avec cards cliquables
- page detail projet
- bouton retour
- carousel d'images
- ouverture des images en grand dans une lightbox
- identite visuelle glassmorphism / tech premium

## Git

Le projet contient un `.gitignore` adapte a Drupal et Docker.

Exemples de fichiers ignores :

- `drupal/vendor/`
- `drupal/web/core/`
- `drupal/web/sites/*/files/`
- fichiers locaux de type `settings.local.php`
- fichiers d'IDE et logs

## Notes

- Les assets et le theme custom doivent etre versionnes.
- Les dependances Composer ne doivent pas etre committees.
- Apres chaque modification Twig, JS ou de certaines config Drupal, penser a vider le cache.
