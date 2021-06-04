# REST API dla bazy książek

Konfiguracja bazy danych:

Po zainstalowaniu bazy danych należy podmienić konfigurację w pliku index.js (od linijki 115):

```
const dbConnData = {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'tajne'
};
```


Dostępne endpointy:

`POST /api/book` - tworzy książkę o przesłanych w body wartościach.
Przykładowe body:

```
{
    "title": "Cień Wiatru",
    "author": "Carlos Ruiz Zafon",
    "genre": "Fiction",
    "release_date": "2001-05-01",
    "description": "Lorem ipsum",
    "image_url: "https://..."
}

{
    "title": "Steve Jobs",
    "author": "Walter Isaacson",
    "genre": "Biography",
    "release_date": "2014-01-01",
    "description": "Lorem ipsum",
}


```

`GET /api/book` - pobiera wszystkie książki

`GET /api/book/:id` - pobiera książkę o podanym id

`POST /api/book/:id/rate` - pozwala oddać głos na daną książkę. Pobiera z body wartość pola `score`

`DELETE /api/book/:id` - usuwa książkę o podanym id

`PUT /api/book/:id` - aktualizuje książkę o podanym id. Przykładowe body:

```
{
    "title": "Steve Jobs",
    "author": "Walter Isaacson",
    "genre": "Biography",
    "release_date": "2014-01-01",
    "description": "Lorem ipsum",
}
```



