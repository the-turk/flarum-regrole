<?php

/*
 * This file is part of Registration Roles.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\RegRole;

use Flarum\Group\Group;
use Flarum\Group\Permission;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;

class RevokeAccessFromUsers
{
    /**
     * @var array
     */
    private $allowedRoleIds;

    /**
     * @var bool
     */
    private $forceUsers;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        // Roles those users allowed to assign themselves
        $this->allowedRoleIds = json_decode($settings->get('the-turk-regrole.allowed_role_ids', '[]'), true);

        // Force users to assign at least one role to themselves
        $this->forceUsers = boolval($settings->get('the-turk-regrole.force_users', false));
    }

    /**
     * @param User $user
     * @param array $groupIds
     * @return array
     */
    public function __invoke(User $user, array $groupIds): array
    {
        if (!$user->isGuest()) {
            $userGroups = $user->groups;
            $allPermissions = Permission::whereIn('group_id', $userGroups->pluck('id')->all())->pluck('permission')->all();
            $canEditGroups = in_array('user.editGroups', $allPermissions);

            // Suspend users those haven't got any roles but forced to have one by this extension.
            // Skip the users which have ability to edit groups.
            if ($this->forceUsers && !$canEditGroups) {
                $hasRole = false;

                foreach ($this->allowedRoleIds as $roleId) {
                    if ($userGroups->contains('id', $roleId)) {
                        $hasRole = true;
                        break;
                    }
                }

                if ($hasRole === false) {
                    return [Group::GUEST_ID];
                }
            }
        }

        return $groupIds;
    }
}
