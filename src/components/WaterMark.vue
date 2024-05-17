<template>
  <div class="watermark-container" ref="parentRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import useWatermarkBg from '@/hooks/useWatermarkBg.js';

// eslint-disable-next-line no-undef
const props = defineProps({
  text: {
    type: String,
    // todo required: true,会报错？？参照 https://blog.csdn.net/m0_74802419/article/details/134898185
    required: false,
    default: '皮皮问卷',
  },
  fontSize: {
    type: Number,
    default: 30,
  },
  gap: {
    type: Number,
    default: 70,
  },
});

const bg = useWatermarkBg(props);
const parentRef = ref(null);
const flag = ref(0); // 声明一个依赖
let div;

watchEffect(() => {
  flag.value; // 将依赖放在 watchEffect 里
  if (!parentRef.value) {
    return;
  }
  if (div) {
    div.remove();
  }
  const { base64, styleSize } = bg.value;

  div = document.createElement('div');
  div.style.backgroundImage = `url(${base64})`;
  div.style.backgroundSize = `${styleSize}px ${styleSize}px`;
  div.style.backgroundRepeat = 'repeat';
  div.style.zIndex = 9999;
  div.style.position = 'absolute';
  div.style.inset = 0;
  // 元素不会接收鼠标事件，鼠标事件会透过元素传递到下层的元素上
  div.style.pointerEvents = 'none';
  parentRef.value.appendChild(div);
});

// 防篡改处理
let ob;
onMounted(() => {
  ob = new MutationObserver((records) => {
    for (const record of records) {
      for (const dom of record.removedNodes) {
        if (dom === div) {
          flag.value++; // 删除节点的时候更新依赖
          return;
        }
      }
      if (record.target === div) {
        flag.value++; // 修改属性的时候更新依赖
        return;
      }
    }
  });
  ob.observe(parentRef.value, {
    childList: true,
    attributes: true,
    subtree: true,
  });
});

onUnmounted(() => {
  ob && ob.disconnect();
  div = null;
});
</script>

<style scoped>

</style>
