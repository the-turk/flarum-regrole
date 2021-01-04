<?php

/**
 * Registration Roles Extension for Flarum.
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 *
 * @package    the-turk/flarum-regrole
 * @author     Hasan Özbey <hasanoozbey@gmail.com>
 * @copyright  2020
 * @version    Release: 1.0.0
 * @link       https://github.com/the-turk/flarum-regrole
 */

namespace IanM\RegRole;

use Flarum\Extend;
use Flarum\User\Event\Saving as UserSaving;
use IanM\RegRole\Api\Controllers\AttachRoleController;

return [
    (new Extend\Routes('api'))
        ->post('/regrole', 'regrole.attach', AttachRoleController::class),
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Event())
        ->listen(UserSaving::class, Listeners\SetRoles::class),

    (new Extend\Settings())
        ->serializeToForum('safeRoles', 'the-turk-regrole.roleIds', function ($value) {
            if (null === $value) {
                return [];
            }
            return json_decode($value, true);
        })
        ->serializeToForum('multipleRoles', 'the-turk-regrole.multipleRoles', function ($value) {
            return (bool) $value;
        })
        ->serializeToForum('forceUsers', 'the-turk-regrole.forceUsers', function ($value) {
            return (bool) $value;
        }),
];
