<template>
    <div class="app-container">
        <!-- 表格 -->
        <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="数据加载中"
        border
        fit
        highlight-current-row>

        <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
        </el-table-column>

        <el-table-column prop="name" label="名称" width="80" />

        <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
            {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
        </el-table-column>

        <el-table-column prop="intro" label="资历" />

        <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

        <el-table-column prop="sort" label="排序" width="60" />

        <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
      <!-- @size-change="handleSizeChange"
    @current-change="handleCurrentChange" -->
    <el-pagination
    :current-page="page"
    :page-sizes="[3,10, 20, 30, 40,50]"
    :page-size="limit"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="getList"
    >
  </el-pagination>
    </div>
</template>
<script>
    //引入js
    import teacher from "@/api/edu/teacher"

    export default{
        data(){//定义变量和初始值
            return{
                list:null,
                page:1,
                limit:3,
                total:0,
                teacherQuery:{}
            }
        },
        created(){//页面渲染之前执行，调用methods里定义的方法
            this.getList();
        },
        methods:{//定义方法,调用对应teacher.js里定义的方法
            handleSizeChange(val) {
                this.limit=val;
            },
            getList(page=1,limit=3){
                this.page=page
                this.limit=limit
                teacher.getTeacherPageList(this.page,this.limit,this.teacherQuery)
                       .then(response =>{
                            console.log(response);
                            this.list=response.data.rows;
                            this.total=response.data.total;
                       })
                       .catch(error =>{
                           console.log(error)
                       })
            }
        }
    }
</script>