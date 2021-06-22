import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Group from 'flarum/common/models/Group';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import ChooseRoleModal from './components/ChooseRoleModal';
import Page from 'flarum/common/components/Page';
import Stream from 'flarum/common/utils/Stream';

app.initializers.add('the-turk-regrole', () => {
  extend(Page.prototype, 'oninit', function () {
    if (app.forum.attribute('forceUsers')) {
      const user = app.session.user;

      if (user) {
        const isAdmin = user.groups().filter((group) => [Group.ADMINISTRATOR_ID].indexOf(group.id()) > -1).length;

        if (!isAdmin) {
          const hasRole = user.groups().filter((group) => app.forum.attribute('safeRoles').indexOf(group.id()) > -1).length;

          if (!hasRole) setTimeout(() => app.modal.show(ChooseRoleModal, { user }), 0);
        }
      }
    }

    const $body = $('body');

    // buttons must work after an OAuth request
    $body.on('click', '.SignUpModal .regRole-input, .ChooseRoleModal .regRole-input', function () {
      const $container = $(this).closest('.regRole-item');

      if (!$container.hasClass('active')) {
        $container.addClass('active');

        if (!app.forum.attribute('multipleRoles')) {
          $container.siblings().removeClass('active');
          $container.siblings().find('input[type=checkbox]').prop('checked', false);
        }
      } else {
        $container.removeClass('active');
      }
    });
  });

  extend(SignUpModal.prototype, 'oninit', function () {
    this.regRole = Stream([]);
  });

  extend(SignUpModal.prototype, 'fields', function (items) {
    items.add('regroles', ChooseRoleModal.prototype.roleField.bind(this)(), 9);
  });

  extend(SignUpModal.prototype, 'submitData', function (data) {
    data['regRole'] = this.regRole();
  });
});
