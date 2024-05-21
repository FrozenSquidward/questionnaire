<template>
  <el-button type="primary" style="margin-top: 60px" @click="centerDialogVisible = true">新增</el-button>
  <el-dialog
      v-model="centerDialogVisible"
      title="新建问卷"
      width="500"
      align-center
  >
    <el-input v-model="titleNew" placeholder="请输入问卷标题">{{titleNew}}</el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="add()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <div class="container">
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="time" label="保存时间"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="操作列" v-slot="scope">
            <el-button :icon="Edit" circle @click="goDd(scope.row.key)"/>
            <el-button :icon="Share" @click="goShow(scope.row.key)"/>
        </el-table-column>
        <!-- 添加其他列 -->
      </el-table>
    </div>
    <div  style="width: 10%; float: right; margin-right: 20%">
      <el-pagination style="margin-top: 5px"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 50]"
                     :page-size="pageSize"
                     layout="prev, pager, next"
                     :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
import axios from "axios";
import {Edit,Share} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import {listNew,titleNew} from "@/ts/Clone";
const router = useRouter();
// 模拟数据
const tableData = ref([])

// 分页配置
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const centerDialogVisible = ref(false)

// 初始化数据
onMounted(() => {
  getData();
})

function handleCurrentChange(val: number) {
  currentPage.value = val
  getData();
}

function getData() {
  axios.get(process.env.VUE_APP_BACKEND_URL + '/dd/get_keys_by_page?page=' + currentPage.value + '&size=' + pageSize.value)
      .then(function (response) {
        // 处理成功情况
        tableData.value = response.data.value;
        total.value = response.data.total;
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .finally(function () {
        // 总是会执行
      });
}

// 编程式导航 https://router.vuejs.org/zh/guide/essentials/navigation.html
function goDd(key:string){
  console.log(key);
  router.push({path:'/dd', query:{id : key}})
}
function goShow(key:string){
  console.log(key);
  router.push({path:'/show', query:{id : key}})
}
function add(){
  centerDialogVisible.value = false
  let key = generateRandomString();
  axios.post(process.env.VUE_APP_BACKEND_URL + '/dd/set_zkey', {
    key: key,
    value: {
      title: titleNew.value,
      list: listNew.value
    },
  }).then(function (response) {
    console.log(response);
    if (response.status == 200){
      router.push({path:'/dd', query:{id : key}})
    }
  }).catch(function (error) {
    console.log(error);
  });
}

// 主函数：生成8位随机字符串
function generateRandomString(length = 8) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += getRandomChar();
  }
  return result;
}
// 辅助函数：生成随机字符
function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}
</script>

<style scoped>
.container {
  height: 100vh; /* 使内容垂直居中 */
  padding: 20px; /* 适当的内边距 */
  box-sizing: border-box; /* 确保 padding 不会增加容器的宽度 */
}

</style>
