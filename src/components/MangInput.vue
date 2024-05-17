<template>
  <VueDraggable v-model="list3" animation="150" ghostClass="ghost" :group="{ name: 'mang', pull: 'clone', put: false }" :sort="false">
    <div v-for="item in list3" :key="item.id">
      <el-card style="color: red;" shadow="always">
        <span>{{ item.name }}</span><br>
        <el-input v-model="item.value" style="margin-top: 5px; width: 80%" placeholder="请输入内容" />
      </el-card>
    </div>
  </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import { ref } from 'vue';

const list3 = ref([
  {
    name: '输入框问题',
    id: 11,
    type: 'input',
    value: ''
  }
])
</script>

<style scoped>
.el-card{
  color: red;
  height: 110px;
}
</style>
