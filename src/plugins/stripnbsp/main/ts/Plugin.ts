/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import PluginManager from 'tinymce/core/api/PluginManager';
import { Editor } from 'tinymce/core/api/Editor';

PluginManager.add('stripnbsp', function (editor: Editor) {
  editor.on('PostProcess', function (e) {
    if (!e.content) {
      return;
    }

    if (editor.getParam('stripnbsp_force')) {
      e.content = e.content.replace(/&nbsp;/gi, ' ');
    } else {
      e.content = e.content.replace(
        /<([a-z0-9-]+)[^>]*>&nbsp;<\/\1>|(?:\s*&nbsp;){2,}|(?:[^>]\s)?&nbsp;(?:\s[^<])?/gi,
        function (match, tagName) {
          if (tagName) {
            return match;
          }

          if (match !== '&nbsp;') {
            return match;
          }

          return ' ';
        }
      );
    }
  });
});

export default function () { }
