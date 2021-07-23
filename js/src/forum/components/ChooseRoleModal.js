/*
 * This file is part of Registration Roles.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Button from 'flarum/common/components/Button';
import GroupBadge from 'flarum/forum/components/GroupBadge';
import ItemList from 'flarum/common/utils/ItemList';
import Modal from 'flarum/common/components/Modal';
import Stream from 'flarum/common/utils/Stream';

/**
 * The `ChooseRoleModal` component displays a modal dialog with allowed roles.
 */
export default class ChooseRoleModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.regRoleIds = Stream([]);
  }

  className() {
    return 'Modal--small ChooseRoleModal';
  }

  title() {
    return app.translator.trans('the-turk-regrole.forum.choose_role_modal.choose_role_heading');
  }

  content() {
    return [
      <div className="Modal-body">
        <div className="Form Form--centered">{this.fields().toArray()}</div>
      </div>,
      <div className="Modal-footer">
        <p>{app.translator.trans('the-turk-regrole.forum.choose_role_modal.choose_role_text')}</p>
      </div>,
    ];
  }

  /**
   * This is a common function that builds the actual role list.
   * We're using this on both "Choose A Role" and "Sign Up" modals.
   */
  roleField() {
    return (
      <div className="Form-group regRole-group">
        {/* This label will be hidden on "Choose A Role" modal via CSS. */}
        <label className="regRole-label">{app.translator.trans('the-turk-regrole.forum.sign_up_modal.choose_role_heading')}</label>
        <div className="regRole-container">
          {app.forum.attribute('regrole.available_roles').map((group) => (
            <div className="regRole-item">
              <label>
                <div className="regRole-badge">
                  {GroupBadge.component({
                    icon: group.icon,
                    style: { backgroundColor: group.color },
                    label: null,
                    type: 'group--' + group.id,
                  })}
                </div>
                <input
                  type="checkbox"
                  className="regRole-input"
                  name="regRole[]"
                  onchange={(e) => {
                    const index = this.regRoleIds().indexOf(group.id);
                    const isChecked = e.target.checked;

                    if (!app.forum.attribute('regrole.allow_multiple_roles')) {
                      // User is allowed to choose only one of the roles.
                      this.regRoleIds(isChecked ? [group.id] : []);
                    } else {
                      // User is allowed choose multiple roles.
                      if (isChecked && index === -1) {
                        // Add checked role into the list.
                        this.regRoleIds().push(group.id);
                      } else if (!isChecked && index > -1) {
                        // Remove unchecked role from the list.
                        this.regRoleIds().splice(index, 1);
                      }
                    }
                  }}
                  // Prevent users from manipulating data while processing.
                  disabled={this.loading}
                />
                {group.name_singular}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  fields() {
    const items = new ItemList();

    items.add('registration-roles', this.roleField(), 10);

    items.add(
      'submit',
      <div className="Form-group">
        <Button className="Button Button--primary Button--block" type="submit" loading={this.loading}>
          {app.translator.trans('the-turk-regrole.forum.choose_role_modal.save_button')}
        </Button>
      </div>,
      -10
    );

    return items;
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    app
      .request({
        url: `${app.forum.attribute('apiUrl')}/regrole`,
        method: 'POST',
        body: { regrole_role_ids: this.regRoleIds() },
        errorHandler: this.onerror.bind(this),
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        this.loaded();
      });
  }
}
