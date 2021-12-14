import Clipboard from "@react-native-community/clipboard";

function pasteToClipboard(content: string) {
  Clipboard.setString(content);
}

export const ClipboardUtils = {
  pasteToClipboard
};