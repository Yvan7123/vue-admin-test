<template>
  <div>
    <div class="filter-container">
        <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
        </el-select> -->
        <el-select v-model="listQuery.type" placeholder="设备种类" clearable class="filter-item" style="width: 130px" @change="handleFilter">
          <el-option v-for="item in machineTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button class="filter-item" style="margin-left: 60px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            新增
        </el-button>
    </div>
    <div class="app-container">
      <el-table :data="list"
                v-loading="listLoading"
                border
                fit
                highlight-current-row
                style="width: 100%">
        <el-table-column align="center"
                        label="机械编号"
                        width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="机械名称"
                        align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="所属标段"
                        align="center"
                        width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.section_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属队伍"
                        align="center">
          <template slot-scope="scope">
            {{ scope.row.team_name }}
          </template>
        </el-table-column>
        <el-table-column label="宽度"
                        align="center"
                        width="80px">
          <template slot-scope="scope">
            {{ scope.row.width }}
          </template>
        </el-table-column>
        <el-table-column label="类型"
                        align="center">
          <template slot-scope="scope">
            {{ ShowTypeName(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="状态"
                        width="120px">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status | typeFilter }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center"
                        label="操作"
                        class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary"
                      size="mini"
                      @click="handleUpdate(row)">
              修改
              <i class="el-icon-edit" />
            </el-button>
            <el-button type="success"
                      v-if="row.status==1"
                      size="mini"
                      @click="handleSearch(row)">
              查询
              <i class="el-icon-search" />
            </el-button>
            <el-button type="success"
                      v-if="row.status==0"
                      size="mini"
                      @click="handleInstall(row)">
              安装
              <i class="el-icon-setting" />
            </el-button>
            <el-button type="warning"
                      size="mini"
                      @click="handleDelete(row)">
              卸载
              <i class="el-icon-delete el-icon-right" />
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="textMap[dialogStatus]"
                :visible.sync="dialogFormVisible">
        <el-form ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="left"
                label-width="70px"
                style="width: 400px; margin-left:50px;">
          <el-form-item label="机械编号"
                        prop="id">
            <el-input v-model="temp.id" />
          </el-form-item>
          <el-form-item label="机械名称"
                        prop="title">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="机械类型"
                        prop="type">
            <el-select v-model="temp.type"
                      class="filter-item"
                      placeholder="Please select">
              <el-option v-for="item in machineTypeOptions"
                        :key="item.key"
                        :label="item.display_name"
                        :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属标段">
            <el-input v-model="temp.section_name" />
          </el-form-item>
          <el-form-item label="所属队伍">
            <el-input v-model="temp.team_name" />
          </el-form-item>
          <el-form-item label="机械宽度">
            <el-input v-model="temp.width" />
          </el-form-item>
        </el-form>
        <div slot="footer"
            class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary"
                    @click="dialogStatus==='create'?createData():updateData()">
            确定
          </el-button>
        </div>
      </el-dialog>

      <el-dialog title="数据查询"
                :visible.sync="dialogPosTable">
        <el-table :data="posList"
                  v-loading="posListLoading"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%">
          <el-table-column align="center"
                          label="时间"
                          width="200">
            <template slot-scope="{row}">
              <span>{{ row.t | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="经度"
                          align="center"
                          width="120">
            <template slot-scope="{row}">
              {{ row.b }}
            </template>
          </el-table-column>
          <el-table-column label="纬度"
                          align="center"
                          width="120">
            <template slot-scope="{row}">
              {{ row.l }}
            </template>
          </el-table-column>
          <el-table-column label="温度1"
                          align="center">
            <template slot-scope="{row}">
              {{ row.temp1 }}
            </template>
          </el-table-column>
          <el-table-column label="温度2"
                          align="center">
            <template slot-scope="{row}">
              {{ row.temp2 }}
            </template>
          </el-table-column>
          <el-table-column label="震动"
                          align="center">
            <template slot-scope="{row}">
              {{ row.max_v }}
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0"
                    :total="total"
                    :page.sync="posListQuery.page"
                    :limit.sync="posListQuery.limit"
                    @pagination="fetchPosData" />
      </el-dialog>

      <el-dialog title="安装设备"
                v-loading="loadingInstall"
                :visible.sync="dialogInstall">
        <el-form ref="dataForm"
                :model="temp"
                label-position="left"
                label-width="70px"
                style="width: 400px; margin-left:50px;">
          <el-form-item label="机械编号"
                        prop="id">
            <el-input :disabled="false"
                      v-model="temp.id" />
          </el-form-item>
          <el-form-item label="机械名称"
                        prop="title">
            <el-input :disabled="false"
                      v-model="temp.name" />
          </el-form-item>
          <el-form-item label="机械类型"
                        prop="type">
            <el-input :disabled="false"
                      v-model="temp.name" />
          </el-form-item>
          <el-form-item label="所属标段"
                        prop="section">
            <el-input :disabled="false"
                      v-model="temp.section_name" />
          </el-form-item>
          <el-form-item label="所属队伍"
                        prop="team">
            <el-input :disabled="false"
                      v-model="temp.team_name" />
          </el-form-item>
          <el-form-item label="设备编号">
            <el-select v-model="temp.equip"
                      class="filter-item"
                      placeholder="请选择">
              <el-option v-for="item in equipList"
                        :key="item.key"
                        :label="item.display_name"
                        :value="item.key" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer"
            class="dialog-footer">
          <el-button @click="dialogInstall = false">
            取消
          </el-button>
          <el-button type="primary"
                    @click="installEquip()">
            确定
          </el-button>
        </div>
      </el-dialog>

      <el-dialog title="提示"
                :visible.sync="delVisible"
                width="300px"
                center>
        <div class="del-dialog-cnt"> 删除不恢复,是否确定删除? </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="delVisible=false"> 取消 </el-button>
          <el-button type="primary"
                    @click="deleteMachine"> 确定 </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import { getListBySection } from '@/api/machine'
import { deleteMachinePost, updateMachine } from "@/api/machine"
import { getPosListByMachine } from "@/api/pos"
import { getEquipList } from "@/api/equip"
import { PostInstallEquip } from "@/api/install"
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const machineTypeOptions = [
  { key: '0', display_name: '未安装设备' },
  { key: '1', display_name: '已安装设备' },
  { key: '2', display_name: '数据传输正常' },
]
const machineTypeKeyValue = machineTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  components: { Pagination },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: 'success',
        2: 'info',
        0: 'danger'
      }
      return statusMap[status]
    },
    typeFilter (type) {
      return machineTypeKeyValue[type]
    }
  },
  data () {
    return {
      list: null,
      posList: null,
      equipList: null,
      listQuery: {
        page: 1,
        type: undefined,
        section: this.section
      },
      posListQuery: {
        page: 1,
        limit: 10,
        machine_id: 0,
        date: 0
      },
      edit: false,
      total: 0,
      loadingInstall: false,
      listloading: false,
      posListLoading: false,
      delVisible: false,
      delMachineid: 0,
      searchMachineId: 0,
      searchDate: 0,
      dialogInstall: false,
      dialogFormVisible: false,
      dialogPosTable: false,
      dialogStatus: '',
      machineTypeOptions: [
        { key: 1, display_name: '摊铺机' },
        { key: 2, display_name: '单钢轮' },
        { key: 3, display_name: '双钢轮' },
        { key: 4, display_name: '胶轮' }
      ],
      temp: {
        id: undefined,
        name: '',
        type: undefined,
        section_name: undefined,
        team: undefined,
        width: undefined,
        equip: undefined
      },
      textMap: {
        update: '修改',
        create: '创建'
      },
      rules: {

      }
    }
  },
  props: ['section'],
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getListBySection(this.listQuery).then(repsonse => {
        this.list = repsonse.data.lists
        this.listLoading = false
      })
    },
    fetchPosData () {
      this.posListLoading = true
      getPosListByMachine(this.posListQuery).then(repsonse => {
        this.posList = repsonse.data.lists
        this.total = repsonse.data.total
        this.posListLoading = false
      })
    },
    ShowTypeName (type) {
      if (type == 1) {
        return "摊铺机"
      } else if (type == 2) {
        return "单钢轮"
      } else if (type == 3) {
        return "双钢轮"
      } else {
        return "胶轮"
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        type: undefined,
        section_name: undefined,
        team: undefined,
        width: undefined,
        equip: undefined
      }
    },
    handleFilter() {
      this.listQuery.page = 1 
      this.fetchData()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete (row) {
      this.delVisible = true
      this.delMachineId = row.id
    },
    handleSearch (row) {
      this.dialogPosTable = true
      console.log(row.id)
      this.posListQuery.machine_id = row.id
      this.date = new Date();
      this.$nextTick(
        this.fetchPosData()
      )
    },
    handleUpdate (row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleInstall (row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.dialogInstall = true
      this.$nextTick(() => {
        this.loadingInstall = true
        getEquipList().then(response => {
          this.equipList = response.data.lists
          this.loadingInstall = false
        })
      })
    },
    installEquip () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          PostInstallEquip(tempData).then(response => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list[index].status = response.data.status
                break
              }
            }
            this.dialogInstall = false
            this.$notify({
              title: 'success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateMachine(tempData).then(response => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    deleteMachine () {
      if (this.delMachineId != 0) {
        deleteMachinePost(this.delMachineId).then(response => {
          if (response.code == 200) {
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