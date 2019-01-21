# OctoberCMS Backend Skin

## Installation

- Clone into `aspendigital/backend`

- Update `/config/cms.php`:
```
'backendSkin' => 'AspenDigital\Backend\Skins\Admin',
```

## Development

Install dependencies:

```
cd skins/admin

npm install

```

Watch files and auto-compile:

```
npm run dev
```


## Build

```
npm run build
```

## Notes

`/src/less/_base.less` is a modified version of the default styles that ship with the OctoberCMS backend.
It has been edited to use LESS variables.

Will most likely conflict when the default admin skin is updated.

---

Copy the October CMS files needed for compilation

```

# Get container name. Example: c59a32954cdc_project-octobercms_octobercms_1
docker container ls

mkdir -p ./modules/backend/assets/vendor/jcrop/css && mkdir -p ./modules/system/assets/vendor/prettify && mkdir -p ./modules/backend/assets/js

docker cp <container_name>:/var/www/html/modules/backend/assets/vendor/jcrop/css/jquery.Jcrop.min.css ./modules/backend/assets/vendor/jcrop/css/jquery.Jcrop.min.css

docker cp <container_name>:/var/www/html/modules/backend/assets/js/october-min.js ./modules/backend/assets/js/october-min.js

docker cp <container_name>:/var/www/html/modules/system/assets/vendor/prettify/prettify.css ./modules/system/assets/vendor/prettify/prettify.css

docker cp <container_name>:/var/www/html/modules/system/assets/vendor/prettify/theme-desert.css ./modules/system/assets/vendor/prettify/theme-desert.css

docker cp <container_name>:/var/www/html/modules/system/assets/vendor/prettify/theme-desert.css ./modules/system/assets/vendor/prettify/theme-desert.css

```
