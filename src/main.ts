import { app } from 'electron';
import * as path from 'path';
import ioHook from 'iohook';

const sound = require('sound-play');

const darwinKeyCodes = [
  /*
  * kVK_ANSI
  */
  0x00, // A
  0x01, // S
  0x02, // D
  0x03, // F
  0x04, // H
  0x05, // G
  0x06, // Z
  0x07, // X
  0x08, // C
  0x09, // V
  0x0B, // B
  0x0C, // Q
  0x0D, // W
  0x0E, // E
  0x0F, // R
  0x10, // Y
  0x11, // T
  0x12, // 1
  0x13, // 2
  0x14, // 3
  0x15, // 4
  0x16, // 6
  0x17, // 5
  0x18, // Equal
  0x19, // 9
  0x1A, // 7
  0x1B, // Minus
  0x1C, // 8
  0x1D, // 0
  0x1E, // RightBracket
  0x1F, // O
  0x20, // U
  0x21, // LeftBracket
  0x22, // I
  0x23, // P
  0x25, // L
  0x26, // J
  0x27, // Quote
  0x28, // K
  0x29, // Semicolon
  0x2A, // Backslash
  0x2B, // Comma
  0x2C, // Slash
  0x2D, // N
  0x2E, // M
  0x2F, // Period
  0x32, // Grave
  0x41, // KeypadDecimal
  0x43, // KeypadMultiply
  0x45, // KeypadPlus
  0x47, // KeypadClear
  0x4B, // KeypadDivide
  0x4C, // KeypadEnter
  0x4E, // KeypadMinus
  0x51, // KeypadEquals
  0x52, // Keypad0
  0x53, // Keypad1
  0x54, // Keypad2
  0x55, // Keypad3
  0x56, // Keypad4
  0x57, // Keypad5
  0x58, // Keypad6
  0x59, // Keypad7
  0x5B, // Keypad8
  0x5C, // Keypad9
];

app.on('ready', () => {
  ioHook.on('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    if (process.platform === 'darwin' && !darwinKeyCodes.includes(e.rawcode)) {
      return;
    }
    sound.play(path.resolve(__dirname, 'SansSpeak.wav'));
  });
  ioHook.start();
});

const close = () => {
  ioHook.unload();
  ioHook.stop();
}

app.on('window-all-closed', () => {
  close();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', close);
app.on('will-quit', close);
