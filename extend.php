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

namespace TheTurk\RegRole;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;
use TheTurk\RegRole\Api\Controllers\AttachRoleController;
use TheTurk\RegRole\Listeners\SetRoles;

return [
    (new Extend\Routes('api'))
        ->post('/regrole', 'regrole.attach', AttachRoleController::class),
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Locales(__DIR__ . '/locale')),

    function (Dispatcher $events) {
        $events->subscribe(SetRoles::class);
    }
];
