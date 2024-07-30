// deviceUUID.ts

export class DeviceUUID {
    private static readonly UUID_KEY = 'deviceUUID';

    /**
     * 生成一个新的UUID
     * @returns 返回生成的UUID字符串
     */
    private static generateUUID(): string {
        // @ts-ignore
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    /**
     * 获取或生成设备的UUID
     * @returns 返回存储的UUID或新生成的UUID
     */
    public static getUUID(): string {
        // 尝试从localStorage获取UUID
        const storedUUID = localStorage.getItem(DeviceUUID.UUID_KEY);

        if (storedUUID) {
            // 如果存在，则直接返回
            return storedUUID;
        } else {
            // 如果不存在，生成新的UUID，保存到localStorage，并返回
            const newUUID = DeviceUUID.generateUUID();
            localStorage.setItem(DeviceUUID.UUID_KEY, newUUID);
            return newUUID;
        }
    }
}

// 使用示例
// const deviceUUID = DeviceUUID.getUUID();
// console.log('Device UUID:', deviceUUID);
