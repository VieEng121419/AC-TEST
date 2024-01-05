# Title: Search and View Information

## Description:

This code allows users to search and view information about players, teams, and nations. It uses JSON files to store data.

## Usage:

To get started, run the code by running the following command in the terminal:
```node.js
node index.js
```
You will then be prompted to enter your choice. You can choose from the following options:

* Press **1** to search
* Press **2** to view a list of searchable fields
* Type **'quit'** to exit

If you choose option 1 or 2, You will then be prompted to enter your choice. You can choose from the following options:

* 1: Search for players
* 2: Search for teams
* 3: Search for nations

If you choose option 1, 2, or 3, you will be prompted to enter a keyword and value. The keyword is the field you want to search for and the value is the value you are looking for.

For example, to search for all players named **"Messi"** , you would enter:

```javascript
Type 'quit' to exit at any time. Press Enter to continue 
 
         Select search options: 
         - Press 1 to search 
         - Press 2 to view a list of searchable fields 
         - Type 'quit' to exit 
1
Select 1: Players or 2: Team or 3: Nations
1
Enter search term 
name
Enter search value 
Messi
```
The code will return the search results in the console.

## Data Structure:

The code uses JSON files to store data. Each JSON file contains a list of objects. Each object represents a player, team, or country.

Here is an example of a JSON file for player data:
```javascript
[
  {
    "_id": "1",
    "name": "Lionel Messi",
    "team_id": "1",
    "nation_id": "1"
  },
  {
    "_id": "2",
    "name": "Cristiano Ronaldo",
    "team_id": "2",
    "nation_id": "2"
  },
  ...
]
```
