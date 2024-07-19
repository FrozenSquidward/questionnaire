<template>
  <el-dialog
      v-model="submitDialogVisible"
      title="提交成功"
      width="500"
      align-center
  >
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="submitDialogVisible = false">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <water-mark>
    <div class="flex">
      <div class="grid-container1">
        <div style="height: 10%;color: #8b0074"/>
        <h2>{{title}}</h2>
        <div v-for="(item) in listGet" :key="item.id" :id="'question-' + item.id">
          <el-card class="grid-card" shadow="always">
            <div class="dd" :class="{ 'highlight': !item.isFilled }">
              <!-- 单选 radio -->
              <div v-if="item.type === 'radio'">
                <!-- 问题标题 -->
                <span class="dd-name">{{item.name}}</span>
                <el-radio-group v-model="item.value">
                  <div v-for="it in item.options" :key="it.id" class="radio-input-wrapper">
                    <!-- 选项 -->
                    <el-radio :value="it.id" class="radio-btn">{{it.name}}</el-radio>
                  </div>
                </el-radio-group>
              </div>
              <!-- 多选框 checkbox -->
              <div v-if="item.type === 'checkbox'">
                <!-- 问题标题 -->
                <span class="dd-name">{{item.name}}</span>
                <el-checkbox-group v-model="item.value">
                  <div v-for="it in item.options" :key="it.id" class="radio-input-wrapper">
                    <!-- 问题选项 -->
                    <el-checkbox :value="it.id" class="radio-btn">{{it.name}}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
              <!-- 输入框 input -->
              <div v-else-if="item.type === 'input'">
                <!-- 问题标题 -->
                <span class="dd-name">{{item.name}}</span>
                <el-input style="margin-top: 10px;" v-model="item.value" autosize type="textarea" placeholder="请输入内容" clearable></el-input>
              </div>
            </div>
          </el-card>
        </div>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </water-mark>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from 'axios';
import { useRoute } from 'vue-router';
import WaterMark from "@/components/WaterMark.vue"

const id = ref<string | null>('my_key');
// 获取当前路由对象
const route = useRoute();

const submitDialogVisible = ref(false)
let title=ref('');
let listGet=ref([
  {
    name: '',
    id: 0,
    type: '',
    value: '',
    options: [],
    isFilled: false
  }
]);

// 初始化数据
onMounted(() => {
  // 获取路由参数 http://192.168.17.195:8080/show?id=100
  id.value = route.query.id ? String(route.query.id) : 'my_key';
  // console.log('id')
  // console.log(id.value)
  axios.get(process.env.VUE_APP_BACKEND_URL + '/dd/get_key?key=' + id.value)
      .then(function (response) {
        console.log(response);
        // 处理成功情况
        listGet.value = response.data.value.list;
        title.value = response.data.value.title;
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .finally(function () {
        // 总是会执行
      });
})
/*
* 提交数据
* */
function submit() {
  console.log(listGet)
  validateAndHighlight()
  // 检查是否所有项都已填写
  if (listGet.value.some(item => !item.isFilled)) {
    // 如果有未填项，阻止提交并显示错误信息（可选）
    // 定位到第一个未答问题
    const firstUnanswered = listGet.value.find(item => !item.isFilled);
    if (firstUnanswered) {
      const element = document.getElementById('question-' + firstUnanswered.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    // alert('有未填写的表单项，请检查并填写完整。');
    return;
  }

  // 使用map方法提取id和value
  const extractedData = listGet.value.map(item => ({
    id: item.id,
    value: item.value
  }));
  axios.post(process.env.VUE_APP_BACKEND_URL+'/dd/submit', {
    value: extractedData,
    key: id.value+':submit',
  }).then(function (response) {
    console.log(response);
    submitDialogVisible.value=true;
  }).catch(function (error) {
    console.log(error);
  });
}
// 校验并设置 isFilled 状态的函数
function validateAndHighlight() {
  listGet.value.forEach(item => {
    let isFilled = false;
    if (item.value){
      if (item.type === 'radio' || item.type === 'checkbox') {
        // 对于单选和多选，检查是否有选中的值
        // 假设 item.value 是一个数组（对于复选框），或者一个对象/字符串（对于单选框）
        if (item.type === 'checkbox') {
          isFilled = item.value.length > 0; // 检查数组长度
        } else if (item.type === 'radio') {
          // 对于单选框，可能需要检查 item.value 是否是一个非空字符串或特定值
          isFilled = item.value !== '';
        }
      } else if (item.type === 'input') {
        // 对于输入框，检查值是否非空字符串
        isFilled = item.value.trim() !== '';
      }
    }
    // 对于其他类型，你可能需要添加额外的逻辑
    item.isFilled = isFilled;
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.highlight {
  border: 1px solid red; /* 你可以根据需要自定义高亮样式 */
}
.grid-container1 {
  width: 96%;
  /* 设置左右边距 */
  /* 如果你想使用百分比或者 em/rem 单位，也可以这样设置 */
  margin-left: 2%;
  margin-right: 2%;
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
