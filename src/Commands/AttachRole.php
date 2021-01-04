<?php

namespace IanM\RegRole\Commands;

use Flarum\User\User;

class AttachRole
{
    /**
     * @var User
     */
    public $actor;

    /**
     * @var array
     */
    public $roleIds;

    /**
     * @param User  $actor
     * @param array $roleIds
     */
    public function __construct(User $actor, array $roleIds)
    {
        $this->actor = $actor;
        $this->roleIds = $roleIds;
    }
}
