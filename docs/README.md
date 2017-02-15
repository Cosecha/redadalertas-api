# Redadalertas API documentation

## Requirements

1. Node.js
2. Git

## Steps

1. [Set up your repo for GitHub Pages](#set-up-your-repo-for-github-pages)
2. [Generate the HTML from the `main.yaml`](#from-yaml-to-html)
3. [Deploy to GitHub Pages](#deploy-to-github-pages)

## Set up your repo for GitHub Pages

From the root of the project repo:
```
cd docs
```
Create the `gh-pages` directory:
```
mkdir gh-pages
```
Clone the project repo into that directory, and change into that directory:
```
git clone https://github.com/cosecha/redadalertas-api.git --branch gh-pages --single-branch gh-pages

```
You now have a `./docs/gh-pages` directory that is ignored by git. Inside this directory is another git repository of this same project, but ONLY the gh-pages branch. This directory will serve solely to receive newly generated HTML (from `main.yaml`) to display the API documentation through GitHub Pages.


## From YAML to HTML

From the root of the project repo:
```
cd docs
```
Initialize with:
```
npm install
```
Edit the `main.yaml` file. Then build out the HTML with:
```
npm start
```
This will build out the html file into the `gh-pages` directory. (Notice, this folder is ignored by git).

## Deploy to GitHub pages

Now that you have generated new HTML to reflect the changes to API documentation, it is time to 'deploy' to GitHub Pages.

From the root of the project repo, change into the `gh-pages` directory:
```
cd docs/gh-pages
```
Add and commit any changes to the generated documentation:
```
git add -all
git commit -m "Your commit message here"
```
And now push the changes to the only remote available, `gh-pages`:
```
git push origin gh-pages
```
