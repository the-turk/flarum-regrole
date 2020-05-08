import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Group from 'flarum/models/Group';
import GroupBadge from 'flarum/components/GroupBadge';
import SignUpModal from 'flarum/components/SignUpModal';
import Page from 'flarum/components/Page';

app.initializers.add('the-turk-regrole', () => {
	// extending Page to be sure that
	// buttons will work everytime - even after an OAuth request
	extend(Page.prototype, 'init', function () {
			const $body = $('body');

			$body.on('click', '.SignUpModal input[type=checkbox]', function () {
				let $container = $(this).closest('.regRole-item');
				if (!($container.hasClass('active'))) {
					$container.addClass('active');

					if (!(app.forum.attribute('regMultipleRoles'))) {
						$container.siblings().removeClass('active');
						$container.siblings().find('input[type=checkbox]').prop('checked', false);
					}
				} else {
					$container.removeClass('active');
				}
			});
  });

  extend(SignUpModal.prototype, 'init', function () {
      this.regRole = m.prop([]);
  });

  var onchecked = function (value, checked) {
    let index = this.regRole().indexOf(value);

    if (checked) {
      if (!(app.forum.attribute('regMultipleRoles'))) {
        this.regRole([value]);
      } else {
        if (index === -1) {
          this.regRole().push(value);
        }
      }
    } else {
      if (!(app.forum.attribute('regMultipleRoles'))) {
        this.regRole([]);
      } else {
        if (index > -1) {
          this.regRole().splice(index, 1);
        }
      }
    }
  }

  extend(SignUpModal.prototype, 'fields', function(items) {
    items.add(
      'regroles',
      <div className="Form-group">
        <div className="regRole-container">
          {app.store
            .all('groups')
            .filter((group) =>
              app.forum.attribute('regRoleIds')
              .indexOf(group.id()) > -1)
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
                    name="regRole[]"
                    onchange={m.withAttr('checked', onchecked.bind(this, group.id()))}
                    disabled={this.loading} />
                  {group.nameSingular()}
                </label>
              </div>
            ))}
          </div>
      </div>,
      9
    );
  });

  extend(SignUpModal.prototype, 'submitData', function (data) {
      data['regRole'] = this.regRole();
  });
});
