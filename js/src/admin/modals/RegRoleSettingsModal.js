import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Group from 'flarum/models/Group';
import Switch from 'flarum/components/Switch';

// just to make things easier
const settingsPrefix = 'the-turk-regrole.';
const localePrefix = settingsPrefix + 'admin.settings.';

export default class RegRoleSettingsModal extends SettingsModal {
  init() {
    super.init();

    this.roleIds = m.prop(
      JSON.parse(app.data.settings[settingsPrefix + 'roleIds']) || []
    )();
  }

  title() {
    return app.translator.trans(localePrefix + 'title');
  }

  /**
   * Build modal form.
   *
   * @returns {*}
   */
  form() {
    return [
      m('.Form-group', [
          m('label', app.translator.trans(localePrefix + 'roleIds')),
          m('.helpText', app.translator.trans(localePrefix + 'roleIdsHelp')),
          m('div', [
            app.store
              .all('groups')
              .filter((group) =>
                [
                  Group.GUEST_ID,
                  Group.MEMBER_ID,
                  Group.ADMINISTRATOR_ID
                ].indexOf(group.id()) === -1)
              .map((group) => (
                m('.Form-group', [
                  m('label', Switch.component({
                    state: this.roleIds.indexOf(group.id()) > -1,
                    children: group.nameSingular(),
                    onchange: value => {
                      if(value) {
                        // add new role id
                        this.roleIds.push(group.id());
                      } else {
                        let index = this.roleIds.indexOf(group.id());

                        if (index > -1) {
                          this.roleIds.splice(index, 1);
                        }
                      }
                    }
                  }))
                ])
              ))
          ])
      ]),
      m('.Form-group', [
        m('label', app.translator.trans(localePrefix + 'otherOptions')),
        m('.Form-group', [
          m('label', Switch.component({
            state: this.setting(settingsPrefix + 'multipleRoles', '0')() === '1',
            children: app.translator.trans(localePrefix + 'multipleRoles'),
            onchange: value => {
              this.setting(settingsPrefix + 'multipleRoles')(value ? '1' : '0');
            }
          }))
        ]),
        m('.Form-group', [
          m('label', Switch.component({
            state: this.setting(settingsPrefix + 'forceUsers', '0')() === '1',
            children: app.translator.trans(localePrefix + 'forceUsers'),
            onchange: value => {
              this.setting(settingsPrefix + 'forceUsers')(value ? '1' : '0');
            }
          }))
        ])
      ])
    ];
  }

  dirty() {
    const dirty = {};

    // holds allowed roles information
    const value_roleIds = JSON.stringify(this.roleIds);

    if (value_roleIds !== app.data.settings[settingsPrefix + 'roleIds']) {
      dirty[settingsPrefix + 'roleIds'] = value_roleIds;
    }

    // holds other options information
    Object.keys(this.settings).forEach((key) => {
      const value = this.settings[key]();

      if (value !== app.data.settings[key]) {
        dirty[key] = value;
      }
    });

    return dirty;
  }
}
