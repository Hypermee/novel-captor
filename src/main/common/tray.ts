import { Tray, NativeImage,  BrowserWindow } from 'electron';

interface TrayOptions {
  icon: NativeImage
  toolTip?: string
}

export default function(options: TrayOptions, win: BrowserWindow) {
  const { icon, toolTip } = options;

  const tray = new Tray(icon);

  tray.setToolTip(toolTip || '快捕小说');

  tray.on('double-click', () => {
    // 双击通知区图标实现应用的显示或隐藏
    win.isVisible() ? win.hide() : win.show()
    win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
  });
}
