<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="机械编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="机械名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="所属标段" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.section_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属队伍" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.team_name }}
        </template>
      </el-table-column>
      <el-table-column label="宽度" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.width }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="110" align="center">
        <template slot-scope="scope">
          {{ ShowTypeName(scope.row.type) }}
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
 
  <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
    <div class="del-dialog-cnt" > 删除不恢复,是否确定删除? </div>
    <span slot="footer" class="dialog-footer"> 
      <el-button @click="delVisible=false"> 取消 </el-button>
      <el-button type="primary" @click="deleteMachine"> 确定 </el-button> 
    </span>
  </el-dialog>
</div>
</template>

<script>
import { getList } from '@/api/table'
import { deleteMachinePost } from "@/api/machine"

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      delVisible: false,//删除提示弹框的状态
      delMachineId: 0//存放删除的数据
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.lists
        this.listLoading = false
      })
    },
    ShowTypeName(type) {
      if (type == 1) {
        return "摊铺机"
      }else if (type == 2) {
        return "单钢轮"
      }else if (type == 3) {
        return "双钢轮"
      } else {
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
