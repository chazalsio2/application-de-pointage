
# Project Title

Brief qui consiste à créer une application de pointage pour une entreprise.

## Sujet : Pointage en entreprise 
L'outil doit permettre de gérer les pointages des employés d'une entreprise. 
Les employés doivent enter leur code dans l'application pour valider leur pointage. 
Les employés doivent pouvoir consulter l'historique de leurs pointages. 
L'application doit être accessible depuis un navigateur web. 
Si vous avez le temps, vous pouvez également proposer en plus une application mobile en react-native.

## Identification 
- Lors de la saisie du code, le premier pointage de la journée est enregistré, si une saisie existe déjà dans la journée, ça enregistre le dernier pointage de la journée. 

## Gestion des utilisateurs : 
- Create Read Update Delete (CRUD) des utilisateurs si profil admin 
- Statistique utilisateur ( nombre d'utilisateurs, ...etc) si profil admin

## Gestion des  pointages :
- Create Read Update Delete (CRUD) des pointages ( Entrée et Sortie ) si profil admin
- Create Read uniquement ( Entrée et Sortie ) si profil user
- Statistique pointage ( nombre de pointage, nombre de personnes qui a plus de 35 heures, ...etc) si profil admin

## Contraintes technologiques
- Front : React. ou SSR : ( Nextjs 13 )
- TailwindCSS ( pas de bootstrap ou de css maison )
- Si vous avez le temps, vous pouvez également proposer EN PLUS une application mobile en react-native.
- Pour le Back : Firebase ou ( Nodejs + Graphql + MongoDB )
- Docker compose si vous faite du ReactJS et ( Nodejs Graphql + MongoDB )
( Le plus simple serait de partir sur du React + TailwindCSS + Firebase )

