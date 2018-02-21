# Make themes
path=~/Projects/ropaolle.se

prod_name=ropaolle
dev_name=ropaolle-dev

# Add version to filename
prod_ver=$(grep -Po 'Version: \K[^ ,]+' $path/themes/$prod_name/style.css)
dev_ver=$(grep -Po 'Version: \K[^ ,]+' $path/themes/$dev_name/style.css)
prod_file=$path/builds/$prod_name-v$prod_ver.zip
dev_file=$path/builds/$dev_name-v$dev_ver.zip

# Move to themes folder to make it the root folder of the zip.
cd $path/themes
zip -rq $prod_file $prod_name
zip -rq $dev_file $dev_name

echo $prod_file created
echo $dev_file created
