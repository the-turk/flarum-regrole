import app from 'flarum/app';
import ExtensionPage from 'flarum/components/ExtensionPage';
import Group from 'flarum/models/Group';
import Switch from 'flarum/components/Switch';
import Stream from 'flarum/utils/Stream';

const settingsPrefix = 'the-turk-regrole.';
const localePrefix = settingsPrefix + 'admin.settings.';

export default class RegRoleSettingsModal extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);

    this.roleIds = Stream(JSON.parse(app.data.settings[settingsPrefix + 'roleIds'] || '[]'))();
  }

  content() {
    return [
      m('.RegRoleSettingsPage', [
        m('.container', [
          m('.Form-group', [
            m('label', app.translator.trans(localePrefix + 'roleIds')),
            m('.helpText', app.translator.trans(localePrefix + 'roleIdsHelp')),
            m('div', [
              app.store
                .all('groups')
                .filter((group) => [Group.GUEST_ID, Group.MEMBER_ID, Group.ADMINISTRATOR_ID].indexOf(group.id()) === -1)
                .map((group) =>
                  m('.Form-group', [
                    m(
                      'label',
                      Switch.component(
                        {
                          state: this.roleIds.indexOf(group.id()) > -1,
                          onchange: (value) => {
                            if (value) {
                              // add new role id
                              this.roleIds.push(group.id());
                            } else {
                              let index = this.roleIds.indexOf(group.id());

                              if (index > -1) {
                                this.roleIds.splice(index, 1);
                              }
                            }
                          },
                        },
                        group.nameSingular()
                      )
                    ),
                  ])
                ),
            ]),
          ]),
          m('.Form-group', [
            m('label', app.translator.trans(localePrefix + 'otherOptions')),
            m('.Form-group', [
              m(
                'label',
                Switch.component(
                  {
                    state: this.setting(settingsPrefix + 'multipleRoles', '0')() === '1',
                    onchange: (value) => {
                      this.setting(settingsPrefix + 'multipleRoles')(value ? '1' : '0');
                    },
                  },
                  app.translator.trans(localePrefix + 'multipleRoles')
                )
              ),
            ]),
            m('.Form-group', [
              m(
                'label',
                Switch.component(
                  {
                    state: this.setting(settingsPrefix + 'forceUsers', '0')() === '1',
                    onchange: (value) => {
                      this.setting(settingsPrefix + 'forceUsers')(value ? '1' : '0');
                    },
                  },
                  app.translator.trans(localePrefix + 'forceUsers')
                )
              ),
            ]),
          ]),
          this.submitButton(),
        ]),
      ]),
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
