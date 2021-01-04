import app from 'flarum/app';
import RegRoleSettingsPage from './components/RegRoleSettingsPage';

app.initializers.add('ianm/regrole', (app) => {
  //app.extensionSettings['the-turk-regrole'] = () => app.modal.show(new RegRoleSettingsModal());
  app.extensionData.for('ianm-regrole').registerPage(RegRoleSettingsPage);
});
