// ========================== KeySnail Init File =========================== //

// You can preserve your code in this area when generating the init file using GUI.
// Put all your code except special key, set*key, hook, blacklist.
// ========================================================================= //
//{{%PRESERVE%
// Put your codes here

plugins.options["twitter_client.keymap"] = {
  "C-z"   : "prompt-toggle-edit-mode",
  "SPC"   : "prompt-next-page",
  "b"     : "prompt-previous-page",
  "j"     : "prompt-next-completion",
  "k"     : "prompt-previous-completion",
  "g"     : "prompt-beginning-of-candidates",
  "G"     : "prompt-end-of-candidates",
  "q"     : "prompt-cancel",
  // twitter client specific actions
  "r"     : "reply",
  "R"     : "official-retweet",
  "f"     : "add-to-favorite",
  "v"     : "display-entire-message",
  "V"     : "view-in-twitter",
  "c"     : "copy-tweet",
  "s"     : "show-target-status",
  "@"     : "show-mentions",
  "/"     : "search-word",
  "o"     : "open-url"
};

plugins.options["hok.hint_base_style"] = {
  position        : 'absolute',
  zIndex          : '2147483647',
  color           : '#000',
  fontSize        : '12px',
  fontFamily      : 'sans',
  fontWeight      : 'bold',
  lineHeight      : '12px',
  padding         : '3px',
  margin          : '0px',
  textTransform   : 'uppercase'
};

plugins.options["hok.hint_color_link"]    = 'rgba(0, 255, 0, 1)';
plugins.options["hok.hint_color_form"]    = 'rgba(157, 82, 255, 1)';
plugins.options["hok.hint_color_focused"] = 'rgba(255, 0, 255, 1)';
plugins.options["hok.hint_color_candidates"] = 'rgba(255, 100, 255, 1)';

key.setGlobalKey('C-,', function (ev, arg) {
  ext.exec("hok-start-foreground-mode", arg, ev);
}, 'Start Hit a Hint foreground mode', true);

key.setGlobalKey('M-,', function (ev, arg) {
  ext.exec("hok-start-continuous-mode", arg, ev);
}, 'Start Hit a Hint foreground mode', true);


key.setGlobalKey(['C-c', 'C-,'], function (ev, arg) {
  ext.exec("hok-start-extended-mode", arg, ev);
}, 'HOK extended awesome!', true);

key.setGlobalKey(["C-c", "C-t"],
                 function (ev, arg) {
                   ext.exec("twitter-client-display-timeline", arg);
                 }, "Display your timeline", true);

key.setGlobalKey(["C-c", "C-@"],
                 function (ev, arg) {
                   ext.exec("twitter-client-show-mentions", arg);
                 }, "Display your timeline", true);

key.setGlobalKey(["C-c", "C-T"],
                 function (ev, arg) {
                   ext.exec("twitter-client-tweet-this-page", arg);
                 }, "Tweet with the title and URL of this page", true);

key.setGlobalKey(["C-x", "b"],
                 function (ev, arg) {
                   ext.exec("tanything", arg);
                 }, "Tanyting buffer switching", true);

hook.setHook('KeyBoardQuit', function (ev) {
  util.rangeInterrupted = true;
  if (key.currentKeySequence.length)
    return;
  command.closeFindBar();

  var marked = command.marked(ev);

  if (util.isCaretEnabled())
  {
    if (marked)
      command.resetMark(ev);
    else
    {
      if ("blur" in ev.target)
        ev.target.blur();
      gBrowser.focus();
      _content.focus();
    }
  }
  else
  {
    goDoCommand("cmd_selectNone");
  }

  if (KeySnail.windowType === "navigator:browser" && !marked)
  {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
    prompt.finish(true);
  }
});

// manage closed tabs
ext.add("list-closed-tabs", function () {
  const fav = "chrome://mozapps/skin/places/defaultFavicon.png";
  var ss = Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);
  var json = Cc["@mozilla.org/dom/json;1"].createInstance(Ci.nsIJSON);
  var closedTabs = [[tab.image || fav, tab.title] for each (tab in json.decode(ss.getClosedTabData(window)))];

  if (!closedTabs.length)
    return void display.echoStatusBar("there are no closed tabs.", 2000);

  prompt.selector(
    {
      message : "select tab to undo:",
      collection : closedTabs,
      flags : [ICON | IGNORE, 0],
      callback : function (i) { if (i >= 0) window.undoCloseTab(i); }
    });
}, "List closed tabs");

// increment / decrement url number
key.setViewKey('>', function (ev, arg) {
  let pattern = /(.*?)([0]*)([0-9]+)([^0-9]*)$/;
  let url = content.location.href;
  let digit = url.match(pattern);

  if (digit[1] && digit[3])
  {
    let len = digit[3].length;
    let next = +digit[3] + (arg ? arg : 1);
    content.location.href = digit[1] + (digit[2] ||"").slice(next.toString().length - len) + next + (digit[4] ||"");
  }
}, 'Increment last digit in the URL');

key.setViewKey('<', function (ev, arg) {
  let pattern = /(.*?)([0]*)([0-9]+)([^0-9]*)$/;
  let url = content.location.href;
  let digit = url.match(pattern);

  if (digit[1] && digit[3])
  {
    let len = digit[3].length;
    let next = +digit[3] - (arg ? arg : 1);
    content.location.href = digit[1] + (digit[2] ||"").slice(next.toString().length - len) + next + (digit[4] ||"");
  }
}, 'Decrement last digit in the URL');

// // stop searching by hit Enter on search box
// if(gFindBar != undefined){
//   gFindBar.getElement("findbar-textbox").addEventListener("keypress", emacslike_search, false);
// }
// function emacslike_search(ev){
//   // if(ev.ctrlKey && ev.charCode == 115){ // C-s
//   //     gFindBar.onFindAgainCommand(false);
//   // }
//   if(ev.keyCode == 13 && gFindBar != undefined){ // Enter
//     gFindBar.onFindAgainCommand(true);
//     gFindBar.close();
//   }
//  //TODO: save searching start point and back to it when searching is finished with C-g
// }

//}}%PRESERVE%
// ========================================================================= //

// ========================= Special key settings ========================== //

key.quitKey              = "C-g";
key.helpKey              = "<f1>";
key.escapeKey            = "C-q";
key.macroStartKey        = "<f3>";
key.macroEndKey          = "<f4>";
key.universalArgumentKey = "C-u";
key.negativeArgument1Key = "C--";
key.negativeArgument2Key = "C-M--";
key.negativeArgument3Key = "M--";
key.suspendKey           = "C-M-<f2>";

// ================================= Hooks ================================= //


// ============================= Key bindings ============================== //

key.setViewKey('C-i', function (ev, arg) {
  util.setBoolPref("accessibility.browsewithcaret", true);
  display.prettyPrint("caret mode enabled.", {timeout: 500, fade: 200});
}, 'Enter to caret mode', true);

key.setCaretKey('C-i', function (ev, arg) {
  util.setBoolPref("accessibility.browsewithcaret", false);
  display.prettyPrint("caret mode disabled.", {timeout: 500, fade: 200});
}, 'Leave from caret mode', true);

key.setGlobalKey('C-M-r', function () {
  userscript.reload();
}, 'Reload the initialization file', true);

key.setGlobalKey('M-x', function (ev, arg) {
  ext.select(arg, ev);
}, 'List exts and execute selected one', true);

key.setGlobalKey('M-:', function () {
  command.interpreter();
}, 'Command interpreter', true);

key.setGlobalKey(['<f1>', 'b'], function () {
  key.listKeyBindings();
}, 'List all keybindings');

key.setGlobalKey(['<f1>', 'F'], function (ev) {
  openHelpLink("firefox-help");
}, 'Display Firefox help');

key.setGlobalKey('C-m', function (ev) {
  key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_RETURN, true);
}, 'Generate the return key code');

key.setGlobalKey(['C-x', 'l'], function () {
  command.focusToById("urlbar");
}, 'Focus to the location bar', true);

key.setGlobalKey(['C-x', 'g'], function () {
  command.focusToById("searchbar");
}, 'Focus to the search bar', true);

key.setGlobalKey(['C-x', 't'], function () {
  command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setGlobalKey(['C-x', 's'], function () {
  command.focusElement(command.elementsRetrieverButton, 0);
}, 'Focus to the first button', true);

key.setGlobalKey(['C-x', 'k'], function (ev) {
  BrowserCloseTabOrWindow();
}, 'Close tab / window');

key.setGlobalKey('C-W', function (ev) {
  BrowserCloseTabOrWindow();
}, 'Close tab / window');

// key.setGlobalKey(['C-x', 'K'], function () {
//     closeWindow(true);
// }, 'Close the window');

key.setGlobalKey(['C-x', 'n'], function (ev) {
  OpenBrowserWindow();
}, 'Open new window');

key.setGlobalKey(['C-x', 'C-c'], function (ev) {
  goQuitApplication();
}, 'Exit Firefox', true);

key.setGlobalKey(['C-x', 'o'], function (ev, arg) {
  command.focusOtherFrame(arg);
}, 'Select next frame');

key.setGlobalKey(['C-x', '1'], function (ev) {
  window.loadURI(ev.target.ownerDocument.location.href);
}, 'Show current frame only', true);

key.setGlobalKey(['C-x', 'C-f'], function () {
  BrowserOpenFileWindow();
}, 'Open the local file', true);

key.setGlobalKey(['C-x', 'C-s'], function () {
  saveDocument(window.content.document);
}, 'Save current page to the file', true);

key.setGlobalKey('M-w', function (ev) {
  command.copyRegion(ev);
}, 'Copy selected text', true);

key.setGlobalKey('C-s', function (ev) {
  command.iSearchForwardKs(ev);
}, 'Emacs like incremental search forward', true);

key.setGlobalKey('C-r', function (ev) {
  command.iSearchBackwardKs(ev);
}, 'Emacs like incremental search backward', true);

key.setGlobalKey(['C-c', 'u'], function (ev) {
  undoCloseTab();
}, 'Undo closed tab');

key.setGlobalKey(['C-c', 'C-c', 'C-v'], function () {
  toJavaScriptConsole();
}, 'Display JavaScript console', true);

key.setGlobalKey(['C-c', 'C-c', 'C-c'], function () {
  command.clearConsole();
}, 'Clear Javascript console', true);

key.setGlobalKey('C-M-l', function () {
  getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'Select next tab');

key.setGlobalKey('C-M-h', function () {
  getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'Select previous tab');


key.setGlobalKey('C-M-g', function (ev, arg) {
  window.location = 'http://gmail.com'
}, 'Jump to Gmail', true);

key.setViewKey([['C-n'], ['j']], function (ev) {
  key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_DOWN, true);
}, 'Scroll line down');

key.setViewKey([['C-p'], ['k']], function (ev) {
  key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_UP, true);
}, 'Scroll line up');

key.setViewKey([['C-f'], ['.']], function (ev) {
  key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_LEFT, true);
}, 'Scroll left');

key.setViewKey([['C-b'], [',']], function (ev) {
  key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_RIGHT, true);
}, 'Scroll right');

key.setViewKey([['M-v'], ['b']], function () {
  goDoCommand("cmd_scrollPageUp");
}, 'Scroll page up');

key.setGlobalKey('C-v', function () {
  goDoCommand("cmd_scrollPageDown");
}, 'Scroll page down');

key.setViewKey([['M-<'], ['g']], function () {
  goDoCommand("cmd_scrollTop");
}, 'Scroll to the top of the page', true);

key.setViewKey([['M->'], ['G']], function () {
  goDoCommand("cmd_scrollBottom");
}, 'Scroll to the bottom of the page', true);

key.setViewKey('l', function () {
  getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'Select next tab');

key.setViewKey('h', function () {
  getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'Select previous tab');

key.setViewKey(':', function (ev, arg) {
  shell.input(null, arg);
}, 'List and execute commands', true);

key.setViewKey('R', function () {
  BrowserReload();
}, 'Reload the page', true);

key.setGlobalKey('C-B', function () {
  BrowserBack();
}, 'Back');

key.setGlobalKey('C-F', function () {
  BrowserForward();
}, 'Forward');

key.setViewKey(['C-x', 'h'], function () {
  goDoCommand("cmd_selectAll");
}, 'Select all', true);

key.setViewKey('f', function () {
  command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setViewKey('M-p', function () {
  command.walkInputElement(command.elementsRetrieverButton, true, true);
}, 'Focus to the next button');

key.setViewKey('M-n', function () {
  command.walkInputElement(command.elementsRetrieverButton, false, true);
}, 'Focus to the previous button');

key.setEditKey(['C-x', 'h'], function (ev) {
  command.selectAll(ev);
}, 'Select whole text', true);

key.setEditKey([['C-x', 'u'], ['C-/']], function () {
  display.echoStatusBar("Undo!", 2000);
  goDoCommand("cmd_undo");
}, 'Undo');

key.setEditKey(['C-x', 'r', 'd'], function (ev, arg) {
  command.replaceRectangle(ev.originalTarget, "", false, !arg);
}, 'Delete text in the region-rectangle', true);

key.setEditKey(['C-x', 'r', 't'], function (ev) {
  prompt.read("String rectangle: ", function (aStr, aInput) {command.replaceRectangle(aInput, aStr);}, ev.originalTarget);
}, 'Replace text in the region-rectangle with user inputted string', true);

key.setEditKey(['C-x', 'r', 'o'], function (ev) {
  command.openRectangle(ev.originalTarget);
}, 'Blank out the region-rectangle, shifting text right', true);

key.setEditKey(['C-x', 'r', 'k'], function (ev, arg) {
  command.kill.buffer = command.killRectangle(ev.originalTarget, !arg);
}, 'Delete the region-rectangle and save it as the last killed one', true);

key.setEditKey(['C-x', 'r', 'y'], function (ev) {
  command.yankRectangle(ev.originalTarget, command.kill.buffer);
}, 'Yank the last killed rectangle with upper left corner at point', true);

key.setEditKey([['C-SPC'], ['C-@']], function (ev) {
  command.setMark(ev);
}, 'Set the mark', true);

key.setEditKey('C-o', function (ev) {
  command.openLine(ev);
}, 'Open line');

key.setEditKey('C-\\', function () {
  display.echoStatusBar("Redo!", 2000);
  goDoCommand("cmd_redo");
}, 'Redo');

key.setEditKey('C-a', function (ev) {
  command.beginLine(ev);
}, 'Beginning of the line');

key.setEditKey('C-e', function (ev) {
  command.endLine(ev);
}, 'End of the line');

key.setEditKey('C-f', function (ev) {
  command.nextChar(ev);
}, 'Forward char');

key.setEditKey('C-b', function (ev) {
  command.previousChar(ev);
}, 'Backward char');

key.setEditKey('M-f', function (ev) {
  command.forwardWord(ev);
}, 'Next word');

key.setEditKey('M-b', function (ev) {
  command.backwardWord(ev);
}, 'Previous word');

key.setEditKey('C-n', function (ev) {
  command.nextLine(ev);
}, 'Next line');

key.setEditKey('C-p', function (ev) {
  command.previousLine(ev);
}, 'Previous line');

key.setEditKey('C-v', function (ev) {
  command.pageDown(ev);
}, 'Page down');

key.setEditKey('M-v', function (ev) {
  command.pageUp(ev);
}, 'Page up');

key.setEditKey('M-<', function (ev) {
  command.moveTop(ev);
}, 'Beginning of the text area');

key.setEditKey('M->', function (ev) {
  command.moveBottom(ev);
}, 'End of the text area');

key.setEditKey('C-d', function () {
  goDoCommand("cmd_deleteCharForward");
}, 'Delete forward char');

key.setEditKey('C-h', function () {
  goDoCommand("cmd_deleteCharBackward");
}, 'Delete backward char');

key.setEditKey('M-d', function () {
  goDoCommand("cmd_deleteWordForward")
}, 'Delete forward word');

key.setEditKey([['C-<backspace>'], ['M-<backspace>']], function (ev) {
  command.deleteBackwardWord(ev);
}, 'Delete backward word');

key.setEditKey('M-u', function (ev, arg) {
  command.wordCommand(ev, arg, command.upcaseForwardWord, command.upcaseBackwardWord);
}, 'Convert following word to upper case');

key.setEditKey('M-l', function (ev, arg) {
  command.wordCommand(ev, arg, command.downcaseForwardWord, command.downcaseBackwardWord);
}, 'Convert following word to lower case');

key.setEditKey('M-c', function (ev, arg) {
  command.wordCommand(ev, arg, command.capitalizeForwardWord, command.capitalizeBackwardWord);
}, 'Capitalize the following word');

key.setEditKey('C-k', function (ev) {
  command.killLine(ev);
}, 'Kill the rest of the line');

key.setEditKey('C-y', command.yank, 'Paste (Yank)');

key.setEditKey('M-y', command.yankPop, 'Paste pop (Yank pop)', true);

key.setEditKey('C-M-y', function (ev) {
  if (!command.kill.ring.length) {
    return;
  }
  let (ct = command.getClipboardText()) (!command.kill.ring.length || ct != command.kill.ring[0]) &&
    command.pushKillRing(ct);
  prompt.selector({message: "Paste:", collection: command.kill.ring, callback: function (i) {if (i >= 0) {key.insertText(command.kill.ring[i]);}}});
}, 'Show kill-ring and select text to paste', true);

key.setEditKey('C-w', function (ev) {
  goDoCommand("cmd_copy");
  goDoCommand("cmd_delete");
  command.resetMark(ev);
}, 'Cut current region', true);

key.setEditKey('M-n', function () {
  command.walkInputElement(command.elementsRetrieverTextarea, true, true);
}, 'Focus to the next text area');

key.setEditKey('M-p', function () {
  command.walkInputElement(command.elementsRetrieverTextarea, false, true);
}, 'Focus to the previous text area');

key.setCaretKey('C-a', function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectBeginLine") : goDoCommand("cmd_beginLine");
}, 'Move caret to the beginning of the line');

key.setCaretKey([['C-e'], ['$'], ['M->'], ['G']], function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
}, 'Move caret to the end of the line');

key.setCaretKey([['C-n'], ['j']], function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectLineNext") : goDoCommand("cmd_scrollLineDown");
}, 'Move caret to the next line');

key.setCaretKey([['C-p'], ['k']], function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectLinePrevious") : goDoCommand("cmd_scrollLineUp");
}, 'Move caret to the previous line');

key.setCaretKey([['C-f'], ['l']], function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectCharNext") : goDoCommand("cmd_scrollRight");
}, 'Move caret to the right');

key.setCaretKey([['C-b'], ['h'], ['C-h']], function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectCharPrevious") : goDoCommand("cmd_scrollLeft");
}, 'Move caret to the left');

key.setCaretKey([['M-f'], ['w']], function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectWordNext") : goDoCommand("cmd_wordNext");
}, 'Move caret to the right by word');

key.setCaretKey([['M-b'], ['W']], function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectWordPrevious") : goDoCommand("cmd_wordPrevious");
}, 'Move caret to the left by word');

key.setCaretKey([['C-v'], ['SPC']], function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectPageNext") : goDoCommand("cmd_movePageDown");
}, 'Move caret down by page');

key.setCaretKey([['M-v'], ['b']], function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectPagePrevious") : goDoCommand("cmd_movePageUp");
}, 'Move caret up by page');

key.setCaretKey('M-<', function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectTop") : goDoCommand("cmd_scrollTop");
}, 'Move caret to the top of the page');

key.setCaretKey('M->', function (ev) {
  ev.target.ksMarked ? goDoCommand("cmd_selectBottom") : goDoCommand("cmd_scrollBottom");
}, 'Move caret to the bottom of the page');

key.setCaretKey('J', function () {
  util.getSelectionController().scrollLine(true);
}, 'Scroll line down');

key.setCaretKey('K', function () {
  util.getSelectionController().scrollLine(false);
}, 'Scroll line up');

key.setCaretKey(',', function () {
  util.getSelectionController().scrollHorizontal(true);
  goDoCommand("cmd_scrollLeft");
}, 'Scroll left');

key.setCaretKey('.', function () {
  goDoCommand("cmd_scrollRight");
  util.getSelectionController().scrollHorizontal(false);
}, 'Scroll right');

key.setCaretKey('z', function (ev) {
  command.recenter(ev);
}, 'Scroll to the cursor position');

key.setCaretKey([['C-SPC'], ['C-@']], function (ev) {
  command.setMark(ev);
}, 'Set the mark', true);

key.setCaretKey(':', function (ev, arg) {
  shell.input(null, arg);
}, 'List and execute commands', true);

key.setCaretKey('R', function () {
  BrowserReload();
}, 'Reload the page', true);

key.setCaretKey('B', function () {
  BrowserBack();
}, 'Back');

key.setCaretKey('F', function () {
  BrowserForward();
}, 'Forward');

key.setCaretKey(['C-x', 'h'], function () {
  goDoCommand("cmd_selectAll");
}, 'Select all', true);

key.setCaretKey('f', function () {
  command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setCaretKey('M-p', function () {
  command.walkInputElement(command.elementsRetrieverButton, true, true);
}, 'Focus to the next button');

key.setCaretKey('M-n', function () {
  command.walkInputElement(command.elementsRetrieverButton, false, true);
}, 'Focus to the previous button');

key.setViewKey('H', function () {
    if (gBrowser.mCurrentTab.previousSibling) {
        gBrowser.moveTabTo(gBrowser.mCurrentTab, gBrowser.mCurrentTab._tPos - 1);
    } else {
        gBrowser.moveTabTo(gBrowser.mCurrentTab, gBrowser.mTabContainer.childNodes.length - 1);
    }
}, 'Shift selected tab right');

key.setViewKey('L', function () {
    if (gBrowser.mCurrentTab.nextSibling) {
        gBrowser.moveTabTo(gBrowser.mCurrentTab, gBrowser.mCurrentTab._tPos + 1);
    } else {
        gBrowser.moveTabTo(gBrowser.mCurrentTab, 0);
    }
}, 'Shift selected tab left');
