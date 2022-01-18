# mysql-estructura
Repositori de la Tasca 1 de l'sprint 2 del node bootcamp

### Correcció

Bona feina, Guillem! Alguns comentaris:

- Optica es pot simplificar força considerant que cada ulleres son una venda. També pots deixar la marca com un camp de les ulleres.

- Ben fet amb la pizzeria

- A Youtube cada usuari te un canal, per tant la taula canal poden ser tot camps dins de la taula usuari

- Spotify correcte

- Ben fet amb els scripts que sobreescriuren la base de dades completametn si existex


### Millores

Descripció de millores aplicades a partir de la correcció.

#### Taula Òptica

Merge de taula glasses, sale i brand a glasses_sale i brand_provider:
1. glasses_sale és el resultat d'incorporar tots els camps de sale a la taula glasses.
2. brand_provider és una nova taula relacional, provinent d'eliminar taula anterior brand, amb nom de brand com a PK de manera que s'aconsegueix que:
   1) el nom del brand sigui únic.
   2) s'apliqui la restricció que un sol brand només pugui estar relacionat amb un sol provider.
   3) el FK de glasses_sale cap a brand_provider sigui el mateix nom del brand, de manera que si només volem el nom del brand des de glasses_sale ens podrem estalviar un join.

#### Taula Youtube

Merge de taula channel a taula user.

- channel_id necessitarà un índex per poder buscar canals des de l'aplicació, però  no el creo a part perquè keyword UNIQUE ja l'implementa.