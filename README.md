# Drupal Portfolio

Portfolio personnel sous Drupal 11 avec un theme custom `adeline_portfolio`, lance en environnement Docker.

## Stack

- Drupal 11
- PHP / Apache via image `drupal:11-apache`
- MySQL 8
- Drush
- GitHub Actions pour la CI/CD
- Registry Docker privee
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

## Production

La production repose maintenant sur :

- un `Dockerfile` a la racine du repo
- un `docker/prod/docker-compose.yml` prevu pour tirer une image depuis la registry privee
- un workflow GitHub Actions dans `.github/workflows/prod.yml`
- une configuration Drupal pilotee par variables d'environnement

### Registry Docker

L'image de prod vise :

```text
registry.adelinemeistertzheim.fr/adeline/drupal-portfolio
```

Le fait d'avoir deja une autre image, par exemple ton projet Design Pattern Playground, dans la meme registry ne pose pas de probleme.
Il faut simplement utiliser un autre nom de repository ou d'autres tags.

Exemple :

- `registry.adelinemeistertzheim.fr/adeline/drupal-portfolio:latest`
- `registry.adelinemeistertzheim.fr/adeline/design-pattern-playground:latest`

### Variables d'environnement

Des exemples sont fournis dans :

- `.env.example`
- `.env.prod.example`
- `PROD_ENV_FILE.example`
- `GITHUB_ACTIONS_SECRETS.example.md`

Les plus importantes pour la prod :

- `APP_IMAGE`
- `APP_IMAGE_TAG`
- `TRAEFIK_ACME_EMAIL`
- `TRAEFIK_DOMAIN`
- `DRUPAL_HASH_SALT`
- `DRUPAL_DB_*`
- `MYSQL_*`

### Domaine Traefik

Le `docker-compose` de prod utilise actuellement le domaine :

```text
portfolioDP.adelinemeistzheim.fr
```

Verifier ce point avant deployment : il est ecrit differemment de `adelinemeistertzheim.fr`.

### Deploiement sur le serveur

Le workflow GitHub Actions :

1. build l'image Docker
2. pousse l'image dans la registry privee
3. se connecte au serveur en SSH
4. fait un `docker login` sur la registry
5. lance `docker compose pull` puis `docker compose up -d`

Le serveur doit deja contenir :

- un clone du repo
- un fichier `.env` adapte a la prod
- Docker et Docker Compose

### Secrets GitHub Actions

Configurer ces secrets dans le repo GitHub :

- `REGISTRY_HOST`
- `REGISTRY_NAMESPACE`
- `REGISTRY_USERNAME`
- `REGISTRY_PASSWORD`
- `VPS_SSH_HOST`
- `VPS_SSH_PORT`
- `VPS_SSH_USER`
- `VPS_SSH_PRIVATE_KEY`
- `VPS_SSH_KNOWN_HOSTS`
- `VPS_APP_DIR`
- `PROD_ENV_FILE`

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
- Pour la prod, utiliser un `.env` serveur et ne jamais committer les secrets.
