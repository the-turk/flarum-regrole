import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import GroupBadge from 'flarum/forum/components/GroupBadge';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';

/**
 * The `ChooseRoleModal` component displays a modal dialog with allowed roles.
 */
export default class ChooseRoleModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    const user = this.attrs.user;

    this.showing = false;

    this.regRole = Stream([]);

    this.username = Stream(user.username() || '');
  }

  isDismissible() {
    return false;
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.showing = true;
  }

  className() {
    return 'Modal--small ChooseRoleModal';
  }

  title() {
    return app.translator.trans('the-turk-regrole.forum.chooseRole');
  }

  content() {
    return [<div className="Modal-body">{this.body()}</div>, <div className="Modal-footer">{this.footer()}</div>];
  }

  body() {
    return [<div className="Form Form--centered">{this.fields().toArray()}</div>];
  }

  roleField() {
    return (
      <div className="Form-group">
        <div className="regRole-container">
          {app.store
            .all('groups')
            .filter((group) => app.forum.attribute('safeRoles').indexOf(group.id()) > -1)
            .map((group) => (
              <div className="regRole-item">
                <label>
                  <div className="regRole-badge">
                    {GroupBadge.component({
                      group,
                      className: 'Group-icon',
                      label: null,
                    })}
                  </div>
                  <input
                    type="checkbox"
                    className="regRole-input"
                    name="regRole[]"
                    onchange={(e) => {
                      const index = this.regRole().indexOf(group.id());
                      const checked = e.target.checked;

                      if (!app.forum.attribute('multipleRoles')) {
                        this.regRole(checked ? [group.id()] : []);
                      } else {
                        if (checked && index === -1) {
                          this.regRole().push(group.id());
                        } else if (!checked && index > -1) {
                          this.regRole().splice(index, 1);
                        }
                      }
                    }}
                    disabled={this.loading}
                  />
                  {group.nameSingular()}
                </label>
              </div>
            ))}
        </div>
      </div>
    );
  }

  fields() {
    const items = new ItemList();

    items.add('regroles', this.roleField(), 10);

    items.add(
      'submit',
      <div className="Form-group">
        <Button className="Button Button--primary Button--block" type="submit" loading={this.loading}>
          {app.translator.trans('the-turk-regrole.forum.save')}
        </Button>
      </div>,
      -10
    );

    return items;
  }

  footer() {
    return [<p>{app.translator.trans('the-turk-regrole.forum.chooseRoleHelp')}</p>];
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    app
      .request({
        url: `${app.forum.attribute('apiUrl')}/regrole`,
        method: 'POST',
        data: { regRoleIds: this.regRole() },
        errorHandler: this.onerror.bind(this),
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
