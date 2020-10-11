<template>
  <div class="app-container">
     <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="订单编号"
      prop="id">
    </el-table-column>
    
    <el-table-column
      label="地址id"
      prop="addressId">
    </el-table-column>
    <el-table-column
      label="total"
      prop="total">
     
    </el-table-column>
     <el-table-column
      label="订单状态"
      prop="status">
     
    </el-table-column>
    <el-table-column
      label="价格"
      prop="price">
     
    </el-table-column>
    <el-table-column
      align="right">
      
      <template slot="header" >
        <input
          v-model="search"
          size="mini"
        @input="test(search)"
          placeholder="输入订单编号搜索"/>
      </template>
     <!-- 绑定一个方法给enter事件,获取到输入的值,调接口查询.返回值给table -->
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
import { post,get} from '@/utils/axios'

export default {
 
  data() {
    return {
     tableData: [],
        search: '',
       
    }
  },
  created() {
   
  },
  created(){
   this. findall()
  },
  methods: {
     handleEdit(index, id) {
       
        //  Axios({url:"http://47.106.244.1:5588 /order/save ",
        //        method:"post",
        //        id
        //         }).then((res)=>{
        //           console.log(res.status);
        //         })
         
        
      },
      handleDelete(index, id) {
       Axios({url:"http://47.106.244.1:5588/order/deleteById",
               
                }).then((res)=>{
                  console.log(res.status);
                })
      },
      findall(){
        post("http://47.106.244.1:5588/order/queryPage",
                {
          page:"2",
          pageSize:"5",
        } 
              
                ).then((res)=>{
                  this.tableData = res.data.list
                  console.log(res.data.list);
                })
      },
      test(search){
         Axios({url:"http://47.106.244.1:5588/order/getOrderLinesByOrderId?orderId="+search,
         
               
                }).then((res)=>{
                  this.tableData = res.data.data
                  console.log(res.data.data);
                })
       

      }
  }
}
</script>
