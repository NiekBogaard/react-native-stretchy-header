# react-native-stretchy-header

## Release 1.0.0

## Platforms

"react-native": 0.16.0

- [x] iOS
- [ ] Android

## Installation

```sh
$ npm install react-native-profile-component --save
```

## Usage

```js
...
var ProfileComponent = require('react-native-profile-component');

var avatar = require('...'),
    assets = {...},
    banner = require('...');
...
render() {
  return (
      <ProfileComponent
        avatar ={avatar}
        assets ={assets}
        banner ={banner}
      />
  );
}

```

## Props Documentation

- `avatar: React.PropTypes.number` : [not sure of the link type] {Require}Image
- `assets: React.PropTypes.object` : {{String}`key`:{{String}`label`, {Require}`icon`, {Require}`sence`}, ...}
- `banner: React.PropTypes.number` : [not sure of the link type] {Require}Image

## Third Party Library Used

- Lodash

## Licensing

- Going to be MIT
