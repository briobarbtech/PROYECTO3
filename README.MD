# Proyecto Integral N°2

El presente documento, es el **Proyecto Integral N°3** de ***Argentina Program 4.0***. Esta es una pequeña solución informática que sirve registrar los contenidos de una plataforma de streaming.
La misma, fue diseñada y construida sobre una arquitectura API RESTful, la cual está desarrollada bajo las restricciones y recomendaciones de REST, además, implementa buenas prácticas de programación.

#### Especificaciones
- Servidor: http://127.0.0.1:8000
- Autor: Brian Ruben Barquesi

#### Requerimientos
- Node.js v18.13.0
- GIT version 2.37.1
- IDE - Visual Studio Code v1.82.2

#### Estructura de directorios
``` tree
    ├── node_modules
    ├── src
    │   └── server.js
    ├── services
    │   └── connection.js
    ├── .env
    ├── .env.dist
    ├── .eslintrc.json
    ├── .gitignore
    ├── routes
    |   └──content.js
    ├── controller
    |   └── content.js
    ├── models
    |   └── actor.js
    |   └── category.js
    |   └── genre.js
    |   └── movie_actor.js
    |   └── movie_genre.js
    |   └── movie.js
    |   └── poster.js
    |   └── relations.js
    ├── package.json
    ├── package-lock.json 
    ├── .gitignore
    ├── .env.dist
    └── README.md
```

### CONFIGURACION DE ENTORNO
  - #### VARIABLES DE ENTORNO
    Se debe hacer una copia del archivo **.env.dist** y renombrarlo como **.env**. Con respecto a su contenido, es necesario asignar los valores a correspondientes a las variables:
    ``` js
        SERVER_PORT=8000
        SERVER_HOST=127.0.0.1

        MYSQL_DB_NAME='nombre de la base de datos'
        MYSQL_USER='Usuario del administrador de la base de datos'
        MYSQL_PASSWORD='Contraseña del administrador de la base de datos'
    ```


#### Métodos HTTP
| Tipo   | URI                                      | Descripción                             |
| ------ | ---------------------------------------- | --------------------------------------- |
| GET    | http://127.0.0.1:8000/api/v1/catalogue   | Obtiene los registros (permite filtros) |
| GET    | http://127.0.0.1:8000/api/v1/catalogue/1 | Obtiene un registro en específico       |
| POST   | http://127.0.0.1:8000/api/v1/catalogue   | Crea un nuevo registro                  |
| PUT    | http://127.0.0.1:8000/api/v1/catalogue/1 | Modifica un registro en específico      |
| DELETE | http://127.0.0.1:8000/api/v1/catalogue/1 | Elimina un registro en específico       |
| GET    | http://127.0.0.1:8000/api/v1/category    | Obtiene los registros                   |

#### Método GET:
- Request:
  - Parámetros opcionales de tipo QUERY:
    - name=The Crown  *(tipo: string. Trae los contenidos que matchea con el texto introducido)* 
    - category=1  *(tipo: integer. Trae solo los contenidos que comparten la categoria con id 1)* 
    - genre=10  *(tipo: integer. Trae solo los contenidos que incluyen un género con id 10)* 
- Response:
    ``` json
        {
    "message": "Ok!",
    "content": [
        {
        "ID": 1,
        "title": "The Crown",
        "categoryID": 1,
        "summary": "Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.",
        "season": 4,
        "CategoryID": 1,
        "Category": {
            "ID": 1,
            "categoryName": "Serie"
        },
        "Genres": [
            {
            "ID": 5,
            "genreName": "Drama",
            "movie_genre": {
                "movieID": 1,
                "genreID": 5,
                "MovieID": 1,
                "GenreID": 5
            }
            },
            {
            "ID": 10,
            "genreName": "True facts",
            "movie_genre": {
                "movieID": 1,
                "genreID": 10,
                "MovieID": 1,
                "GenreID": 10
            }
            }
        ],
        "Actors": [
            {
            "ID": 1,
            "actorName": "Claire Fox",
            "movie_actor": {
                "movieID": 1,
                "actorID": 1,
                "MovieID": 1,
                "ActorID": 1
            }
            },
            {
            "ID": 2,
            "actorName": "Olivia Colman",
            "movie_actor": {
                "movieID": 1,
                "actorID": 2,
                "MovieID": 1,
                "ActorID": 2
            }
            },
            {
            "ID": 3,
            "actorName": "Matt Smith",
            "movie_actor": {
                "movieID": 1,
                "actorID": 3,
                "MovieID": 1,
                "ActorID": 3
            }
            },
            {
            "ID": 4,
            "actorName": "Tobias Menzies",
            "movie_actor": {
                "movieID": 1,
                "actorID": 4,
                "MovieID": 1,
                "ActorID": 4
            }
            },
            {
            "ID": 5,
            "actorName": "Vanesa Kirby",
            "movie_actor": {
                "movieID": 1,
                "actorID": 5,
                "MovieID": 1,
                "ActorID": 5
            }
            },
            {
            "ID": 6,
            "actorName": "Helena Bonham Carter",
            "movie_actor": {
                "movieID": 1,
                "actorID": 6,
                "MovieID": 1,
                "ActorID": 6
            }
            }
        ]
        }
    ]
    }
    ```
  - Código HTTP: **200** *content: catalogue*
  - Código HTTP: **400** *message: Something went wrong*


#### Método GET - Específico:
- Request:
  - Parámetro obligatorio de tipo URL:
    - 5 *(tipo: integer. Indica el código del contenido que se requiere obtener)*
- Response:
    ``` json
        
    {
        "message": "Ok!",
        "content": {
        "ID": 5,
        "title": "Gambito de Dama",
        "categoryID": 1,
        "summary": "En los cincuenta, una joven de un orfanato descubre que tiene un increíble don para el ajedrez y recorre el arduo camino a la fama mientras lucha contra las adicciones.",
        "season": 1,
        "CategoryID": 1}
    }
    ```
  - Código HTTP: **200** *content: catalogue*
  - Código HTTP: **400** *message: Not found*

#### Método POST:
- Request:
  - Parámetros requeridos del BODY:
  title, summary, season, categoryID
    - title=Sherlock *(tipo: string. Establece el valor del nombre)* 
    - summary='Descripción' *(tipo: string. Establece la descripción del contenido)* 
    - season=4              *(tipo: integer. Establece la cantidad de temporadas)* 
    - categoryID=1          *(tipo: integer. Establece el tipo de contenido como 'Serie')* 
- Response:
  - Código HTTP: **201** *message: 'Created, content:newCatalogue'*
  - Código HTTP: **400** *message: 'Data is missing'*
  - Código HTTP: **500** *message: 'Something went wrong'*


#### Método PUT:
- Request:
  - Parámetro obligatorio de tipo URL:
    - 16 *(tipo: integer. Indica el código del contenido que se requiere modificar)*
  - Parámetros requeridos del BODY:
    - title=Sherlock *(tipo: string. Establece el valor del nombre)* 
    - summary='Otra descripción' *(tipo: string. Establece la descripción del contenido)* 
    - season=4              *(tipo: integer. Establece la cantidad de temporadas)* 
    - categoryID=1          *(tipo: integer. Establece el tipo de contenido como 'Serie')* 
- Response:
  - Código HTTP: **200** *message: 'Updated!'*
  - Código HTTP: **400** *message: 'Something went wrong'*
  - Código HTTP: **400** *message: 'Id is undefined'*
  - Código HTTP: **500** *message: 'Something went wrong'*



#### Método DELETE:
- Request:
  - Parámetro obligatorio de tipo URL:
    - 16 *(tipo: integer. Indica el código del contenido que se requiere eliminar)*
- Response:
  - Código HTTP: **200** *message: 'Deleted'*
  - - Código HTTP: **400** *message: 'Something went wrong'*
  - Código HTTP: **500** *message: Something went wrong*
