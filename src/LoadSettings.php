<?php

/*
 * This file is part of Registration Roles.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\RegRole;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Group\Group;
use Flarum\Settings\SettingsRepositoryInterface;

class LoadSettings
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * Gets the settings variable. Called on Object creation.
     *
     * @param SettingsRepositoryInterface $settings All settings provided by the interface.
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * Get the setting values from the database and make them available in the forum.
     *
     * @return array
     */
    public function __invoke(ForumSerializer $serializer): array
    {
        $actor = $serializer->getActor();

        $allowedRoleIds = json_decode(
            $this->settings->get('the-turk-regrole.allowed_role_ids', '[]'),
            true
        );

        return [
            'regrole.allow_multiple_roles' => boolval($this->settings->get('the-turk-regrole.allow_multiple_roles', '0')),
            'regrole.force_users'          => boolval($this->settings->get('the-turk-regrole.force_users', '0')),
            'regrole.allowed_role_ids'     => $allowedRoleIds,
            'regrole.suspended_actor'      => $actor && $actor->suspended_until,
            'regrole.available_roles'      =>
                // We had to overcome visibility scopes due to `viewHiddenGroups` permission.
                // @see https://github.com/the-turk/flarum-regrole/issues/13
                Group::query()
                    ->select('id', 'icon', 'color', 'name_singular')
                    ->whereIn('id', $allowedRoleIds)
                    ->get(),
        ];
    }
}
