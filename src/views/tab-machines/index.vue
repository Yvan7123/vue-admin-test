<template>
    <div class="tab-container">
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
                <keep-alive>
                    <tab-pane v-if="activeName==item.key" :section="item.key" @create="showCreatedTimes" />
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
     </div>
</template>

<script>

import tabPane  from './conponents/TabPane'
import { getSectionGet } from '@/api/section'

export default {
    name: 'Tab',
    components: { tabPane },
    data() {
        return {
            tabMapOptions: [
            ],
            activeName: '201',
            createdTimes: 0
        }
    },
    watch: {
        activeName(val){
            this.$router.push(`${this.$route.path}?section=${val}`)
        }
    },
    created() {
        const section = this.$route.query.section
        if(section) {
            this.activeName = section
        }
        this.getAllSection()
    },
    methods: {
        getAllSection(){
            this.$loading = true
            getSectionGet().then(repsonse => {
                this.tabMapOptions = repsonse.data.lists
                console.log(this.tabMapOptions[1].key)
                //this.activeName = this.tabMapOptions[1].key
                this.$loading = false
            })
        },
        showCreatedTimes() {
            this.createdTimes = this.createdTimes + 1
        }
    }
}
</script>