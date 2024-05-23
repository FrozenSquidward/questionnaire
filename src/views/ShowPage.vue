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
        <div v-for="(item) in listGet" :key="item.id">
          <el-card class="grid-card" shadow="always">
            <div class="dd" >
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
    options: []
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
