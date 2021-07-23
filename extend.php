<?php

/*
 * This file is part of Registration Roles.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\RegRole;

use Flarum\Api\Controller\ShowUserController;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\GroupSerializer;
use Flarum\Extend;
use Flarum\Group\Group;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\User;
use TheTurk\RegRole\Api\Controllers\AttachRoleController;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Locales(__DIR__.'/locale')),

    (new Extend\Routes('api'))
        ->post('/regrole', 'regrole.attach', AttachRoleController::class),

    (new Extend\Event())
        ->listen(UserSaving::class, Listeners\SetRoles::class),

    (new Extend\User())
        ->permissionGroups(RevokeAccessFromUsers::class),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(LoadSettings::class),

    (new Extend\ApiSerializer(BasicUserSerializer::class))
        ->hasMany('regrole_all_groups', GroupSerializer::class),

    (new Extend\Model(User::class))
        ->belongsToMany('regrole_all_groups', Group::class),

    (new Extend\ApiController(ShowUserController::class))
        ->addInclude('regrole_all_groups'),
];
