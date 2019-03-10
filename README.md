# Todo

- [ ] Flytta RopaOlle.se till Netlify.
- [ ] MarkdownAllInOne removed.

## Info

- [Hugo](https://gohugo.io)
- [Install on Windows](https://gohugo.io/getting-started/installing/#windows)
- [Themes](https://themes.gohugo.io/)

## Skapa ny

```bash
hugo new site ropaolle.se # Skapa ny site
cd ropaolle.se
git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke # Ladda ner tema
echo 'theme = "ananke"' >> config.toml # Välj tema
cd mysite && hugo server -D # Starta server
```

## Powershell

```bash
# Visa path:
$env:path
# Uppdatera path
$env:Path += ";C:\Apps\Hugo\bin"
```
