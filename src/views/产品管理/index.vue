<template>
  <div class="app-container">
     <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="产品名称"
      prop="name">
    </el-table-column>
     
     <el-table-column
      label="产品状态"
      prop="status">
    </el-table-column>
     <el-table-column
      label="产品配料"
      prop="description">
    </el-table-column>
    <el-table-column
      label="产品图片"
      prop="icon">
      <template  slot-scope="scope">
         <el-avatar :src="scope.row.photo"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header"  >
        <input v-model="list.name"
         @input="test()"
          size="mini" placeholder="输入关键字搜索"/>
        
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row.id)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
    
  </div>
</template>

<script>
import Axios from 'axios';

import {post} from '@/utils/axios'
export default {
 
  data() {
    return {
     tableData: [],
        
        
          list:{
            page:'0',
            pageSize:'5',
          name: '',
        }
    }
  },
  created() {
   
  },
  created(){
   this. findall()
  },
  methods: {
     handleEdit(index, id) {
       
         Axios({url:"http://47.106.244.1:5588/category/saveOrUpdate",
               method:"post",
               id
                }).then((res)=>{
                  console.log(res.status);
                })
         
        
      },
      handleDelete(index, id) {
       Axios({url:"http://47.106.244.1:5588/category/deleteById?id="+id,
               
                }).then((res)=>{
                  console.log(res.status);
                })
      },
      findall(){
       post("http://47.106.244.1:5588/product/query",this.list).then((res)=>{
         this.tableData = res.data.list
         console.log(res.data.list);
       })
      },
      test(){
        console.log(this.list);
         post("http://47.106.244.1:5588/product/query",this.list).then((res)=>{
         this.tableData = res.data.list
         console.log(res.data.list);
       })
      }
               
      
  }
}
</script>
