# ropaolle.se
Wordpress theme - Hemma hos ropaolle

# Add Beans
``` bash
# Setup
cd /opt/bitnami/apps/wordpress/htdocs/wp-content/themes
sudo chown daemon:ropaolle ropaolle/
cd ropaolle
git init
git remote add origin ssh://git@github.com/ropaolle/ropaolle.se.git
git remote -v

# Fetch
git pull origin master
```
