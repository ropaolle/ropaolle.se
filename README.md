# Todo

* [ ] Cron kör ej backup, måste daemon köra cron?
* [ ] Portfolio - Fält: Demo, GitHub Repo - Batches?
* [ ] ?

## Info

* [Bitnami dokumentation](https://docs.bitnami.com/google/apps/wordpress-multisite/)

## Commands

```bash
bash ssh.sh # Connect with SSH
bash push.sh # Copy files from local to remote
cd /opt/bitnami/apps/wordpress/htdocs/wp-content/themes/ropaolle # Theme folder
bash build.sh # Generera temafiler
```

## Add html

```php
/*
beans_content_prepend_markup
beans_content_after_markup
beans_header_after_markup
beans_header_prepend_markup
beans_body_prepend_markup
beans_body_after_markup

beans_post_prepend_markup
beans_post_after_markup

beans_post_body_prepend_markup
beans_post_body_append_markup
beans_post_header_prepend_markup
beans_post_header_append_markup
beans_post_title_prepend_markup
beans_post_title_append_markup
beans_post_content_prepend_markup
beans_post_content_append_markup
*/

add_action( 'beans_content_prepend_markup', 'beans_child_view_add_description' );

function beans_child_view_add_description() {

    ?><p>Added description: ro-page-test.php</p><?php

}
```
