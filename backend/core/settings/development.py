from .base import *

DEBUG = True

# Clé secrète pour le développement. NE PAS UTILISER EN PRODUCTION.
SECRET_KEY = 'django-insecure-votre-cle-de-developpement-ici'

ALLOWED_HOSTS = []

DATABSES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
