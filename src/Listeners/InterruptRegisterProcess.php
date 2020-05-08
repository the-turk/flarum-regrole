<?php
namespace TheTurk\RegRole\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\PermissionDeniedException;
use TheTurk\RegRole\Validators\RoleValidator;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\User\Event\Registered;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Illuminate\Support\Arr;
use Flarum\Group\Group;

class InterruptRegisterProcess
{
    /**
     * @var Settings
     */
    protected $settings;

    /**
     * @var RoleValidator
     */
    protected $validator;

    /**
     * Roles that users want to assign themselves
     * @var array $formIds
     */
    private static $formIds = [];

    /**
     * @param SettingsRepositoryInterface $settings
     * @param RoleValidator $settings
     */
    public function __construct(
        SettingsRepositoryInterface $settings,
        RoleValidator $validator
    ) {
        $this->validator = $validator;

        // Roles that users allowed to assign themselves
        $this->roleIds =
            json_decode(
                $settings->get(
                    'the-turk-regrole.roleIds',
                    []
                ),
                true
            )
        ;

        // Allow users to have multiple roles assigned
        $this->multipleRoles = (bool)
          $settings->get(
              'the-turk-regrole.multipleRoles',
              false
          )
        ;

        // Force users to assign at least one role to themselves
        $this->forceUsers = (bool)
          $settings->get(
              'the-turk-regrole.forceUsers',
              false
          )
        ;
    }

    /**
     * Subscribes to the Flarum events
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(UserSaving::class, [$this, 'whenSavingUser']);
        $events->listen(Registered::class, [$this, 'registeredUser']);
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * @param UserSaving $event
     */
    public function whenSavingUser(UserSaving $event)
    {
        $data = $event->data;

        if (Arr::has($data, 'attributes.regRole')) {
            self::$formIds = Arr::get($data, 'attributes.regRole');

            if ($this->forceUsers) {
                $this->validator->assertValid(['regRole' => self::$formIds]);
            }
        }
    }

    /**
     * @param Registered $event
     */
    public function registeredUser(Registered $event)
    {
        if (!empty(self::$formIds)) {
            if (!$this->multipleRoles && count(self::$formIds) > 1) {
                throw new PermissionDeniedException();
            }

            foreach (self::$formIds as $roleId) {
                if (!in_array($roleId, $this->roleIds)) {
                    throw new PermissionDeniedException();
                }

                $role = Group::findOrFail((int)$roleId);
                $event->user->groups()->attach($role);
            }
        }
    }

    /**
     * Get settings from the database
     * and make them available in the forum
     *
     * @param Serializing $event
     */
    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['regRoleIds'] = $this->roleIds;
            $event->attributes['regMultipleRoles'] = $this->multipleRoles;
            $event->attributes['regForceUsersToHaveRoles'] = $this->multipleRoles;
        }
    }
}
