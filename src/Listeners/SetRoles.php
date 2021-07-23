<?php

/*
 * This file is part of Registration Roles.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\RegRole\Listeners;

use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\GroupsChanged;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use TheTurk\RegRole\Validators\RoleValidator;

class SetRoles
{
    use DispatchEventsTrait;

    /**
     * @var RoleValidator
     */
    protected $validator;

    /**
     * @var array
     */
    private $allowedRoleIds;

    /**
     * @var bool
     */
    private $allowMultipleRoles;

    /**
     * @var bool
     */
    private $forceUsers;

    /**
     * @param Dispatcher                  $events
     * @param SettingsRepositoryInterface $settings
     * @param RoleValidator               $validator
     */
    public function __construct(Dispatcher $events, SettingsRepositoryInterface $settings, RoleValidator $validator)
    {
        $this->events = $events;
        $this->validator = $validator;

        // Roles those users allowed to assign themselves
        $this->allowedRoleIds = json_decode($settings->get('the-turk-regrole.allowed_role_ids', '[]'), true);

        // Allow users to have multiple roles assigned
        $this->allowMultipleRoles = boolval($settings->get('the-turk-regrole.allow_multiple_roles', false));

        // Force users to assign at least one role to themselves
        $this->forceUsers = boolval($settings->get('the-turk-regrole.force_users', false));
    }

    /**
     * @param UserSaving $event
     *
     * @throws PermissionDeniedException|ValidationException
     */
    public function handle(UserSaving $event)
    {
        $user = $event->user;
        $roleIds = Arr::get($event->data, 'attributes.regrole_role_ids');

        // We can't edit the user and will be blocked by the validator if we don't check this.
        if (isset($roleIds)) {
            if ($this->forceUsers) {
                $this->validator->assertValid(['regrole_role_ids' => $roleIds]);
            }

            // It is possible that we're not forcing them to have a role,
            // which makes this check necessary.
            if (is_array($roleIds)) {
                // The user trying to attach themselves multiple roles when they're not allowed to do so.
                if (!$this->allowMultipleRoles && count($roleIds) > 1) {
                    throw new PermissionDeniedException();
                }

                // Check if the user trying to attach themselves a disallowed role or trying to do something else.
                foreach ($roleIds as $id) {
                    if (!in_array($id, $this->allowedRoleIds)) {
                        throw new PermissionDeniedException();
                    }
                }

                if ($user->exists) {
                    // It's an existing user.
                    $user->raise(
                        new GroupsChanged($user, $user->groups()->get()->all())
                    );

                    $user->groups()->attach($roleIds);
                    $this->dispatchEventsFor($user, $user);
                } else {
                    // We have a new user here.
                    $user->afterSave(function (User $user) use ($roleIds) {
                        $user->groups()->attach($roleIds);
                    });
                }
            }
        }
    }
}
