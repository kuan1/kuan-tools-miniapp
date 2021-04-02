import Taro from "@tarojs/taro";

let systemInfo;

export function getSystemInfo() {
  if (systemInfo) return systemInfo;
  systemInfo = Taro.getSystemInfoSync();
  return systemInfo;
}

export function getWinWidth() {
  const { screenWidth = 375, screenHeight = 812 } = getSystemInfo();
  return screenWidth < screenHeight ? screenWidth : screenHeight;
}
export function getWinHeight() {
  const { windowWidth = 375, windowHeight = 812 } = getSystemInfo();
  return windowWidth < windowHeight ? windowHeight : windowWidth;
}

export function rpx2px(size) {
  const screenWidth = getWinWidth();
  return (size * screenWidth) / 750;
}
