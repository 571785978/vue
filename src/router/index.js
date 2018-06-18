import Vue from 'vue';
import Router from 'vue-router';
import baiduMap from '@/components/maps/baidu/full';
import backGround from '@/components/body/back';
import gaodeMap from '@/components/maps/gaode/full';



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      components:{
        default:backGround,
        gaode:gaodeMap,
        baidu:baiduMap
      }
    }
  ]
})
