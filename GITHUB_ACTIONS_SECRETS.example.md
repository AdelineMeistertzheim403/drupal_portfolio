# GitHub Actions Secrets

Configurer ces secrets dans `Settings > Secrets and variables > Actions`.

## Registry

`REGISTRY_HOST`

```text
registry.adelinemeistertzheim.fr
```

`REGISTRY_NAMESPACE`

```text
adeline
```

`REGISTRY_USERNAME`

```text
ton-utilisateur-registry
```

`REGISTRY_PASSWORD`

```text
ton-mot-de-passe-registry
```

## VPS

`VPS_SSH_HOST`

```text
ip-ou-domaine-de-ton-vps
```

`VPS_SSH_PORT`

```text
22
```

`VPS_SSH_USER`

```text
ton-utilisateur-ssh
```

`VPS_SSH_PRIVATE_KEY`

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

`VPS_SSH_KNOWN_HOSTS`

```text
ton-vps ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI...
```

`VPS_APP_DIR`

```text
/opt/drupal_portfolio
```

## Environment File

`PROD_ENV_FILE`

Contenu complet du fichier de production. Utiliser comme base :

- `PROD_ENV_FILE.example`

Exemple de structure :

```dotenv
APP_IMAGE=registry.adelinemeistertzheim.fr/adeline/drupal-portfolio
APP_IMAGE_TAG=main

TRAEFIK_ACME_EMAIL=contact@adelinemeistertzheim.fr
TRAEFIK_DOMAIN=portfolioDP.adelinemeistertzheim.fr

DRUPAL_DB_NAME=drupal
DRUPAL_DB_USER=drupal
DRUPAL_DB_PASSWORD=replace-with-a-strong-password
DRUPAL_DB_HOST=db
DRUPAL_DB_PORT=3306

MYSQL_DATABASE=drupal
MYSQL_USER=drupal
MYSQL_PASSWORD=replace-with-the-same-strong-password
MYSQL_ROOT_PASSWORD=replace-with-a-different-strong-root-password

DRUPAL_HASH_SALT=replace-with-a-long-random-string-at-least-64-characters
DRUPAL_ERROR_LEVEL=hide
DRUPAL_TWIG_DEBUG=0
DRUPAL_TRUSTED_HOST=portfolioDP.adelinemeistertzheim.fr
```

## Notes

- `REGISTRY_HOST` ne doit pas contenir `https://`
- `REGISTRY_NAMESPACE` doit etre le namespace exact de la registry
- `VPS_SSH_PRIVATE_KEY` doit etre la cle privee complete, multi-ligne
- `PROD_ENV_FILE` doit contenir des retours a la ligne normaux
- `DRUPAL_DB_PASSWORD` et `MYSQL_PASSWORD` doivent etre identiques
