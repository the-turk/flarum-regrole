<?php

/*
 * This file is part of the-turk/flarum-regrole.
 *
 * Copyright (c) 2021 Hasan Özbey
 * Copyright (c) 2021 IanM
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

namespace TheTurk\RegRole\Commands;

use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\Event\Saving;
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

    public function handle(AttachRole $command)
    {
        $user = $command->actor;
        $roleIds = $command->roleIds;

        $user->raise(
            new Saving($user, $user, ['attributes' => ['regRole' => $roleIds]])
        );

        $this->dispatchEventsFor($user, $user);

        return $user;
    }
}
