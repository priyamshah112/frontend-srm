SRM front end. Presentation layer code for SRM

# srm-frontend

FrontEnd code of srm website

## Running the project

---

## ESLint Setup in VSCode

First of all, make sure you installed all devDependencies that are available in package.json. If not installed please run `yarn` or `npm install`.

### VSCode Extensions

To use eslint code format with vscode need to install 2 extensions.

- [ESLint (Dirk Baeumer)](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

To format the code on save please add these lines settings.json(~/Library/Application Support/Code/User/settings.json)

```
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
```
Make sure you enabled ESLint for your project.