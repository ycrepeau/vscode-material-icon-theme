import * as vscode from 'vscode';
import { activateIcons } from '../commands/activate';
import * as helpers from './../helpers';
import * as i18n from './../i18n';

/** Show the update message if the icon theme has been updated. */
export const showUpdateMessage = () => {
  // if the user does not want to see the update message
  if (helpers.getThemeConfig('showUpdateMessage').globalValue !== true) return;

  vscode.window
    .showInformationMessage(
      i18n.translate('themeUpdated'),
      helpers.isThemeNotVisible() ? i18n.translate('activate') : undefined,
      i18n.translate('readChangelog'),
      i18n.translate('neverShowAgain')
    )
    .then(handleUpdateMessageActions);
};

/** Handle the actions of the update message. */
const handleUpdateMessageActions = (value: string) => {
  switch (value) {
    case i18n.translate('activate'):
      activateIcons();
      break;

    case i18n.translate('readChangelog'):
      vscode.env.openExternal(
        vscode.Uri.parse(
          'https://marketplace.visualstudio.com/items/PKief.material-icon-theme/changelog'
        )
      );
      break;

    case i18n.translate('neverShowAgain'):
      disableUpdateMessage();
      break;

    default:
      break;
  }
};

/** Disable the update messages in the global settings */
const disableUpdateMessage = () => {
  helpers.setThemeConfig('showUpdateMessage', false, true);
};
