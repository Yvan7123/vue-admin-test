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
        <el-button type="warning">
          卸载
          <i class="el-icon-delete el-icon-right" />
        </el-button> 
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

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
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.$store.getters.token).then(response => {
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
    }
  }
}
</script>
