# Egen Wordpress-server i Google Cloud Platform

* [ ] WordPress Multisite
  * ropaolle.se, wp.ropaolle.se
  * callell.se, www.callell.se
* [ ] Domain and subdomain
* [ ] Email skicka och ta emot
* [ ] SSH med certifikat från Let's Encrypt
* [ ] Backup av siter

## New server

[Deploying a GCP server](https://console.cloud.google.com/launcher/details/bitnami-launchpad/wordpress-multisite?q=wordpre&project=ropaolle-wordpress-multisite)

Site address: http://35.204.96.178/
Admin URL: http://35.204.96.178/wp-admin/
Instance: wordpress-multisite-production-vm
Instance zone: europe-west4-c
Instance machine type: g1-small

### Assign a static external IP address to your VM instance

[Gå till](https://console.cloud.google.com/networking/addresses/list?project=ropaolle-wordpress-multisite)

### Lägg till A-pekare i DNS

[Loopia](https://customerzone.loopia.se)
\*.ropaolle.se -> A: 35.204.96.178
@.ropaolle.se -> A: 35.204.96.178
wp.ropaolle.se -> A: 35.204.96.178

### Konfigurera in/utgående mail via Mailgun/Loopia

Pekare i Loopia, domänver i Mailgun...

### Konfigurera utgående email i Wordpress

[Login](http://35.204.96.178/wp-admin/)
Aktivera Plugins/WP Mail SMTP och gå till [settings](http://35.204.96.178.xip.io/wp-admin/options-general.php?page=wp-mail-smtp).

From Email: admin@ropaolle.se
From Name: www.ropaolle.se
Mailer: Mailgun
Mailgun API Key: https://app.mailgun.com/app/domains/ropaolle.se
Domain name: ropaolle.se

### Konfigurera wordpress Superuser

Admin user: user
Admin password: \*\*\*
Email: ropaolle@outlook.com

[Bitnami dokumentation](https://docs.bitnami.com/google/apps/wordpress-multisite/)

### Konfigurera domännamn och subdomän

```bash
cd /opt/bitnami/apps/wordpress
sudo ./bnconfig --machine_hostname ropaolle.se

# The bnconfig tool runs automatically every time the server starts to reset the machine hostname to its IP address. Obviously this is undesirable when using a custom domain name, so you must also execute the following command to disable the bnconfig tool for subsequent restarts.
sudo mv bnconfig bnconfig.disabled
```

### Använda flera domäner

* Aktivera och konfigurera WordPress MU Domain Mapping .
* Följande måste tillfälligt aktiveras igen `sudo mv bnconfig bnconfig.disabled`.

### Restart apache, php och mysql

```bash
sudo /opt/bitnami/ctlscript.sh restart
```

### Backup

```bash
mkdir ~/wp-backup
cd ~/wp-backup
sudo /opt/bitnami/ctlscript.sh stop
sudo tar -pczvf application-backup.tar.gz /opt/bitnami # ca 360 Mb
sudo /opt/bitnami/ctlscript.sh start
```

### Generate And Install A Let's Encrypt SSL Certificate For A Bitnami Application

(ref)[https://docs.bitnami.com/google/how-to/generate-install-lets-encrypt-ssl/]

#### Step 1: Install The Certbot Client

```bash
sudo mkdir /opt/bitnami/letsencrypt
cd /opt/bitnami/letsencrypt
sudo wget https://dl.eff.org/certbot-auto
sudo chmod a+x ./certbot-auto
sudo ./certbot-auto
```

#### Step 2: Generate A Let's Encrypt Certificate For Your Domain

```bash
# Stop server
sudo /opt/bitnami/ctlscript.sh stop

# Generate certs
cd /opt/bitnami/letsencrypt
sudo ./certbot-auto certonly --standalone -d ropaolle.se -d www.ropaolle.se -d wp.ropaolle.se #--test-cert
```

#### Step 3: Configure The Web Server To Use The Let's Encrypt Certificate

```bash
# Conf Apache to use new cert's
sudo mv /opt/bitnami/apache2/conf/server.crt /opt/bitnami/apache2/conf/server.crt.old
sudo mv /opt/bitnami/apache2/conf/server.key /opt/bitnami/apache2/conf/server.key.old
sudo mv /opt/bitnami/apache2/conf/server.csr /opt/bitnami/apache2/conf/server.csr.old
sudo ln -s /etc/letsencrypt/live/ropaolle.se/privkey.pem /opt/bitnami/apache2/conf/server.key
sudo ln -s /etc/letsencrypt/live/ropaolle.se/fullchain.pem /opt/bitnami/apache2/conf/server.crt
sudo chown root:root /opt/bitnami/apache2/conf/server*
sudo chmod 600 /opt/bitnami/apache2/conf/server*

# Start Apache
sudo /opt/bitnami/ctlscript.sh start
```

#### Step 4: Test The Configuration

https://ropaolle.se

#### Step 5: Renew The Let's Encrypt Certificate

```bash
cd /opt/bitnami/letsencrypt
sudo ./certbot-auto renew
sudo crontab -e
  24  0 * * * /opt/bitnami/letsencrypt/certbot-auto renew
  16 12 * * * /opt/bitnami/letsencrypt/certbot-auto renew
```

### How To Force HTTPS Redirection?

```bash
sudo nano /opt/bitnami/apps/wordpress/conf/httpd-prefix.conf
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^/(.*) https://%{SERVER_NAME}/$1 [R,L]
sudo /opt/bitnami/ctlscript.sh restart apache  
```

### How To Disable The WordPress Multisite Cron Script?
[Crontab troubleshoot](https://serverfault.com/questions/449651/why-is-my-crontab-not-working-and-how-can-i-troubleshoot-it)

```bash
# Stop wp cron
sudo nano /opt/bitnami/apps/wordpress/htdocs/wp-config.php
  define('DISABLE_WP_CRON', true);

# Add to system cron
sudo crontab -e # sudo crontab -u daemon -e # daemon blocked in /etc/cron.deny
 */15 * * * * wget -q -O - "https://ropaolle.se/wp-cron.php?t=`date +\%s`" > /dev/null 2>&1
 */30 * * * * wget -q -O - "https://wpdev.ropaolle.se/wp-cron.php?t=`date +\%s`" > /dev/null 2>&1
```

### Remove Bitnami info page

```bash
sudo /opt/bitnami/apps/wordpress/bnconfig.disabled --disable_banner 1
```

# Install Git

[Install](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-debian-8)
[How to use](https://www.digitalocean.com/community/tutorials/how-to-use-git-effectively)

```bash
# Install Git
sudo apt-get update
sudo apt-get install git-core
git config --global user.name "ropaolle"
git config --global user.email ropaolle@gmail.com
git config --list

# Creat ssh key
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C "ropaolle@gmail.com" # Add passphrase. retro1971
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa # retro1971
```

# Removed plugins

* All In One SEO Pack
* All-in-One WP Migration
* Google Analytics for WordPress by MonsterInsights
* Simple Tags
