<template>
  <VueDraggable v-model="list2" animation="150" ghostClass="ghost" :group="{ name: 'mang', pull: 'clone', put: false }" :sort="false">
    <div v-for="item in list2" :key="item.id">
      <el-card shadow="always">
        <span>{{ item.name }}</span>
        <el-checkbox-group v-model="item.value">
          <div :key="it.id" v-for="it in item.options">
            <el-checkbox :value="it.id">{{it.name}}</el-checkbox><br>
          </div>
        </el-checkbox-group>
      </el-card>
    </div>
  </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import { ref } from 'vue';

const list2 = ref([
  {
    name: '多选题',
    id: 2,
    type: 'checkbox',
    value: [],
    options: [
      {id: 'A', name: 'AA选项'},
      {id: 'B', name: 'BB选项'},
    ]
  }
])
</script>

<style scoped>
.el-card{
  color: red;
  height: 110px;
}
</style>
