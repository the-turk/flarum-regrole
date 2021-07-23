/*
 * This file is part of Registration Roles.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { extend, override } from 'flarum/common/extend';

import app from 'flarum/admin/app';
import AdminPage from 'flarum/admin/components/AdminPage';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Group from 'flarum/common/models/Group';
import Stream from 'flarum/common/utils/Stream';
import Switch from 'flarum/common/components/Switch';

app.initializers.add('the-turk-regrole', (app) => {
  extend(ExtensionPage.prototype, 'sections', function (items) {
    if (this.extension.id !== 'the-turk-regrole') return;

    items.has('permissions') ? items.remove('permissions') : '';
  });

  extend(ExtensionPage.prototype, 'oninit', function () {
    if (this.extension.id !== 'the-turk-regrole') return;

    this.roleIds = Stream(JSON.parse(app.data.settings['the-turk-regrole.allowed_role_ids'] || '[]'))();
  });

  override(AdminPage.prototype, 'dirty', function (original) {
    if (!this.extension || this.extension.id !== 'the-turk-regrole') return original();

    const dirty = {};

    const roleIds = JSON.stringify(this.roleIds);

    if (roleIds !== app.data.settings['the-turk-regrole.allowed_role_ids']) {
      dirty['the-turk-regrole.allowed_role_ids'] = roleIds;
    }

    Object.keys(this.settings).forEach((key) => {
      const value = this.settings[key]();

      if (value !== app.data.settings[key]) {
        dirty[key] = value;
      }
    });

    return dirty;
  });

  app.extensionData
    .for('the-turk-regrole')
    .registerSetting(function () {
      // For some reason, `Group.MODERATOR_ID` is not available in the Group model.
      // @see https://github.com/flarum/core/blob/eb4b18a979c7406cbf154a107662652d282fe415/src/Group/Group.php#L50-L53
      const moderatorId = '4';

      return [
        <div className="Form-group">
          <label>{app.translator.trans('the-turk-regrole.admin.settings.allowed_roles_label')}</label>
          <div className="helpText">{app.translator.trans('the-turk-regrole.admin.settings.allowed_roles_text')}</div>
        </div>,
        <div className="RegRole-allowedRoles-container">
          {app.store
            .all('groups')
            .filter((group) => [Group.GUEST_ID, Group.MEMBER_ID, Group.ADMINISTRATOR_ID, moderatorId].indexOf(group.id()) === -1)
            .map((group) => (
              <div className="Form-group">
                {Switch.component(
                  {
                    state: this.roleIds.indexOf(group.id()) > -1,
                    onchange: (value) => {
                      if (value) {
                        // Add checked role into the list.
                        this.roleIds.push(group.id());
                      } else {
                        let index = this.roleIds.indexOf(group.id());

                        if (index > -1) {
                          // Remove unchecked role from the list.
                          this.roleIds.splice(index, 1);
                        }
                      }
                    },
                    className: group.isHidden() ? 'hiddenRole' : '',
                  },
                  group.nameSingular()
                )}
              </div>
            ))}
        </div>,
      ];
    })
    .registerSetting(function () {
      return <h3>{app.translator.trans('the-turk-regrole.admin.settings.other_options_heading')}</h3>;
    })
    .registerSetting({
      setting: 'the-turk-regrole.allow_multiple_roles',
      label: app.translator.trans('the-turk-regrole.admin.settings.allow_multiple_roles_label'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'the-turk-regrole.force_users',
      label: app.translator.trans('the-turk-regrole.admin.settings.force_users_label'),
      help: app.translator.trans('the-turk-regrole.admin.settings.force_users_text'),
      type: 'boolean',
    });
});
