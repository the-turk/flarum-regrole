<?php
namespace TheTurk\RegRole\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\Event\GroupsChanged;
use TheTurk\RegRole\Validators\RoleValidator;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\User;
use Flarum\User\Event\Saving as UserSaving;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Illuminate\Support\Arr;

class SetRoles
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
     * @param SettingsRepositoryInterface $settings
     * @param RoleValidator $validator
     */
    public function __construct(SettingsRepositoryInterface $settings, RoleValidator $validator)
    {
        $this->validator = $validator;

        // Roles those users allowed to assign themselves
        $this->safeRoles = json_decode($settings->get('the-turk-regrole.roleIds', '[]'), true);

        // Allow users to have multiple roles assigned
        $this->multipleRoles = (bool)$settings->get('the-turk-regrole.multipleRoles', false);

        // Force users to assign at least one role to themselves
        $this->forceUsers = (bool)$settings->get('the-turk-regrole.forceUsers', false);
    }

    /**
     * Subscribes to the Flarum events
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(UserSaving::class, [$this, 'whenSavingUser']);
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * @param UserSaving $event
     */
    public function whenSavingUser(UserSaving $event)
    {
        $user = $event->user;
        $roleIds = Arr::get($event->data, 'attributes.regRole');

        if (isset($roleIds) && is_array($roleIds)) {
            if ($this->forceUsers) {
                $this->validator->assertValid(['regRole' => $roleIds]);
            }

            $newRolesCount = count($roleIds);

            if ($newRolesCount > 0) {
              if (!$this->multipleRoles && $newRolesCount > 1) {
                  throw new PermissionDeniedException();
              }

              $newGroupIds = [];
              foreach ($roleIds as $id) {
                  if (!in_array($id, $this->safeRoles)) {
                      throw new PermissionDeniedException();
                  }

                  $newGroupIds[] = $id;
              }

              if ($user->id) {
                // it's an existing user
                $user->raise(
                    new GroupsChanged($user, $user->groups()->get()->all())
                );

                $user->groups()->attach($newGroupIds);
              } else {
                // we have a new user
                $user->afterSave(function (User $user) use ($newGroupIds) {
                    $user->groups()->attach($newGroupIds);
                });
              }
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
            $event->attributes['safeRoles'] = $this->safeRoles;
            $event->attributes['multipleRoles'] = $this->multipleRoles;
            $event->attributes['forceUsers'] = $this->forceUsers;
        }
    }
}
