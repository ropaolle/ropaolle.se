# Todo

- [ ] Flytta RopaOlle.se till Netlify.
- [ ] MarkdownAllInOne removed.

## Info

- [Hugo](https://gohugo.io)
- [Install on Windows](https://gohugo.io/getting-started/installing/#windows)
- [Themes](https://themes.gohugo.io/)

## Skapa ny site

```bash
hugo new site ropaolle && cd ropaolle

# Add new theme
git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
echo 'theme = "ananke"' >> config.toml

# Add page
hugo new posts/my-first-post.md

# Starta server
hugo server -D
```



## Powershell

```bash
# Visa path:
$env:path
# Uppdatera path
$env:Path += ";C:\Apps\Hugo\bin"
```
