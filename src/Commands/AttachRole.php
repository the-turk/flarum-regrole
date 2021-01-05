<?php

/*
 * This file is part of ianm/flarum-regrole.
 *
 * Copyright (c) 2020 Hasan Özbey
 * Copyright (c) 2021 IanM
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

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
