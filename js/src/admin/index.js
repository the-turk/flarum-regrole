import app from 'flarum/admin/app';
import RegRoleSettingsPage from './components/RegRoleSettingsPage';

app.initializers.add('ianm/regrole', (app) => {
  app.extensionData.for('ianm-regrole').registerPage(RegRoleSettingsPage);
});
