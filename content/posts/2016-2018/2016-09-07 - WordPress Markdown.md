---
author: "Olof Sjögren"
date: 2016-09-07
title: Wordpress Markdown
---

# TOC

- [Headers](#p1)
- [Lines](#p2)
- [Emphasis](#p3)
- [Blockqoutes](#p4)
- [Kod](#p5)
- [Tables](#p6)
- [Lists](#p7)
- [Links](#p8)

# <a id="p1"></a>Headers

```md
# H1

## H2

### H3

#### H4

##### H5

###### H6
```

<!--more-->

# H1

## H2

### H3

#### H4

##### H5

###### H6

# <a id="p2"></a>Lines

```md
---

---

---
```

---

---

---

# <a id="p3"></a>Emphasis

```md
Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~ <s>Scratch this.</s> <del>Scratch this.</del>
```

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~ <s>Scratch this.</s> <del>Scratch this.</del>

# <a id="p4"></a>Blockquotes

```md
### Text

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.

## Markdown

> ### This is a header.
>
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
> return shell_exec("echo $input | $markdown_script");
```

### Text

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> &gt;
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.

## Markdown

> ## This is a header.
>
> &gt;
>
> 1. This is the first list item.
> 2. This is the second list item.
>    &gt;
>    Here's some example code:
>    &gt;
>    return shell_exec("echo $input | $markdown_script");

# <a id="p5"></a>Kod

Du kan markera `kod` i text med `.

```md
ReactDOM.render(

<h1>Hello, world!</h1>
, document.getElementById('root') );
```

Du kan markera `kod` i text med `.

```md
ReactDOM.render(

<h1>Hello, world!</h1>
,
document.getElementById('root')
);
```

# <a id="p6"></a>Tables

```md
| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |
```

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

# <a id="p7"></a>Lists

```md
- Rad nummer ett
- Rad nummer två
- Rad nummer ett
- Rad nummer två
```

- Rad nummer ett
- Rad nummer två
- Rad nummer ett
- Rad nummer två

# <a id="p8"></a>Links

```md
[Link](https://ropaolle.se)
```

[Link](https://ropaolle.se)
