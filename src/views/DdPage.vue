<template>
  <div class="flex">
    <div class="grid-container1">
      <div class="grid-container2">
        <!-- 控件1 单选 -->
        <MangRadio :clone="clone"></MangRadio>
        <!-- 控件2 多选 -->
        <MangCheckbox :clone="clone"></MangCheckbox>
        <!-- 控件3 输入框 -->
        <MangInput :clone="clone"></MangInput>
      </div>

      <div style="height: 100px;color: #8b0074"/>
      <el-button type="primary" @click="save">保存</el-button><br>
      <el-input v-model="titleNew" placeholder="请输入问卷标题" clearable style="width: 50%;margin: 10px">{{titleNew}}</el-input>
      <!-- 操作渲染结果 delay解决在手机上操作按钮点击不到的问题 -->
      <VueDraggable v-model="listNew" animation="150" group="mang" ghostClass="ghost" :delay="200">
        <div v-for="(item, index) in listNew" :key="item.id">
          <el-card class="grid-card" shadow="always">
            <div class="dd">
              <div @click="toggleRequired(item.id)">
                <el-icon v-if="item.required === true" color="red"><StarFilled /></el-icon>
                <el-icon v-else><Star /></el-icon>
              </div>
              <!-- 单选 radio -->
              <div v-if="item.type === 'radio'">
                <el-radio-group v-model="item.value">
                  <!-- 问题标题 -->
                  <el-input class="dd-name" v-model="item.name" autosize type="textarea" placeholder="单选题 请输入内容" clearable></el-input>
                  <div v-for="it in item.options" :key="it.id" class="radio-input-wrapper">
                    <!-- 问题选项 -->
                    <el-radio :value="it.id" class="radio-btn">{{it.id}}</el-radio>
                    <!-- 问题选项描述 -->
                    <div class="input-wrapper">
                      <el-input class="dd-option" v-model="it.name" autosize type="textarea" placeholder="请输入选项内容" clearable>{{it.name}}</el-input>
                    </div>
                    <!-- 删除问题选项 -->
                    <button class="delete-btn" @click="deleteOption(item.id, it.id)">-</button>
                  </div>
                </el-radio-group>
                <!-- 添加问题选项 -->
                <el-button style="margin-top: 10px; margin-left: 100px;" type="info" :icon="CirclePlus" @click="addOption(item.id)"></el-button>
              </div>
              <!-- 多选框 checkbox -->
              <div v-if="item.type === 'checkbox'">
                <el-checkbox-group v-model="item.value">
                  <!-- 问题标题 -->
                  <el-input class="dd-name" v-model="item.name" autosize type="textarea" placeholder="多选题 请输入内容" clearable></el-input>
                  <div v-for="it in item.options" :key="it.id" class="radio-input-wrapper">
                    <!-- 问题选项 -->
                    <el-checkbox :value="it.id" class="radio-btn">{{it.id}}</el-checkbox>
                    <!-- 问题选项描述 -->
                    <el-input class="dd-option" v-model="it.name" autosize type="textarea" placeholder="请输入选项内容" clearable>{{it.name}}</el-input>
                    <!-- 删除问题选项 -->
                    <button class="delete-btn" @click="deleteOption(item.id, it.id)">-</button>
                  </div>
                </el-checkbox-group>
                <!-- 添加问题选项 -->
                <el-button style="margin-top: 10px; margin-left: 100px;" type="info" :icon="CirclePlus" @click="addOption(item.id)"></el-button>
              </div>
              <!-- 输入框 input -->
              <div v-else-if="item.type === 'input'">
                <el-input class="dd-name" v-model="item.name" autosize type="textarea" placeholder="请输入内容" clearable></el-input>
                <el-input style="margin-top: 10px;" v-model="item.value" autosize type="textarea" placeholder="请输入内容" clearable></el-input>
              </div>
            </div>

            <el-button style="margin-top: 10px;" type="danger" :icon="Delete" circle @click="remove(index)"/>
          </el-card>
        </div>
      </VueDraggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import { VueDraggable } from 'vue-draggable-plus';
import {Delete, CirclePlus, Star, StarFilled} from '@element-plus/icons-vue'
import MangRadio from '../components/MangRadio.vue';
import MangCheckbox from '../components/MangCheckbox.vue';
import MangInput from '../components/MangInput.vue';
import clone,{ listNew,titleNew } from '../ts/Clone';
import axios from 'axios';
import { useRoute } from 'vue-router';

const id = ref<string | null>('my_key');
// 获取当前路由对象
const route = useRoute();

// 初始化数据
onMounted(() => {
  id.value = route.query.id ? String(route.query.id) : 'my_key';
  axios.get(process.env.VUE_APP_BACKEND_URL + '/dd/get_key?key=' + id.value)
      .then(function (response) {
        // console.log(response);
        // 处理成功情况
        listNew.value = response.data.value.list;
        titleNew.value = response.data.value.title;
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .finally(function () {
        // 总是会执行
      });
})

function save() {
  // console.log(listNew)
  // listNew.value.map(item => {
  //   if (!item.required){
  //     item.required = false;
  //   }
  // });
  // 使用 process.env 访问环境变量
  axios.post(process.env.VUE_APP_BACKEND_URL + '/dd/set_zkey', {
    key: id.value,
    value: {
      title: titleNew.value,
      list: listNew.value
    },
  }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
}

// 假设listNew是一个响应式引用（如Vue 3中的ref）
// 你需要确保它在外部被定义和初始化
// let listNew = ref([]);
function addOption(itemId: number) {
  console.log(itemId);
  listNew.value.map(item => {
    if (item.id === itemId) {
      let length: number = item.options.length;
      // 使用新的转换函数来设置新的选项ID
      let newId = convertIdToABC(length); // 假设我们想要ID中包含原始item.id的信息
      item.options.push({
        id: newId,
        name: `新增项${newId}` // 也可以将新ID添加到name中以供参考
      });
    }
  });
}
// 转换数字到字母ID的函数
function convertIdToABC(id: number): string {
  let result = 'A';
  let base = 26; // 字母Z的索引
  if (id > 0) {
    // 取得当前位的值（0-25）
    let digit = id % base;
    // 将当前位的值转换为对应的字母
    result = String.fromCharCode(65 + digit); // 65是'A'的ASCII码
    // 减去已经处理的部分
    id = Math.floor(id / base);
    if (id > 0) {
      result = result + id
    }
  }
  return result;
}
function deleteOption(itemId: number, optionId: string) {
  console.log(itemId);
  const item = listNew.value.find(item => item.id === itemId);
  if (item) {
    // 删除特定选项
    item.options = item.options.filter(option => option.id !== optionId);
    // 如果有选项剩余，则重新生成它们的ID
    if (item.options.length > 0) {
      // 使用map函数来重新分配ID
      item.options = item.options.map((option, index) => ({
        // 假设我们想要ID中包含item.id和索引信息
        id: convertIdToABC(index), // 这里我们传入索引
        name: `${option.name || ''}` // 保持原来的名称或者为空字符串
      }));
    }
  } else {
    console.warn(`No item found with id: ${itemId}`);
  }
}
function toggleRequired(itemId: number){
  const item = listNew.value.find(item => item.id === itemId);
  if (item) {
    item.required = !item.required;
  }
}
// -----------------

function remove(index: number) {
  listNew.value.splice(index, 1)
  // 重新生成ID 排序
  if (listNew.value.length > 0){
    for (let i = 0; i < listNew.value.length; i++) {
      listNew.value[i].id = i+1;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ghost {
  opacity: 0.5;
  background: rgba(6, 136, 231, 0.85);
}
.grid-container1 {
  width: 96%;
  /* 设置左右边距 */
  /* 如果你想使用百分比或者 em/rem 单位，也可以这样设置 */
  margin-left: 2%;
  margin-right: 2%;
}
.grid-container2 {
  display: grid;
  grid-template-columns: 15% 15% 15% 10%; /* 定义N列，每列占据可用空间的1/N */
  column-gap: 2px;
  overflow: auto;
  height: 120px;
}

.grid-card {
  //height: 100%; /* 如果需要垂直居中，确保容器有高度 */
  margin-left: 5%;
  margin-right: 5%;
  /* 其他样式... */
}

.dd {
  text-align: left; /* 设置文本左对齐 */
  padding-left: 5px; /* 设置左边距为5px */

  display: block;
  margin-left: 5%;
  margin-right: 10%;
  margin-top: 10px; /* 根据需要调整间距 */
}
.dd-name {
  text-align: left; /* 设置文本左对齐 */
  //padding-left: 5px; /* 设置左边距为5px */
  //width: 90%;
}

.dd-option {
  text-align: left; /* 设置文本左对齐 */
  padding-left: 1px; /* 设置左边距为5px */
  //width: 90%;
}

.el-radio-group {
  display: block;
  //width: 100%; /* 设置容器宽度，根据实际需要调整 */
  //overflow-x: auto; /* 当单选按钮宽度总和超过容器宽度时，可以横向滚动查看 */
}

.el-checkbox-group {
  display: block;
  //width: 100%; /* 设置容器宽度，根据实际需要调整 */
  //overflow-x: auto; /* 当单选按钮宽度总和超过容器宽度时，可以横向滚动查看 */
}

/*解决输入框抖动*/
:deep(.el-input__wrapper) {
  position: relative;
  .el-input__inner {
  padding-right: 18px;
  }
  .el-input__suffix {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  }
}
// 123
.radio-input-wrapper {
  display: flex;
  align-items: flex-start; /* 确保元素垂直对齐 */
  margin-top: 10px;
}

.radio-btn {
  flex: 0 0 2%; /* el-radio 占据 2% 宽度，不伸缩 */
  margin-right: 10px; /* 可选：添加一些间距 */
}

.input-wrapper {
  flex: 1; /* el-input 占据剩余空间 */
  position: relative; /* 为了在需要时定位删除按钮 */
}
</style>
