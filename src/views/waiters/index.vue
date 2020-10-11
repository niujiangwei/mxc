<template>
  <div class="app-container">
    <el-button
          type="primary"
          size="mini"
          @click="handleAdd()">增加</el-button>
           <el-button
          size="mini"
          type="danger"
          @click="handledeletearr()">批量删除</el-button>
    <el-table
    :data="list"
    border
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55"
      prop="id">
    </el-table-column>
     <el-table-column
      prop="imgPhoto	"
      label="头像"
      >
      <template  slot-scope="scope">
         <el-avatar :src="scope.row.imgPhoto"></el-avatar>
      </template>
       
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份">
    </el-table-column>
    <el-table-column
      prop="city"
      label="城市">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
   
    <el-table-column label="操作"
    width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
 
  <!--分页组件 -->
  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  <!--模态框 -->
  <el-dialog
  title="保存员工信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <p>用户名：<el-input v-model="waiter_info.username" placeholder="请输入内容"></el-input></p>
  <p>省份：<el-input v-model="waiter_info.province" placeholder="请输入内容"></el-input></p>
  <p>城市：<el-input v-model="waiter_info.city" placeholder="请输入内容"></el-input></p>
  <p v-if="waiter_info.status=='启动'">状态：
    <el-radio v-model="waiter_info.status" value='启用' label="启用" ></el-radio>
    <el-radio v-model="waiter_info.status" value='禁用' label="禁用"></el-radio>
  </p>
  <p v-else>状态：
    <el-radio v-model="waiter_info.status" value='启用' label="启用">启用</el-radio>
    <el-radio v-model="waiter_info.status" value='禁用' label="禁用">禁用</el-radio>
  </p>
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
    <el-button @click="$store.state.waiters.dialogVisible=false">取 消</el-button>
    <el-button type="primary" @click="dialogClose">确 定</el-button>
  </span>
  </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {mapActions,mapState} from 'vuex'
export default {
  data() {
    return {
      listLoading: false,
      imageUrl:"",
      fileList:[]
    }
  },
  components: { Pagination },
  computed:{
    ...mapState('waiters',['list','total','listQuery','waiter_info','dialogVisible'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions('waiters',['fetchData','handleEdit','dialogClose','handleAdd','handleSelectionChange','handledeletearr','handleDelete']),
    //这里也可以...mapmutations(),同上去结构方法
    // dialogClose(){
    //   this.$store.commit('waiters/dialogClose')
    // }
    handleClose() {     
      
         this.$store.state.waiters.dialogVisible=false       
    },
   handlesuccess(response) {
        console.log( response);
       this.waiter_info.imgPhoto = "http://121.199.29.84:8888/group1/"+ response.data.id
 
      },
      handlePreview(file) {
        console.log(file);
      }
    
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
