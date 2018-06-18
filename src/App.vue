<template>
  <div id="app" v-bind:style="{height:fullHeight + 'px'}">
    <el-container v-bind:style="{height:fullHeight + 'px'}">
      <!-- 头部 -->
      <el-header>
        <el-row >
          <!-- 头部左侧 -->
          <el-col :span="16">
            <!-- tab菜单 -->
            <tabs v-on:addTab='addTab'></tabs>
          </el-col>
          
          <!-- 头部右侧 -->
          <el-col :span="8">
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="grid-content bg-purple" >
                    <!-- 登录按钮以及登录框 -->
                    <el-button class='login_buttion'  @click="dialogVisible = true" v-show="loginFlg" round>登录</el-button>
                    <el-dialog title="登录" :visible.sync="dialogVisible" width="500px" height='500px' :before-close="handleClose">
                      <span><login v-bind:dialogVisible='dialogVisible' v-on:cancal='loginCancle' v-on:success='success'></login></span>
                    </el-dialog>
                    <!-- 个人简介 -->
                    <el-popover placement="top-start" title="简介" width="500" trigger="hover" ref='myIntroduction'>
                      <introduction></introduction>
                    </el-popover>
                    <i class="el-icon-info"  slot="reference" v-popover:myIntroduction v-show="!loginFlg">你大爷</i>
                    
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <!--  -->
      <el-main v-bind:style="{height:mainHeight + 'px'}">
        <!-- <main_body ref="main_body"></main_body> -->
        <!-- <component :is='main_child'></component> -->
        <el-tabs v-model="editableTabsValue"  @tab-remove="removeTab" type="card" editable v-bind:style="{height:mainHeight + 'px'}">
              <el-tab-pane
                :key="item.name"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name"
                :addable='false'
                v-bind:style="{height:mainHeight-41 + 'px'}" 
                :type='success'
              >
              <!--加载中-->
              <!-- <component :is=item.content v-bind:style="{height:mainHeight + 'px'}"></component> -->
              <router-view v-bind:name='item.routerName' v-on:closeLoading='closeLoading'></router-view>
              </el-tab-pane>
            </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Login from "@/components/login/index";
import Introduction from "@/components/header/introduction";
import Tabs from "@/components/header/tabs";

export default {
  name: "App",
  data() {
    return {
      fullHeight: document.documentElement.clientHeight,
      mainHeight: document.documentElement.clientHeight - 60,
      dialogVisible: false,
      loginFlg: true,
      url: "",
      loading:null,
      editableTabsValue: "welcome",
      editableTabs: [
        // {
        //   title: "欢迎",
        //   name: "welcome",
        //   content: "/backGround"
        // }
      ],
    };
  },
  mounted: function() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        this.fullHeight = window.fullHeight;
        this.mainHeight = window.fullHeight - 60;
      })();
    };
    this.init();
  },
  components: {
    login: Login,
    tabs: Tabs,
    introduction: Introduction
  },
  methods: {
    init: function() {
      console.log("this el-main' height is " + this.mainHeight);
      this.addTab('欢迎','welcome','default');
    },
    handleClose(done) {
      this.$confirm("确认取消登录？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    loginCancle() {
      this.dialogVisible = false;
      this.loginFlg = true;
    },
    success() {
      this.dialogVisible = false;
      this.loginFlg = false;
    },
    addTab(title, name,routerName) {
      if(JSON.stringify(this.editableTabs).indexOf(name)!=-1){
        this.editableTabsValue = name;
        return;
      }
      this.editableTabs.push({
        title:title,
        name:name,
        routerName:routerName
      });
      this.editableTabsValue = name;
      this.$router.push({path:'/'});
      this.openLoading();
    },
    removeTab(targetName){
      if(this.editableTabs.length == 1){
        this.getMessage('最后一页不允许关闭!','提示','warning');
        return;
      }
      this.editableTabs = this.editableTabs.filter(tab => tab.name !== targetName);
      this.editableTabsValue = this.editableTabs[0].name;
    },
    getMessage(message,title,type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    },
    openLoading(){
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      this.loading = loading;
    },
    closeLoading(){
      this.loading.close();
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html body {
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  margin: 0;
  padding: 0;
}
/**
  * 布局
  */
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: rgb(84, 92, 100);
}
.bg-purple {
  background: rgb(84, 92, 100);
}
.bg-purple-light {
  background: rgb(84, 92, 100);
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: rgb(84, 92, 100);
}
.login_buttion {
  position: absolute;
  right: 0;
  top: 10px;
}
</style>
<style>
.el-main .el-tabs__header {
  margin: 0;
}
.el-tabs__new-tab {
  display: none;
}

</style>
