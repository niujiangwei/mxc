<template>
  <div class="app-container">
    <!-- 新增按钮 -->
     <el-button
          type="primary"
          size="mini"
          @click="handleAdd()">增加</el-button>
      <el-table
    :data="tableData"
    style="width: 100%">
    <!-- 表格部分 -->
    <el-table-column
      label="ID"
      width="180">
      <template slot-scope="scope">
        
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="顾客名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>用户名: {{ scope.row.username }}</p>
          <p>真实姓名: {{ scope.row.realname }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="余额"
      width="180">
      <template slot-scope="scope">
        
        <span style="margin-left: 10px">{{ scope.row.money }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="密码"
      width="180">
      <template slot-scope="scope">
        
        <span style="margin-left: 10px">{{ scope.row.password }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit( scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete( scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <!--模态框 -->
  <el-dialog
  title="新增顾客信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :data="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="真实姓名">
    <el-input v-model="form.realname"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  </el-form>
  <!-- 上传头像 -->
  <el-upload
  
  class="upload-demo"
  action="http://121.199.29.84:8001/file/upload"
  :on-preview="handlePreview"
  :on-success="handlesuccess"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="dialogClose">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>

<script>

import {post} from '../../utils/axios'
export default {
 
  data() {
    return {
        tableData: [{
         
        },],
         dialogVisible:false,//控制模态框是否显示
        fileList:[],
        form:{}
    }
  },
  created() {
    this.findall()
  },
  methods: {
    // 修改方法
      handleEdit( row) {
        this.dialogVisible = true
        this.form = row
        console.log( row);
      },
      // 单个删除方法
      handleDelete( row) {
        console.log( row);
      },
      // 查询方法
      findall(){
        post('/customer/query?page=1&pageSize=5').then((res)=>{
          console.log(res.data.list);
          this.tableData = res.data.list
        })
      },
      // 新增方法
      dialogClose(){
        this.dialogVisible = false
       console.log(this.form);
       post('/customer/saveOrUpdate',this.form).then((res)=>{
          // 将模态框置空
               for(let key in this.form){
                this.form[key]  = ''
            }
          console.log(res);
          this.findall()
          if(res.status == 200){
            this.open2()
          }else {
            this.open1()
          }
       })
          
      },
      // 失败的提示
       open1() {
        this.$message({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'error'
        });
      },
      // 成功的提示
        open2() {
        this.$message({
          showClose: true,
          message: '恭喜你，添加成功',
          type: 'success'
        });
      },
      // 控制模态框显示
      handleAdd(){
        this.dialogVisible = true
      },
    handleClose() { 
          this.dialogVisible = false
          // 将模态框置空
               for(let key in this.form){
                this.form[key]  = ''
            }
      },
      // 图片上传成功之后的回调
      handlesuccess(){

      },
      handlePreview(){

      }

  }
}
</script>
