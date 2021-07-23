<?php

/*
 * This file is part of Registration Roles.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\RegRole\Commands;

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
