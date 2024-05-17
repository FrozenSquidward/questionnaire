import { computed } from 'vue';
export default function useWatermarkBg (props) {
    return computed(() => {
        // 创建一个 canvas
        const canvas = document.createElement('canvas');
        const devicePixelRatio = window.devicePixelRatio || 1;
        // 设置字体大小
        const fontSize = props.fontSize * devicePixelRatio;
        const font = fontSize + 'px serif';
        const ctx = canvas.getContext('2d');
        // 获取文字宽度
        ctx.font = font;
        const { width } = ctx.measureText(props.text);
        const canvasSize = Math.max(100, width) + props.gap * devicePixelRatio;
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        // 旋转 45 度让文字变倾斜
        ctx.rotate((Math.PI / 180) * -45);
        ctx.fillStyle = 'rgb(223,236,239)';
        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // 将文字画出来
        ctx.fillText(props.text, 0, 0);
        return {
            base64: canvas.toDataURL(),
            size: canvasSize,
            styleSize: canvasSize / devicePixelRatio,
        };
    });
}
