<template>
  <div class="flex" style="width: 50%">
    <VueDraggable
        v-model="list1"
        animation="150"
        ghostClass="ghost"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="clone"
        :sort="false"
    >
      <div
          v-for="item in list1"
          :key="item.id"
          style="width: 100%"
      >
        <el-card style="width: 20%;color: red;padding:0px" shadow="always">{{ item.name }}</el-card>
      </div>
    </VueDraggable>
    <VueDraggable
        v-model="list2"
        animation="150"
        group="people"
        ghostClass="ghost"
    >
      <div
          v-for="item in list2"
          :key="item.id"
      >
        <el-card style="width: 100%;color: green" shadow="always">{{ item.name }} + {{item.age}}</el-card>
      </div>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus';

const list1 = ref([
  {
    name: 'Joao',
    id: '1',
    age: '1'
  },
  {
    name: 'Jean',
    id: '2',
    age: '2'
  },
  {
    name: 'Johanna',
    id: '3',
    age: '3'
  },
  {
    name: 'Juan',
    id: '4',
    age: '4'
  }
])
const list2 = ref(
    list1.value.map(item => ({
      name: `${item.name}-2`,
      id: `${item.id}-2`,
      age: `old age ${item.age}`
    }))
)

function clone(element: Record<'name' | 'id' | 'age', string>) {
  const len = list2.value.length
  return {
    name: `${element.name}-clone-${len}`,
    id: `${element.id}-clone-${len}`,
    age: `new age ${element.age}`
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ghost {
  opacity: 0.5;
  background: rgba(6, 136, 231, 0.85);
}
</style>
