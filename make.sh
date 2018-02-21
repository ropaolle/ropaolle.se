# Make theme
path=~/Projects/ropaolle.se

if [ -z ${1+x} ]; then
    name=ropaolle;
else
    name=ropaolle-dev;
fi    

directory=$path/themes/$name

if [ ! -d "$directory" ]; then
  echo "Theme folder $directory do not exist!"
  exit 1
fi

# Add version to filename
ver=$(grep -Po 'Version: \K[^ ,]+' $path/themes/$name/style.css)
filename=$path/builds/$name-v$ver.zip

# Move to themes folder to make it the root folder of the zip.
cd $path/themes
zip -rq $filename $name

echo $filename created

