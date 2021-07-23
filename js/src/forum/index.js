/*
 * This file is part of Registration Roles.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extend } from 'flarum/common/extend';

import app from 'flarum/forum/app';
import Model from 'flarum/common/Model';
import Page from 'flarum/common/components/Page';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import Stream from 'flarum/common/utils/Stream';
import User from 'flarum/common/models/User';

import ChooseRoleModal from './components/ChooseRoleModal';

app.initializers.add('the-turk-regrole', () => {
  User.prototype.regRole_allGroups = Model.hasMany('regrole_all_groups');

  extend(Page.prototype, 'oninit', function () {
    // This will be used for delegated event handlers.
    const $body = $('body');

    if (app.forum.attribute('regrole.force_users')) {
      const user = app.session.user;

      // Okay `user.suspended_until()` is not working here and I can't figure out the reason tbh.
      // ToDo: Dig this situation, remove this attribute if possible.
      const isSuspended = app.forum.attribute('regrole.suspended_actor');

      // Show the modal if the existing user hasn't got any roles.
      // Do not show the modal if the user is suspended or have permission to edit groups.
      // @see https://github.com/the-turk/flarum-regrole/issues/12
      if (user && !isSuspended && user.canEditGroups() === false) {
        const allowedRoleIds = app.forum.attribute('regrole.allowed_role_ids');
        const usersGroups = user.regRole_allGroups(); // Gets user's roles regardless of the `viewHiddenGroups` permission.
        const hasRole = usersGroups.filter((group) => allowedRoleIds.indexOf(group.id()) > -1).length;

        if (!hasRole) {
          // Welcome user with the "Choose A Role" modal on every page init.
          // If we don't use the `setTimeout` trick here,
          // we'll end up with the `Nested m.redraw.sync()` call error.
          // @see https://github.com/the-turk/flarum-regrole/issues/10
          setTimeout(() => app.modal.show(ChooseRoleModal, { user }), 0);

          // Show an alert to the user to tell them their account
          // has suspended because of missing roles.
          // ToDO: These codes could improve.
          const alertClassName = 'RegRole-alert';

          if (!$('.' + alertClassName).length) {
            const alertContent = `
                <div class="Alert Alert--warning ${alertClassName}">
                  <span class="Alert-body">
                    ${app.translator.trans('the-turk-regrole.forum.suspended_temporarily_message')}
                  </span>
                  <ul class="Alert-controls">
                    <li>
                      <button class="Button Button--link">
                        <span class="Button-label">
                            ${app.translator.trans('the-turk-regrole.forum.choose_role_button_label')}
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              `;

            // `#app-navigation` is there for responsive view.
            $('#header, #app-navigation').append(alertContent);
            $body.on('click', '.' + alertClassName + ' button', () => app.modal.show(ChooseRoleModal, { user }));
          }
        }
      }
    }

    // Buttons are not working after an OAuth request. This is a workaround for the issue.
    // ToDO: Think about different ways to fix this.
    $body.on('click', '.SignUpModal .regRole-input, .ChooseRoleModal .regRole-input', function () {
      const $container = $(this).closest('.regRole-item');

      if (!$container.hasClass('active')) {
        $container.addClass('active');

        if (!app.forum.attribute('regrole.allow_multiple_roles')) {
          $container.siblings().removeClass('active');
          $container.siblings().find('input[type=checkbox]').prop('checked', false);
        }
      } else {
        $container.removeClass('active');
      }
    });
  });

  extend(SignUpModal.prototype, 'oninit', function () {
    this.regRoleIds = Stream([]);
  });

  extend(SignUpModal.prototype, 'fields', function (items) {
    items.add('registration-roles', ChooseRoleModal.prototype.roleField.bind(this)(), 9);
  });

  extend(SignUpModal.prototype, 'submitData', function (data) {
    data['regrole_role_ids'] = this.regRoleIds();
  });
});
