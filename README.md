# OctoberCMS Backend Skin

## Installation

- Clone into `aspendigital/backend`

- Update `/config/cms.php`:
```
'backendSkin' => 'AspenDigital\Backend\Skins\Admin',
```


## Development

```
cd skins/admin
yarn
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
