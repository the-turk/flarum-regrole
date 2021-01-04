<?php

namespace IanM\RegRole\Commands;

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
