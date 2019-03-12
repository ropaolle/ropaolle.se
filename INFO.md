# Todo

- [ ] Flytta RopaOlle.se till Netlify.
- [ ] MarkdownAllInOne removed.

https://sourcethemes.com/academic/docs/writing-markdown-latex/#images

## Info

- [Hugo](https://gohugo.io)
- [Install on Windows](https://gohugo.io/getting-started/installing/#windows)
- [Themes](https://themes.gohugo.io/)
  - [Kube](https://themes.gohugo.io/kube/)
  - [Hermite](https://themes.gohugo.io/hermit/)
- [Github Emoji](https://gist.github.com/rxaviers/7360908) - E.g. `:gem:`.
- [🍺 Unicode Character Finder](https://www.mclean.net.nz/ucf/) - Start from 1F300
- [Favicons](https://realfavicongenerator.net/)

## Skapa ny site

```bash
hugo new site ropaolle && cd ropaolle

# Hermit theme
git submodule add --force https://github.com/Track3/hermit.git themes/hermit

# Ananke theme
#git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
#echo 'theme = "ananke"' >> config.toml
#hugo new posts/my-first-post.md # endast Ananke

# Starta server
hugo server -D
```

## Export SVG from Illustrator

- Styling: Internal CSS
- Font: Convert To Outline
- Images: Preserve
- Decimal: 4
- Objekt id: Minimal
- Minify: Checked
- Responsive: Unchecked

## Diverse

```bash
# Ny branch
git checkout -b version-1.0.x

# Submodules
git clone --recurse-submodules -j8 git://github.com/foo/bar.git # Clone repo with modules
git submodule update --init --recursive # Download
```

## Powershell

```bash
# Visa path:
$env:path
# Uppdatera path
$env:Path += ";C:\Apps\Hugo\bin"
```
