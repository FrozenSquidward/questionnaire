// 添加对 MSStream 的类型声明
// @ts-ignore

declare global {
    interface Window {
        MSStream?: any;
    }
}

export default function getInfo() {
    const userAgent = navigator.userAgent;
    const deviceInfo = {
        OS: "Unknown",
        isMobile: false,
    };

    // 检测设备类型
    if (/windows phone/i.test(userAgent)) {
        deviceInfo.OS = "Windows Phone";
        deviceInfo.isMobile = true;
    } else if (/android/i.test(userAgent)) {
        deviceInfo.OS = "Android";
        deviceInfo.isMobile = true;
    } else { // @ts-ignore
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                deviceInfo.OS = "iOS";
                deviceInfo.isMobile = true;
            } else if (/macintosh|mac os x/i.test(userAgent)) {
                deviceInfo.OS = "Mac OS";
            } else if (/windows/i.test(userAgent)) {
                deviceInfo.OS = "Windows";
            }
    }

    // 打印设备信息
    // console.log("=======deviceInfo=======");
    // console.log(deviceInfo);
    return deviceInfo;
}
