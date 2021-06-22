import app from 'flarum/admin/app';
import RegRoleSettingsPage from './components/RegRoleSettingsPage';

app.initializers.add('the-turk-regrole', (app) => {
  app.extensionData.for('the-turk-regrole').registerPage(RegRoleSettingsPage);
});
