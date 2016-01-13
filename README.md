# markx-express

## A hosting app for editing and browsing markdown files stored in a folder

### Installation

1. clone the git repository: `git clone git@github.com:eschmid72/markx-express.git`
1. `cd markx-express`
1. `npm install`
1. `bower install`
1. create a `config.json` file:
```json
{
  "directory": "/path/to/folder",
  "port": 5000
}
```
1. create an `index.md` in the folder, if it's empty
1. run: `node app`
1. browse: http://localhost:5000

Atm., you can only view Markdown files.
Links linking to other pages you need to do by yourself

### URL

`nameOfFile.md` => http://localhost:5000/nameOfFile

### TODO

* adding Navigation Menu
* toolbar buttons [new file| edit/view | save ]
* switch to edit mode
* create new file
* config option: editable mode on/off
* indexing
* search function
* git functions: add, commit, push, pull
# jade-bootstrap
