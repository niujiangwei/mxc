import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入我们的封装好的网络请求文件
import {get, post,poststr} from '@/utils/axios'
 import ElementUI from 'element-ui'
 Vue.use(ElementUI)

const waiters = {
    //命名空间：我们的模块在使用数据或者方法时，可以使用子模块的名称去获取该数据或者方法
    namespaced: true,
    state:{
        list:null,//保存返回的数据
        total: 0,//总数量
        listQuery: {
            page: 1,//当前页码
            limit: 5,//一页显示几条
        },
        waiter_info:{},//当前编辑的员工数据
        dialogVisible:false,//控制模态框是否显示
        multipleSelection:[],
    },
    mutations:{
        //这里可以设置一些保存值的方法
        SETLIST(state,data){
            state.list = data;
        }
    },
    actions:{
        fetchData(context){
            // get('/waiter/findAll').then((msg)=>{
            //    //context.state.list = msg.data;
            //    context.commit('SETLIST',msg.data);
            // }).catch((err)=>{
            //     console.log(err)
            // })
            post('/waiter/query',{
                //因为sql的limit从0开始获取页码
                page: context.state.listQuery.page-1,
                pageSize: context.state.listQuery.limit,
            }).then((msg)=>{
                //console.log(msg)
                //context.state.list = msg.data;
                context.state.total = msg.data.total;
                context.commit('SETLIST',msg.data.list);
            }).catch((err)=>{
                    console.log(err)
            })
        },
        handleEdit(context,id){
            //点点击修改时，我们会先通过ID获取到这个员工的数据，展示到模态框中，模态框的数据和waiter_info这个对象绑定
            get('/waiter/findWaiterById?id='+id).then((msg)=>{
               context.state.waiter_info = msg.data;
               context.state.dialogVisible = true
            }).catch((err)=>{
                console.log(err)
            })
        },
        dialogClose(context){                 
            post('/waiter/saveOrUpdate',context.state.waiter_info).then((msg)=>{
                ElementUI.Notification({
                    title: '保存',
                    message: '保存成功',
                    type: 'success',
                    duration: 2000
                })
                // this.$notify({
                //     title: '保存',
                //     message: '保存成功',
                //     type: 'success',
                //     duration: 2000
                //   })
                context.dispatch('fetchData')
                context.state.dialogVisible=false;
            }).catch((err)=>{
                    console.log(err)
            })
        },
        handleAdd(context){
            context.state.waiter_info = {}
            context.state.dialogVisible = true
        },
        //获取多选数组
        handleSelectionChange(context,val) {
           context.state.multipleSelection=[];
           val.forEach(function(item){s
                context.state.multipleSelection.push(item.id)
            })
           
        },
        handledeletearr(context){
            if(confirm('确定删除吗？')){
            post('/waiter/batchDelete',{ids:context.state.multipleSelection.toString()}).then((msg)=>{
                ElementUI.Notification({
                    title: '删除',
                    message: '批量删除成功',
                    type: 'success',
                    duration: 2000
                })
                context.dispatch('fetchData')
            }).catch((err)=>{
                    console.log(err)
            })
            }
        },
        handleDelete(context,id){
            if(confirm('确定删除吗？')){
            get('/waiter/deleteById?id='+id).then((msg)=>{
                ElementUI.Notification({
                    title: '删除',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                context.dispatch('fetchData')
             }).catch((err)=>{
                 console.log(err)
             })
            }
        }
    }
}
export default waiters