import app from 'flarum/app';
import RegRoleSettingsModal from "./modals/RegRoleSettingsModal";

app.initializers.add('the-turk/regrole', app => {
  app.extensionSettings['the-turk-regrole'] =
    () => app.modal.show(new RegRoleSettingsModal());
});
