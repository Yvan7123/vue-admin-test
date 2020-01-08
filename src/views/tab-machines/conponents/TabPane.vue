<template>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="机械编号" width="95">
            <template slot-scope="scope">
            {{ scope.row.Id }}
            </template>
        </el-table-column>
        <el-table-column label="机械名称" width="110" align="center">
            <template slot-scope="scope">
            {{ scope.row.Name }}
            </template>
        </el-table-column>
        <el-table-column label="所属标段" width="110" align="center">
            <template slot-scope="scope">
            <span>{{ scope.row.SectionName }}</span>
            </template>
        </el-table-column>
        <el-table-column label="所属队伍" width="110" align="center">
            <template slot-scope="scope">
            {{ scope.row.TeamName }}
            </template>
        </el-table-column>
        <el-table-column label="宽度" width="110" align="center">
            <template slot-scope="scope">
            {{ scope.row.Width }}
            </template>
        </el-table-column>
        <el-table-column label="类型" width="110" align="center">
            <template slot-scope="scope">
            {{ ShowTypeName(scope.row.Type) }}
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
            <el-button type="warning" @click="handleDelete(scope.$index, scope.row.Id)">
                卸载
                <i class="el-icon-delete el-icon-right" />
            </el-button>
            </template> 
        </el-table-column> 
    </el-table>
</template>

<script>
import { fetchList } from '@/api/machine' 
export default {
    data() {
        return {
            list: null,
            listQuery: {
                page: 1,
                limit: 5,
                section: this.section
            },
            listloading: null,
            delVisibl: false,
            delMachineid: 0
        }
    }, 
    props: ['section'],
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.listLoading = true
            getListBySection(this.listQuery).then(repsonse => {
                this.list = repsonse.data.lists
                this.listLoading = false
            })
        },
        ShowTypeName(type) {
            if(type == 1) {
                return "摊铺机"
            }else if (type == 2) {
                return "单钢轮"
            }else if (type == 3) {
                return "双钢轮"
            }else {
                return "胶轮"
            }
        },
        handleDelete(index, id) {
            this.delVisible = true
            this.delMachineId = id,
            console.log(id)
        },
        deleteMachine(){
            if(this.delMachineId != 0){
                deleteMachinePost(this.delMachineId).then(response => {
                    if(response.code == 200 ){
                        this.delVisible = false
                        this.$message.success("删除成功")
                        this.fetchData()
                    }
                })
            }
        }
    }
}
</script>