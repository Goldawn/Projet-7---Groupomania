# GROUPOMANIA - Créer un réseau social d'entreprise


## Description

Septième projet proposé dans le cadre de la formation de développeur web d'OpenClassrooms. Il consiste à construire un réseau social interne pour les employés de Groupomania.
La plateforme doit permettre des échanges entre les utilisateurs sur le modèle d'autres sites comme 9gag ou encore reddit. Des logos ont été fournis pour définir une charte graphique.
L'utilisation d'une base de données relationnelles qui se manipule avec le langage SQL était obligatoire.

**Backend** :   Utilisation de Node.js ainsi que du Framework Express
            Base de données MySQL et utilisation de l'ORM Sequelize.

**Frontend** : Utilisation de la librairie JavaScript React.

### Principales fonctionnalités :

Les utilisateurs peuvent :
- CREER / MODIFIER leur profil
- CREER des publications 
- EDITER / SUPPRIMER leurs publications
- PARCOURIR les publications des autres utilisateurs
- LIKER les posts de n'importe quel utilisateur
- COMMENTER les posts des autres utilisateurs
- EDITER / SUPPRIMER leurs commentaires

Les modérateurs ont accès à toutes les fonctionnalités ci-dessus, et peuvent également :
- EDITER / SUPPRIMER les posts et commentaires laissés par les  autres utilisateurs

### Extras :   
- Session persistante au rechargement de la page
- Ajout d'un Dark-mode persistant

## Installation

1. Cloner le dépôt Github
```bash
git clone https://github.com/Goldawn/Projet-7---Groupomania.git
```
2. Mise en place de l'environnement 

### Base de données MySQL
MySQL doit être installé sur la machine.  
Dans le dossier backend, aller sur le fichier config.json et remplacez la valeur du "password" par votre mot de passe (initialisé à null)
```bash
cd backend
npx sequelize db:create
npx sequelize db:migrate
```
### Backend
```bash
cd backend
npm install
node server
```
### Frontend
```bash
cd frontend
npm install
yarn start
```

3. Tester l'application 

- L'application est accessible à l'adresse : localhost:3000
- L'accès au backend est à l'adresse : localshost:9000