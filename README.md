# Registration Roles

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/imorland/flarum-regrole/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/ianm/flarum-regrole.svg)](https://packagist.org/packages/ianm/flarum-regrole) [![Total Downloads](https://img.shields.io/packagist/dt/ianm/flarum-regrole.svg)](https://packagist.org/packages/ianm/flarum-regrole)

## This is a temporary maintained fork

> I have [volunteered](https://discuss.flarum.org/d/22779-diff-for-flarum/136) to maintain this extension whilst [Kylo / the-turk is away](https://discuss.flarum.org/d/22779-diff-for-flarum/132). My hope is that this fork can be re-integrated in due course.

> ~ IanM - January 2021

Allow users to assign roles to themselves during registration. You can also force existing users.

![Registration Roles](https://i.ibb.co/KhFp3hQ/reg-Role-Sign-Up-Modal.png)

[Settings Screenshot](https://i.ibb.co/Nx0wZk5/reg-Role-Settings.png)

## Installation

```bash
composer require ianm/flarum-regrole
```

## Updating

```bash
composer update ianm/flarum-regrole
php flarum cache:clear
```

## Usage

Enable the extension and set allowed roles from the extension's settings modal. Also enable the "Force users to assign at least one role to themselves" option to force guests as well as existing users (admins will be excluded) to have at least one of these allowed roles.

**! Attention:** I've tested this extension as much as I can. However, any malfunction of this extension may cause fatal errors during registration and your users might be unable to use your forum. So please test it yourself (register to your forum and login as existing user if you're forcing them to choose a role) after installation to see if everything is working fine for everyone.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/24500-registration-roles)
- [Source code on GitHub](https://github.com/imorland/flarum-regrole)
- [Changelog](https://github.com/imorland/flarum-regrole/blob/master/CHANGELOG.md)
- [Report an issue](https://github.com/imorland/flarum-regrole/issues)
- [Download via Packagist](https://packagist.org/packages/ianm/flarum-regrole)
