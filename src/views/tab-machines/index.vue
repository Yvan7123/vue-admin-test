<template>
    <div class="tab-container">
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
                <keep-alive>
                    <tab-pane v-if="activeName==item.key" :type="item.key" @click="showCreatedTimes" />
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
     </div>
</template>

<script>

import tabPane  from './conponents/TabPane'
import { getSectionGet } from '@/api/section'

export default {
    name: 'tab-machines',
    components: { tabPane },
    data() {
        return {
            tabMapOptions: [
                {label: "一标", key: "101"},
                {label: "二标", key: "102"}
            ],
            activeName: '101',
            createdTimes: 0
        }
    },
    watch: {
        activeName(val){
            this.$router.push(`${this.$router.path}?tab=${val}`)
        }
    },
    created() {
        const tab = this.$route.query.tab
        if(tab) {
            this.activeName = tab
        }else {
            this.getAllSection()
        }
    },
    methods: {
        getAllSection(){
            this.$loading = true
            getSectionGet().then(repsonse => {
                this.tabMapOptions = repsonse.data.tabMapOptions
                this.$loading = false
            })
        },
        showCreatedTimes() {
            this.createdTimes = this.createdTimes + 1
        }
    }
}
</script>