<?php

/*
 * This file is part of Registration Roles.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\RegRole\Commands;

use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\Event\Saving;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;

class AttachRoleHandler
{
    use DispatchEventsTrait;

    /**
     * @param Dispatcher $events
     */
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }

    public function handle(AttachRole $command): User
    {
        $user = $command->actor;

        $user->raise(
            new Saving($user, $user, ['attributes' => ['regrole_role_ids' => $command->roleIds]])
        );

        $this->dispatchEventsFor($user, $user);

        return $user;
    }
}
