import { Pipeline } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyLoader, LegacyUnit } from '@ephox/mcagar';

import StripnbspPlugin from 'tinymce/plugins/stripnbsp/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';

UnitTest.asynctest(
  'browser.tinymce.plugins.stripnbsp.StripnbspPluginTest',
  function () {
    const success = arguments[arguments.length - 2];
    const failure = arguments[arguments.length - 1];
    const suite = LegacyUnit.createSuite();

    ModernTheme();
    StripnbspPlugin();

    suite.test('Strip nbsp', function (editor) {
      const data = {
        '<p>A&nbsp;B</p>': '<p>A B</p>',
        '<p>A&nbsp;<span class="a">B</span></p>': '<p>A <span class="a">B</span></p>',
        '<p>A<span class="a">&nbsp;B</span></p>': '<p>A<span class="a"> B</span></p>',
        '<p>A<span class="a">B&nbsp;</span></p>': '<p>A<span class="a">B </span></p>',
        '<p>A<span class="a">B</span>&nbsp;</p>': '<p>A<span class="a">B</span> </p>'
      };

      Object.keys(data).forEach(function (before) {
        editor.setContent(before);

        LegacyUnit.equal(
          editor.getContent(),
          data[before]
        );
      });
    });

    suite.test('Keep nbsp', function (editor) {
      const data = [
        '<p>A&nbsp;&nbsp;B</p>',
        '<p>A &nbsp;B</p>',
        '<p>A&nbsp; B</p>',
        '<p>A</p>\n<p>&nbsp;</p>\n<p>B</p>',
        '<table>\n<tbody>\n<tr>\n<td>&nbsp;</td>\n</tr>\n</tbody>\n</table>'
      ];

      data.forEach(function (content) {
        editor.setContent(content);

        LegacyUnit.equal(
          editor.getContent(),
          content
        );
      });
    });

    suite.test('Force strip nbsp', function (editor) {
      editor.settings.stripnbsp_force = true;

      const data = {
        '<p>A&nbsp;&nbsp;B</p>': '<p>A  B</p>',
        '<p>A &nbsp;B</p>': '<p>A  B</p>',
        '<p>A&nbsp; B</p>': '<p>A  B</p>',
        '<p>A</p>\n<p>&nbsp;</p>\n<p>B</p>': '<p>A</p>\n<p> </p>\n<p>B</p>',
        '<table>\n<tbody>\n<tr>\n<td>&nbsp;</td>\n</tr>\n</tbody>\n</table>': '<table>\n<tbody>\n<tr>\n<td> </td>\n</tr>\n</tbody>\n</table>'
      };

      Object.keys(data).forEach(function (before) {
        editor.setContent(before);

        LegacyUnit.equal(
          editor.getContent(),
          data[before]
        );
      });
    });

    TinyLoader.setup(function (editor, onSuccess, onFailure) {
      Pipeline.async({}, suite.toSteps(editor), onSuccess, onFailure);
    }, {
      plugins: 'stripnbsp',
      skin_url: '/project/src/skins/lightgray/dist/lightgray'
    }, success, failure);
  }
);
