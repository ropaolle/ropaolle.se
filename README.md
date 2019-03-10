# Todo

- [ ] Flytta RopaOlle.se till Netlify.
- [ ] MarkdownAllInOne removed.

## Info

- [Hugo](https://gohugo.io)
- [Install on Windows](https://gohugo.io/getting-started/installing/#windows)
- [Themes](https://themes.gohugo.io/)
    - [Kube](https://themes.gohugo.io/kube/)
    - [Hermite](https://themes.gohugo.io/hermit/)
- [Github Emoji](https://gist.github.com/rxaviers/7360908) - E.g. `:gem:`.
- [🍺 Unicode Character Finder](https://www.mclean.net.nz/ucf/) - Start from 1F300


 

U+1F607

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
