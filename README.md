# Todo

* [ ] Change font
* [ ] ?
* [ ] ?
* [ ] ?
* [ ] ?
* [ ] ?
* [ ] ?
* [ ] ?

# Info

* [UI kit](https://getuikit.com/v2/docs/icon.html)
* Backup location (/opt/bitnami/apps/wordpress/htdocs/wp-content/sedlex/backup-scheduler/1)

## Connect to instance

```bash
gcloud compute ssh wordpress-multisite-production-vm
cd /opt/bitnami/apps/wordpress/htdocs/wp-content/themes/ropaolle
git pull origin master
```

# Add Beans

```bash
# Setup
cd /opt/bitnami/apps/wordpress/htdocs/wp-content/themes
sudo chown daemon:ropaolle ropaolle/
cd ropaolle
git init
git remote add origin ssh://git@github.com/ropaolle/ropaolle.se.git
git remote -v

# Pull
gcloud compute ssh wordpress-multisite-production-vm
cd /opt/bitnami/apps/wordpress/htdocs/wp-content/themes/ropaolle
git pull origin master
```

## Connecting to GCP Instances

[Info](https://cloud.google.com/compute/docs/instances/connecting-to-instance#standardssh)

```bash
# Install
mkdir ~/gcloud && cd ~/gcloud
wget https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-189.0.0-linux-x86_64.tar.gz
tar -xvf google-cloud-sdk-189.0.0-linux-x86_64.tar.gz
./google-cloud-sdk/install.sh
gcloud components update

# Init
gcloud init

# Connect
gcloud compute ssh wordpress-multisite-production-vm
```
