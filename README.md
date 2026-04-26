
<h1> Treball Individual/DDJW_2525/Nil Portas</h1> 

 --> [Introducció](#introducció).

 --> [Descripció del disseny del joc](#descripció-del-disseny-del-joc).

 --> [Descripció de les parts més revellants de la implementació](#descripció-de-les-parts-més-revellants-de-la-implementació).

 --> [Conclusions i problemes trobats](#conclusions-i-problemes-trobats).
 
## Introducció

Aquest es un joc de memoria, es a dir, donat un grup de parelles de cartes, el jugador ha, un cop s'han girat les cartes, fer les corresponents parelles de cartes, fins que consegueixi fer totes les parelles de cartes, o, en el altre cas, que el jugador perdi tota la puntuació.

## Descripció del disseny del joc

Jugar: Comença una nova partida a un altre .html.
Opcions: --> Numero de cartes: El jugador decideix si es formen parelles, trios o quartets de cartes.
         --> Dificultat: El jugador decideix quants grups de cartes apareixen a la partida.
         --> Mode: El jugador decideix si jugar el mode normal (un nivell), o el mode infinit (x nivells).

## Descripció de les parts més revellants de la implementació

La funció createLevel --> Sobretot per el mode infinit, el qual genera les parelles/trios/quartets de cartes.
La funció start --> Obté els id's del vector que guarda les parelles/trios/quartets de cartes i els barrega.
La funció click --> Detecta el click del jugador i, segons la variable lastCard, i la carta clickada del jugador, comprova si el grup de cartes coicideix, amb la seva variació per el mode infinit, el qual només varia el nivell.
La funció nextLevel --> Augmenta el nivell i actualitza les variables de la partida.

## Conclusions i problemes trobats 

Tota la implementació de JavaScript ha siguit, en la seva mesura, una gran complicació, i, pot ser que hi hagi algunes coses que no acabin de funcionar correctament, degut al meu poc coneixement del llenguatge.











