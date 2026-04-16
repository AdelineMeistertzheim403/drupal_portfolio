FROM composer:2 AS builder

WORKDIR /app

COPY drupal/composer.json drupal/composer.lock ./
RUN composer install \
  --no-dev \
  --prefer-dist \
  --optimize-autoloader \
  --no-interaction

COPY drupal/ /app/

FROM drupal:11-apache

ENV APACHE_DOCUMENT_ROOT=/var/www/html/web

WORKDIR /var/www/html

COPY --from=builder /app /var/www/html

RUN sed -ri "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf \
  && a2enmod rewrite \
  && mkdir -p /var/www/html/web/sites/default/files \
  && chown -R www-data:www-data /var/www/html
