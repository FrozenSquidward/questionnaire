<template>
  <VueDraggable v-model="list1" animation="150" ghostClass="ghost" :group="{ name: 'mang', pull: 'clone', put: false }" :sort="false">
    <div v-for="item in list1" :key="item.id">
      <el-card shadow="always" >
        <span >{{ item.name }}</span>
        <el-radio-group v-model="item.id">
          <div :key="it.id" v-for="it in item.options">
            {{it.id}}<el-radio :value="it.id" style="padding:1px">{{it.name}}</el-radio><br>
          </div>
        </el-radio-group>
      </el-card>
    </div>
  </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import { ref } from 'vue';

const list1 = ref([
  {
    name: '单选题',
    id: 1,
    type: 'radio',
    value: '',
    options: [
      {id: 'A', name: '选项A'},
      {id: 'B', name: '选项B'}
    ]
  }
])
</script>

<style scoped>
.el-card{
  /*width: 100%;*/
  color: red;
  max-height: 110px;
}
</style>
