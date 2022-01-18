# mysql-estructura
Repositori de la Tasca 1 de l'sprint 2 del node bootcamp

### Feedback de correcció

1. Optica es pot simplificar força considerant que cada ulleres son una venda. També pots deixar la marca com un camp de les ulleres.
1. Ben fet amb la pizzeria.
1. A Youtube cada usuari te un canal, per tant la taula canal poden ser tot camps dins de la taula usuari.
1. Spotify correcte.
1. Ben fet amb els scripts que sobreescriuren la base de dades completament si existeix.

### Millores aplicades

(A partir del feedback de correcció)

#### Taula Òptica

Merge de taula glasses, sale i brand a glasses_sale i brand_provider:
1. glasses_sale és el resultat d'incorporar tots els camps de sale a la taula glasses.
2. brand_provider és una nova taula relacional, provinent d'eliminar taula anterior brand, amb nom de brand com a PK de manera que s'aconsegueix que:
   1. El nom del brand sigui únic. 
   2. S'apliqui la restricció que un sol brand només pugui estar relacionat amb un sol provider.
   3. El FK de glasses_sale cap a brand_provider sigui el mateix nom del brand, de manera que si només volem el nom del brand des de glasses_sale ens podrem estalviar un join.

#### Taula Youtube

1. Merge de taula channel a taula user. 
   1. channel_id necessitarà un índex per poder buscar canals des de l'aplicació, però keyword UNIQUE ja l'implementa i per tant no el creo a part.